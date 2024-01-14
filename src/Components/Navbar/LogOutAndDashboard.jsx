import { Box, Button, ButtonGroup } from "@mui/material";

import toast from "react-hot-toast";
import useAuthContext from "../../Utils/useAuthContext";
import LogoutIcon from '@mui/icons-material/Logout';


const LogOutAndDashboard = () => {
  const { logOut,user } = useAuthContext();

  const handleLogout = () => {
    logOut().then(async () => {
      toast.success("Logout successfully");
    });
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="text"
        >
            <div>
                <p className="text-sm"><span className="font-bold">Email:</span> {user?.email}</p>
                <p className="my-2 text-sm"><span className="font-bold">Name: </span> {user?.displayName}</p>
                
            </div>
         <Button onClick={handleLogout}> <LogoutIcon /> Logout</Button>,
        </ButtonGroup>
      </Box>
    </div>
  );
};

export default LogOutAndDashboard;
