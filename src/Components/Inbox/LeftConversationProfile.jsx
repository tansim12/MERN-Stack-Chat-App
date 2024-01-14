import { Avatar } from "@mui/material";
// import { useState } from "react";
import useAuthContext from "../../Utils/useAuthContext";

const LeftConversationProfile = ({ allConversationData }) => {
  const { user } = useAuthContext();
  // const [profileData, setProfileData] = useState([])
  const findProfile = allConversationData?.map((item) => {
    if (item?.creator?.email === user?.email) {
      return item?.participant;
    } else {
      return item?.creator;
    }
  });

  return (
    <div className="border-r-2 p-2 min-h-[75vh] ">
      {findProfile?.map((item) => (
        <div key={item?.id} className="flex justify-center items-center gap-2 my-5 cursor-pointer hover:scale-105 hover:transition-all bg-gray-200 rounded-lg p-2 hover:bg-gray-500">
          <div>
          <Avatar alt="Remy Sharp" 
          src={item?.image ? item?.image: "https://i.ibb.co/X81hpFB/pngtree-web-page-ui-default-avatar-handsome-guy-png-image-3801746.jpg"}/>
          
          </div>
          <p className="flex-grow">{item?.name.slice(0,10)}</p>
        </div>
      ))}
    </div>
  );
};

export default LeftConversationProfile;
