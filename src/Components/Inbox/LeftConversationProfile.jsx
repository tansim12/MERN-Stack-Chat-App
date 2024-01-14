import { Avatar } from "@mui/material";

import useAuthContext from "../../Utils/useAuthContext";

const LeftConversationProfile = ({
  allConversationData,
  setConversationInfo,
}) => {
  const { user } = useAuthContext();

  //   find participant profile
  const findProfile = allConversationData?.map((item) => {
    if (item?.creator?.email === user?.email) {
      return { profile: item?.participant, conversationId: item?._id };
    } else {
      return { profile: item?.participant, conversationId: item?._id };
    }
  });

  //   handleChatting
  const handleChatting = (conversationId, conversationName) => {
    setConversationInfo({ conversationId, conversationName });
  };

  return (
    <div className="border-r-2 p-2 min-h-[75vh] ">
      {findProfile?.map((item) => (
        <div
          onClick={() =>
            handleChatting(item?.conversationId, item?.profile?.name)
          }
          key={item?.profile?.id}
          className="flex justify-center items-center gap-2 my-5 cursor-pointer hover:scale-105 hover:transition-all bg-gray-200 rounded-lg p-2 hover:bg-gray-500"
        >
          <div>
            <Avatar
              alt="Remy Sharp"
              src={
                item?.profile?.image
                  ? item?.profile?.image
                  : "https://i.ibb.co/X81hpFB/pngtree-web-page-ui-default-avatar-handsome-guy-png-image-3801746.jpg"
              }
            />
          </div>
          <p className="flex-grow">
            {item?.profile?.name.slice(0, 10).toUpperCase()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LeftConversationProfile;
