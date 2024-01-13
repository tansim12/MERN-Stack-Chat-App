import { Button, Container, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Chatting = () => {
  //   handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    const info = e.target.name.value;
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
