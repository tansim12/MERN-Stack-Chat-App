import { Button, Container, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { globalInstance } from "../../Hooks/useGlobalInstance";
import { useState } from "react";



const Chatting = () => {
  const [searchUsersData, setSearchUsersData] = useState([])
  //   handleSubmit
  const handleSubmit = async(e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const res = await globalInstance.get(`/searchUser?search=${name}`)
    setSearchUsersData(res?.data)
    
  };

 
  return (
    <Container sx={{mt:2}}>
      <div>
        {/* search section  */}
        <div className="mb-10">
          <div className="grid grid-cols-12 items-center">
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
                />
                <Button sx={{ padding: 2 }} type="submit" variant="contained">
                  <SearchIcon />
                </Button>
              </form>
            </div>

            {/* search result  */}
            <div className="col-span-12 md:col-span-7">gjkrj</div>
          </div>
        </div>
        {/* conversation  */}
        <div className="grid grid-cols-12 gap-2">
          {/* left div  */}
          <div className="col-span-4">left</div>
          {/* right div  */}
          <div className="col-span-8">right</div>
        </div>
      </div>
    </Container>
  );
};

export default Chatting;
