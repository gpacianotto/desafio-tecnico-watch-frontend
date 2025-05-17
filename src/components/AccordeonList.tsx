"use client";
import { Movie } from "@/app/home/page";
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Rating } from "@mui/material";
import axios from "axios";

export default function AccordeonList({movies, handleReloading}: {movies: Movie[], handleReloading: () => void}) {
  return (
    <>
      {movies.map((movie, index) => (
        <Accordion  key={index}>
          <AccordionSummary>
            <h2>{movie.title}</h2>
            <Rating style={{margin: "auto 0 auto auto"}} readOnly value={movie.userRating} precision={0.5}/>
          </AccordionSummary>
          <AccordionDetails>
            <p><strong>Ano:</strong> {movie.year}</p>
            <p><strong>Sinopse:</strong> {movie.sinopse}</p>
            <p><strong>Sua Nota:</strong> {movie.userRating}</p>
            <p><strong>Suas Considerações:</strong> {movie.userConsiderations}</p>
            <img src={movie.imageUrl}></img>
            <br></br>
            <Button 
              variant="contained" 
              color="error"
              onClick={() => {
                axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/movies?id=${movie.imdbId}`, {
                  headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                  }
                }).then((response) => {
                  console.log(response.data);
                  handleReloading();
                }).catch((error) => {
                  console.log("Error", error);
                })
              }} 
            >
              Deletar
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );

}