import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { takeUseremail, takeUsername, takemodules } from "../Redux/UserSlice";

export default function SeConnecter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [wrongLogin, setWrongLogin] = useState("");

  const LoginUser = (e) => {
    e.preventDefault();

    axios
      .get("http://localhost:8000/server.php", {
        params: { email: email, password: password },
      })
      .then((res) => {
        if (res.data) {
          dispatch(takeUsername(res.data?.name));
          dispatch(takeUseremail(res.data?.email));
          dispatch(takemodules(res.data?.modules));
          navigate("/Dashbord");
        } else {
          setWrongLogin("email ou mot de pass incorrect");
        }
      });
  };
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="font-mono mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Se connecter a votre compte
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white-500"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="emailUser"
                name="emailUser"
                type="email"
                onChange={(e) => setemail(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white-500"
              >
                Mot de passe
              </label>
            </div>
            <div className="mt-2">
              <input
                id="passwordUser"
                name="passwordUser"
                type="password"
                onChange={(e) => setpassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {wrongLogin && <div
            class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3"
            role="alert"
          >
            <svg
              class="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
            </svg>
            <p>{wrongLogin}</p>
          </div>
}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              onClick={LoginUser}
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm">
          Pas un mombre ?{" "}
          <Link
            to="inscrire"
            className="font-semibold leading-6 text-green-400 hover:text-indigo-500"
          >
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
