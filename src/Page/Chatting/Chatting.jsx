import { Avatar, Button, Container, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { globalInstance } from "../../Hooks/useGlobalInstance";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuthContext from "../../Utils/useAuthContext";
import useGetConversations from "../../Hooks/useGetConversations";
import LeftConversationProfile from "../../Components/Inbox/LeftConversationProfile";
import RightSideChattingMessage from "../../Components/Inbox/RightSideChattingMessage";
import useGetChattingMessage from "../../Hooks/useGetChattingMessage";
import { Helmet } from "react-helmet-async";

const Chatting = () => {
  const { user } = useAuthContext();
  const [searchUsersData, setSearchUsersData] = useState([]);
  const { allConversationData, allConversationDataRefetch } =
    useGetConversations(user?.email);

  // get conversationId and with which user
  const [getConversationInfo, setConversationInfo] = useState({});

  const { allChattingMessage, allChattingMessageRefetch } =
    useGetChattingMessage(getConversationInfo?.conversationId);
  

  // handleConnectToChatList
  const handleConnectToChatList = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Start to chat here",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const findOneUserData = await globalInstance.get(
          `/findOneUser?email=${user?.email}`
        );

        const creator = {
          id: findOneUserData?.data?._id,
          name: findOneUserData?.data?.name,
          image: findOneUserData?.data?.image,
          email: findOneUserData?.data?.email,
        };
        const participant = {
          id: item?._id,
          name: item?.name,
          email: item?.email,
          image: item?.image,
        };
        const info = { creator, participant };
        const res = await globalInstance.post("/conversation", info);
        const fetchData = res?.data;
        allConversationDataRefetch();
        if (fetchData?.success) {
          Swal.fire({
            title: "Start!",
            text: "Please Start to Chat",
            icon: "success",
          });
        }
      }
    });
  };

  //   handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const res = await globalInstance.get(`/searchUser?search=${name}`);
    setSearchUsersData(res?.data);
  };

  return (
    <div className="mt-28 min-h-[75vh]">
      <Helmet><title>Chatting</title></Helmet>
      <Container maxWidth={"xl"}>
        {/* search section  */}
        <div className="mb-10">
          <div className="grid grid-cols-12 items-center gap-5">
            {/* from   */}
            <div className="col-span-12 md:col-span-5">
              <form
                onSubmit={handleSubmit}
                className="flex justify-center items-center gap-1"
              >
                <TextField
                  name="name"
                  id="filled-basic"
                  label="Search Friend"
                  variant="filled"
                  required
                />
                <Button sx={{ padding: 2 }} type="submit" variant="contained">
                  <SearchIcon />
                </Button>
              </form>
            </div>

            {/* search result  */}
            <div className="col-span-12 md:col-span-7 ">
              <div className="flex gap-2 md:gap-10 justify-center items-center flex-wrap ">
                {searchUsersData?.length ? (
                  searchUsersData?.map((item) => (
                    <div key={item?._id}>
                      <div
                        className="cursor-pointer"
                        onClick={() => handleConnectToChatList(item)}
                      >
                        <Avatar alt="Remy Sharp" src={item?.image} />
                        <p>{item?.name?.slice(0, 7)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="text-red-600 font-bold text-3xl">
                    😥 There is No data{" "}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* conversation  */}
        <div className="grid grid-cols-12 gap-2">
          {/* left div conversation profile  */}
          <div className="col-span-4 md:col-span-3">
            <LeftConversationProfile
              allConversationData={allConversationData}
              setConversationInfo={setConversationInfo}
            />
          </div>
          {/* right div  */}
          <div className="col-span-8 md:col-span-9">
            <RightSideChattingMessage
              getConversationInfo={getConversationInfo}
              allChattingMessageRefetch={allChattingMessageRefetch}
              allChattingMessage={allChattingMessage}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Chatting;
