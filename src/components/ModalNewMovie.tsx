import { MovieExternalApi } from "@/common/MovieExternalApi";
import { Box, Button, Grid, Modal, Rating, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
  maxHeight: "80vh",
};

export default function ModalNewMovie({ open, handleClose, handleReload }: { open: boolean, handleClose: () => void , handleReload: () => void }) {
  
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [userRating, setUserRating] = useState<number|null>(0);
  const [userConsiderations, setUserConsiderations] = useState("");
  const [imageUrl, setImageUrl] = useState<string|undefined>();
  const [id, setId] = useState("");
  
  return <>
    <Modal
      open={open}
      onClose={() => {
        handleClose()
        setTitle("");
        setYear("");
        setSinopse("");
        setUserRating(0);
        setUserConsiderations("");
        setImageUrl("");
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Adicionar filme
            </Typography>
          </Grid>
          <Grid size={8}>
            <TextField 
              id="outlined-basic" 
              label="Título" 
              variant="outlined"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              fullWidth
            />
          </Grid>
          <Grid size={4} style={{margin: "auto"}}>
            <Button onClick={
              () => {
                axios.get(MovieExternalApi.getMovieURL(title))
                .then((response) => {
                  console.log(response.data);
                  
                  //@ts-ignore
                  setTitle(response.data.Title);
                  //@ts-ignore
                  setYear(response.data.Year);
                  //@ts-ignore
                  setSinopse(response.data.Plot);
                  //@ts-ignore
                  setImageUrl(response.data.Poster);
                  //@ts-ignore
                  setId(response.data.imdbID);
                  

                }).catch((error) => {
                  console.log("Error", error);
                })
              }
            } variant="contained" color="success">
              Procurar...
            </Button>
          </Grid>
          <Grid size={12} style={{textAlign: "center"}}>
            <img src={imageUrl}></img>
          </Grid>
          <Grid size={12}>
            <Typography component="legend">Ano do Filme:</Typography>
            <TextField 
              disabled 
              id="outlined-basic" 
              variant="outlined" 
              fullWidth
              value={year}
              
            />
          </Grid>
          <Grid size={12}>
            <Typography component="legend">Sinopse:</Typography>
            <TextField 
              disabled 
              multiline 
              rows={4} 
              id="outlined-basic" 
              variant="outlined" 
              fullWidth
              value={sinopse} 
            />
          </Grid>
          <Grid size={12}>
            <Typography component="legend">Sua nota para este filme:</Typography>
            <Rating 
              value={userRating} 
              onChange={(e, newValue) => {setUserRating(newValue)}} 
              defaultValue={2.5} 
              precision={0.5}
              size="large"
              name="userRating"
            />
            <Typography component="legend">Nota: {userRating}</Typography>
          </Grid>
          <Grid size={12}>
            <TextField 
              id="outlined-basic" 
              label="Suas Considerações" 
              variant="outlined" 
              fullWidth
              value={userConsiderations}
              onChange={(event) => {
                setUserConsiderations(event.target.value);
              }}
              multiline
              rows={4} 
            />
          </Grid>
          <Grid size={12}>
            <Button 
              variant="contained" 
              color="success"
              fullWidth
              onClick={() => {
                const token = window.localStorage.getItem("token");
                console.log("Token", token);
                
                axios.post(`${process.env.NEXT_PUBLIC_API_URL}/movies`, {
                  title: title,
                  year: year,
                  sinopse: sinopse,
                  userRating: userRating,
                  userConsiderations: userConsiderations,
                  imageUrl: imageUrl,
                  imdbId: id
                }, {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }).then((response) => {
                  console.log(response.data);
                  
                  handleClose();
                  setTitle("");
                  setYear("");
                  setSinopse("");
                  setUserRating(0);
                  setUserConsiderations("");
                  setImageUrl("");
                  handleReload();
                }).catch((error) => {
                  console.log("Error", error);
                })
              }}
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  </>
}