import useAuthContext from "../../Utils/useAuthContext";

const ChattingMessage = ({ allChattingMessage, newMessage , getConversationInfo}) => {
  const { user } = useAuthContext();
  return (
    <div>
      <div className="max-h-screen p-3">
        {allChattingMessage?.message?.map((item) => (
          <div
            key={item?._id}
            className={`flex justify-${
              user?.email === item?.sender?.email ? "end" : "start"
            }`}
          >
            <div>
              {/* user dosent match sender profile email  */}
              {
                user?.email !== item?.sender?.email && <div className="flex items-center mb-4">
                <div className="flex-none flex flex-col items-center space-y-1 mr-4">
                  <img
                    className="rounded-full w-10 h-10"
                    src={getConversationInfo?.image}
                  />
                  <a  className="block text-xs hover:underline">
                    {getConversationInfo?.conversationName?.slice(0,6)}
                  </a>
                </div>
                <div className="flex-1 bg-indigo-400 text-white p-2 rounded-lg mb-2 relative">
                  <div>
                    {item?.text}
                  </div>

                  <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
                </div>
              </div>
              }

{/* user  match sender profile email  */}
              {
                  user?.email === item?.sender?.email  &&  <div className="flex items-center flex-row-reverse mb-4">
                    <div className="flex-none flex flex-col items-center space-y-1 ml-4">
                      <img className="rounded-full w-10 h-10"
                        src={user?.photoURL} />
                      <a  className="block text-xs hover:underline">{user?.displayName?.slice(0,6)}</a>
                    </div>
                    <div className="flex-1 bg-indigo-100 text-gray-800 p-2 rounded-lg mb-2 relative">
                      <div>{item?.text}</div>
              
                      
                      <div className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-100"></div>
                      
                    </div>
                  </div>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChattingMessage;
