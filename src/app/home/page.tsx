"use client";
import AccordeonList from "@/components/AccordeonList";
import ModalError from "@/components/ModalError";
import ModalNewMovie from "@/components/ModalNewMovie";
import { Button, Grid, Pagination, Typography } from "@mui/material";
import axios from "axios";
import { use, useEffect, useState } from "react";
import { text } from "stream/consumers";

export type Movie = {
  id: string;
  title: string;
  year: string;
  sinopse: string;
  userRating: number;
  userConsiderations: string;
  userId: string;
  imageUrl: string;
  imdbId: string;
  createdAt: string;
  updatedAt: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {

  const [movies, setMovies] = useState<Movie[]>([] as Movie[]);
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const [user, setUser] = useState<User|undefined>();
  const [movieCount, setMovieCount] = useState(0);

  const [modalNewMovieOpen, setModalNewMovieOpen] = useState(false);

  useEffect(() => {

    const token = window.localStorage.getItem("token");

    console.log("Token", token);

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response.data)
      // @ts-ignore
      setMovies(response.data.data);
      // @ts-ignore
      setMovieCount(response.data.count);
    }).catch((error) => {

      console.log("Error", error);

      if(error.status === 500) {
        setErrorMessage("Token expirado, faça login novamente");
        setError(true);
        return;
      }
      
    });

  }, [page, reload]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`
      }
    }).then((response) => {
      console.log("User", response.data);
      //@ts-ignore
      setUser(response.data.data);
    }).catch((error) => {
      console.log("Error", error);
      if(error.status === 500) {
        setErrorMessage("Token expirado, faça login novamente");
        setError(true);
        return;
      }
    })
  }, [])

  return <>
    <ModalError open={error} handleClose={() => {setError(false)}} message={errorMessage}/>
    <ModalNewMovie handleReload={() => {setReload(!reload)}} open={modalNewMovieOpen} handleClose={() => {setModalNewMovieOpen(false)}}/>
    <Grid container spacing={2}>
      <Grid size={3} style={{textAlign: "center"}}>
        {/* <p>Bem Vindo Fulano de Tal!</p> */}
        
        { user &&
          <Typography sx={{mt: 2, mb: 2}}>Olá {user.name}!</Typography>
        }
        <Button 
          variant="contained"
          size="large"
          color="error"
          onClick={() => {
            window.localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          LogOut
        </Button>
      </Grid>
      <Grid size={6}>
        <h1>Seus Filmes Favoritos</h1>

        <AccordeonList 
          handleReloading={() => {setReload(!reload)}} 
          movies={movies}
        />
        <Grid size={12} style={{marginBottom: 20, marginTop: 20}}>
          <Pagination 
            page={page}
            count={Math.ceil(movieCount / 10)}
            style={{margin: "auto"}}
            onChange={(event, value) => {
              setPage(value);
            }}
          />
        </Grid>
        
      </Grid>
      <Grid size={3} style={{textAlign: "center"}}>
        <Button variant="contained" size="large" color="success" onClick={() => {setModalNewMovieOpen(true)}}>Novo Filme</Button>
      </Grid>

    </Grid>
  
  </>
}