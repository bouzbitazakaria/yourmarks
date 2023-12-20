import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function Sinscrire() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpasword] = useState("");
  const [succes, setsucces] = useState(false);

  const SignUpUser = async(e) => {
    e.preventDefault();

    if (password === confirmpassword) {
      await Axios.post("http://localhost:8000/server.php", {
        name: name,
        email: email,
        password: password,
      }).then((res) => {
          if(res.data?.message==="SignUp Succes"){
            setsucces(true)
          }
          else{
           setsucces(false)
          }
        })
    }
  };
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black text-white">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="font-mono mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
        Creer un nouveau Compte
      </h2>
    </div>
  
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6 SignUpForm">
        <div>
          <label htmlFor="NomNuser" className="block text-sm font-medium leading-6 text-white-500">
            Nom
          </label>
          <div className="mt-2">
            <input
              id="NomNuser"
              name="NomNuser"
              type="text"
              onChange={(e) => setname(e.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
  
        <div>
          <label htmlFor="emailNuser" className="block text-sm font-medium leading-6 text-white-500">
            Email 
          </label>
          <div className="mt-2">
            <input
              id="emailNuser"
              name="emailNuser"
              type="email"
              onChange={(e) => setemail(e.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
  
        <div>
          <label htmlFor="passwordNuser" className="block text-sm font-medium leading-6 text-white-500">
            Nouveau Mot de passe
          </label>
          <div className="mt-2">
            <input
              id="passwordNuser"
              name="passwordNuser"
              type="password"
              onChange={(e) => setpassword(e.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
  
        <div>
          <label htmlFor="confirmPasswordNuser" className="block text-sm font-medium leading-6 text-white-500">
            Confirmer mot de passe
          </label>
          <div className="mt-2">
            <input
              id="confirmPasswordNuser"
              name="confirmPasswordNuser"
              type="password"
              onChange={(e) => setconfirmpasword(e.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
  
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={SignUpUser}
          >
            inscrire
          </button>
        </div>
      </form>
  
      <p className="mt-10 text-center text-sm">
        Vous avez deja un account ?{' '}
        <Link to="/" className="font-semibold leading-6 text-green-400 hover:text-indigo-500">
          Se connecter
        </Link>
      </p>
    </div>
  </div>
  );
}
