import DeleteIcon from "@mui/icons-material/Delete";

const RightSideChattingMessage = ({ getConversationInfo }) => {
    // handleDeleteConversation 
    // todo delete chatting message 
    const handleDeleteConversation =(_id)=>{
        console.log(_id);
    }
  return (
    <div>
      {/* upper div when user name and delete option  */}
      {getConversationInfo?.conversationId && (
        <div className="bg-gray-500 flex justify-between p-4 rounded-t-3xl">
          <p className="text-xl font-black text-white">
            {getConversationInfo?.conversationName?.toUpperCase()}
          </p>
          <div
            className="cursor-pointer hover:scale-x-125 hover:transition-all"
            onClick={() =>
              handleDeleteConversation(getConversationInfo?.conversationId)
            }
          >
            <DeleteIcon sx={{ color: "black", fontSize: 25 }} className="hover:text-red-700"/>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSideChattingMessage;
