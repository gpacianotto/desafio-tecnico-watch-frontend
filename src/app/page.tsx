"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Button, Input, InputLabel } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import ModalError from "@/components/ModalError";
import ModalSuccess from "@/components/ModalSuccess";

export default function Home() {

  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  return (
    <>
    <div className={styles.auxiliarContainer}>
      <div></div>
      <div className={styles.container}>
        <h1>Bem vindo ao NeoSkoob!</h1>
        <p>O seu lugar para criar suas resenhas dos seus filmes favoritos!</p>
      <div>
        { !isRegister &&
          <form className={styles.loginForm}>
            <h2>Login</h2>
            <div>
              <InputLabel htmlFor="email">Email:</InputLabel>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                required 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div>
              <InputLabel htmlFor="password">Senha:</InputLabel>
              <Input 
                type="password" 
                id="password" 
                name="password" 
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)} 
              />
            </div>
            <Button 
              onClick={(e) => {
                axios.post(
                  `${process.env.NEXT_PUBLIC_API_URL}/auth/login`, 
                  {
                    email: loginEmail,
                    password: loginPassword
                  }
                  
                ).then((res) => {
                  console.log("Login result", res);

                  //@ts-ignore
                  // JWT.token = res?.data?.data?.token;

                  window.localStorage.setItem("token", res?.data?.data?.token);

                  window.location.href = "/home";
                  return;
                })
                .catch((err) => {
                  console.log("Login error", err.response.data.message);
                  
                  if(err.response.data.message) {
                    setErrorMessage(err.response.data.message);
                    setError(true);
                    return;
                  }
                  
                  setErrorMessage("Erro ao fazer login");
                  setError(true);
                });

              }}
            > 
              Login
            </Button>
            <Button 
              color="secondary"
              onClick={() => setIsRegister(!isRegister)}
            >
              Registre-se
            </Button>
          </form>
        }

        { isRegister &&
          <form className={styles.registerForm}>
            <h2>Registre-se</h2>
            <div>
                <InputLabel htmlFor="name">Seu Nome:</InputLabel>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                />
              
            </div>
            <div>
              <InputLabel htmlFor="email">Email:</InputLabel>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                required
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)} 
              />
            </div>
            <div>
              <InputLabel htmlFor="password">Senha:</InputLabel>
              <Input
                type="password"
                id="password"
                name="password"
                required
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <div>
              <InputLabel htmlFor="confirmPassword">Confirme sua Senha:</InputLabel>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
              />
            </div>
            <Button 
              onClick={(e) => {
                if(registerPassword !== registerConfirmPassword) {
                  setErrorMessage("As senhas não conferem");
                  setError(true);
                  return;
                }

                axios.post(
                  `${process.env.NEXT_PUBLIC_API_URL}/onboarding`, 
                  {
                    name: registerName,
                    email: registerEmail,
                    password: registerPassword
                  }
                ).then((res) => {
                  console.log("Register result", res);

                  if(res?.data) {
                    setSuccessMessage("Conta regristrada com sucesso!");
                    setSuccess(true);
                    return;
                  }
                })
                .catch((err) => {
                  console.log("Register error", err.response.data.message);
                  
                  if(err.response.data.message) {
                    setErrorMessage(err.response.data.message);
                    setError(true);
                    return;
                  }
                  
                  setErrorMessage("Erro ao fazer registro");
                  setError(true);
                })

              }}
            >
              Register
            </Button>
            <Button 
              color="secondary"
              onClick={() => setIsRegister(!isRegister)}
            >
              Volte ao Login
            </Button>
          </form>
        }

      </div>
      </div>
      <div>
        <ModalError open={error} handleClose={() => {setError(false)}} message={errorMessage}/>
        <ModalSuccess 
          open={success} 
          handleClose={() => {setSuccess(false); setIsRegister(false);}} 
          message={successMessage}

        />
        </div>
    </div>
    </>
  );
}
