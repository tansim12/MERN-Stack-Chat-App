import { Avatar, Button, Container, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { globalInstance } from "../../Hooks/useGlobalInstance";
import { useState } from "react";
import Swal from "sweetalert2";

const Chatting = () => {
  const [searchUsersData, setSearchUsersData] = useState([]);
  const { findOneUserData } = useState({});

  // todo some post method here go
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
        const creator = {
          _id: findOneUserData?._id,
          name: findOneUserData?.name,
          image: findOneUserData?.image,
        };
        const participant = {
          _id: item?._id,
          name: item?.name,
          image: item?.image,
        };
        const info = { creator, participant };
        const res = await globalInstance.post("/conversation", info);
        const fetchData = res?.data;
        
        if (fetchData) {
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
      <Container>
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
                {searchUsersData?.length &&
                  searchUsersData?.map((item) => (
                    <div key={item?._id}>
                      <div className="cursor-pointer" onClick={() => handleConnectToChatList(item)}>
                        <Avatar alt="Remy Sharp" src={item?.image} />
                        <p>{item?.name?.slice(0, 7)}</p>
                      </div>
                    </div>
                  ))}

                {searchUsersData?.length === 0 && (
                  <span className="text-red-600 font-bold text-3xl">
                    There is No data{" "}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* conversation  */}
        <div className="grid grid-cols-12 gap-2">
          {/* left div  */}
          <div className="col-span-4">left</div>
          {/* right div  */}
          <div className="col-span-8">right</div>
        </div>
      </Container>
    </div>
  );
};

export default Chatting;
