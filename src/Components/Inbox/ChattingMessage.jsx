import { Avatar } from "@mui/material";
import useAuthContext from "../../Utils/useAuthContext";
// import { useEffect } from "react";
// import io from 'socket.io-client';



const ChattingMessage = ({
  allChattingMessage,
  newMessage,
  getConversationInfo,
}) => {
  const { user } = useAuthContext();
 
  // useEffect(() => {
  //   const socket = io('https://mern-stack-chat-app-server.vercel.app');
  //   socket.on('new_message', data => {
  //     console.log('Received new message:', data);
  //   });
  
  //   return () => {
  //     socket.disconnect(); // Cleanup on component unmount
  //     console.log('Socket disconnected');
  //   };
  // }, [allChattingMessage,newMessage]);
  return (
    <div>
      <div className="max-h-screen p-3 ">
        {allChattingMessage?.message?.map((item) => (
          <div
            key={item?._id}
            style={{
              display: "flex",
              justifyContent:
                user?.email !== item?.sender?.email ? "flex-start" : "flex-end",
              width: "100%", // Assuming you want the element to take the
            }}
          >
            <div>
              {/* user dosent match sender profile email  */}
              {user?.email !== item?.sender?.email && (
                <div className="flex items-center mb-4 ">
                  <div className="flex-none flex flex-col items-center space-y-1 mr-4">
                    <img
                      className="rounded-full w-10 h-10"
                      src={getConversationInfo?.image}
                    />
                    <a className="block text-xs hover:underline">
                      {getConversationInfo?.conversationName?.slice(0, 6)}
                    </a>
                  </div>
                  <div className="flex-1 bg-indigo-400 text-white p-2 rounded-lg mb-2 relative">
                    <div>
                      <div className="flex items-center gap-2">
                        <p>{item?.text}</p>
                        {item?.attachment?.length > 0 && (
                          <Avatar
                            alt="Remy Sharp"
                            src={item?.attachment[0]}
                            variant="square"
                            sx={{ width: 56, height: 56 }}
                          />
                        )}
                      </div>
                    </div>

                    <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
                  </div>
                </div>
              )}

              {/* user  match sender profile email  */}
              {user?.email === item?.sender?.email && (
                <div className="flex items-center flex-row-reverse mb-4">
                  <div className="flex-none flex flex-col items-center space-y-1 ml-4">
                    <img
                      className="rounded-full w-10 h-10"
                      src={user?.photoURL}
                    />
                    <a className="block text-xs hover:underline">
                      {user?.displayName?.slice(0, 6)}
                    </a>
                  </div>
                  <div className="flex-1 bg-indigo-100 text-gray-800 p-2 rounded-lg mb-2 relative">
                    <div>
                      <div className="flex items-center gap-2">
                        <p>{item?.text}</p>
                        {item?.attachment?.length > 0 && (
                          <Avatar
                            alt="Remy Sharp"
                            src={item?.attachment[0]}
                            variant="square"
                            sx={{ width: 56, height: 56 }}
                          />
                        )}
                      </div>
                    </div>

                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-100"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChattingMessage;
