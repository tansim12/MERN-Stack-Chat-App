import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import hostImage from "../../Utils/hostImage";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import chattingAnimation from "../../assets/chatting.json";
import useAuthContext from "../../Utils/useAuthContext";
import { globalInstance } from "../../Hooks/useGlobalInstance";
import { useState } from "react";
import ChattingMessage from "./ChattingMessage";
import Swal from "sweetalert2";
import { Avatar } from "@mui/material";

const RightSideChattingMessage = ({
  getConversationInfo,
  allChattingMessage,
  allChattingMessageRefetch,
}) => {
  const { user } = useAuthContext();
  const [newMessage, setNewMessage] = useState();

  const sender = {
    name: user?.displayName,
    email: user?.email,
    image: user?.photoURL,
  };
  const receiver = {
    name: getConversationInfo?.conversationName,
    email: getConversationInfo?.email,
    image: getConversationInfo?.image,
  };
  // handleDeleteConversation
  // todo delete chatting message
  const handleDeleteConversation = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await globalInstance.delete(`/message/${_id}`);
        const fetchData = res?.data;
       
        if (fetchData?.success) {
          allChattingMessageRefetch()
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };
  //   handleMessageSend
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const attachment = [];
    const text = data?.massage;

    if (data?.image[0]) {
      const img = data?.image[0];
      const fromData = new FormData();
      fromData.append("image", img);
      const image = await hostImage(fromData);
      attachment.push(image);
    }
    if (!text?.length && !attachment?.length) {
      return toast.error(" Type your text");
    }
    const conversationId = getConversationInfo?.conversationId;

    const info = {
      text,
      attachment,
      conversationId,
      sender,
      receiver,
    };

    const res = await globalInstance.post("/message", info);
    const fetchData = res?.data;

    if (fetchData) {
      setNewMessage(fetchData);
      allChattingMessageRefetch();
      reset();
    }
  };

  return (
    <section className="relative">
      <div>
        {/* upper div when user name and delete option  */}
        {getConversationInfo?.conversationId && (
          <div className="bg-gray-500 flex justify-between items-center px-6 py-2 rounded-t-3xl">
            <div className="flex flex-col items-center">
            <Avatar alt="A" src={getConversationInfo?.image} sx={{ width: 24, height: 24 }} />
            <p className="text-sm font-black text-white">
              {getConversationInfo?.conversationName?.slice(0,6)?.toUpperCase()}
            </p>
            </div>
            <div
              className="cursor-pointer hover:scale-x-125 hover:transition-all"
              onClick={() =>
                handleDeleteConversation(getConversationInfo?.conversationId)
              }
            >
              <DeleteOutlineIcon
                sx={{ color: "black", fontSize: 25 }}
                className="hover:text-red-700"
              />
            </div>
          </div>
        )}
      </div>

      {/* chatting and messaging div  */}
      {getConversationInfo?.conversationId ? (
        <div>
          <div className=" overflow-scroll scroll-smooth h-[420px]">
            {/* all message showing here  */}

            <div>
              <ChattingMessage
                getConversationInfo={getConversationInfo}
                allChattingMessage={allChattingMessage}
                newMessage={newMessage}
              />
            </div>
          </div>

          {/* message from div  */}
          <div className=" bottom-0  w-full ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="items-center w-full"
            >
              <div className="grid-cols-11">
                <div className="relative flex items-center ">
                  {/* attachment div  */}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="fileInput"
                      name="image"
                      {...register("image")}
                    />
                    <label
                      htmlFor="fileInput"
                      className="inline-block px-4 py-4 text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      <AttachFileIcon />
                    </label>
                  </div>

                  <input
                    type="text"
                    name="message"
                    {...register("massage")}
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Type your message"
                  />
                  <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Lottie
            animationData={chattingAnimation}
            loop={true}
            autoplay={true}
            className="w-1/2 h-1/2"
          ></Lottie>
        </div>
      )}
    </section>
  );
};

export default RightSideChattingMessage;
