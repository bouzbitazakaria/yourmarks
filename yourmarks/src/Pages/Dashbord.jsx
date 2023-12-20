import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removemodule, takemodules } from "../Redux/UserSlice";
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function Dashbord() {
  const moduleOptions = [
    "Francais",
    "Anglais technique",
    "Culture entrepreneriale",
    "Competances comportementales",
    "Culture et techniques avancees du numirique",
    "Preparation d'un projet web",
    "Approche agile",
    "Gestion des donnes",
    "Developpement Front-end",
    "Develepement back-end",
    "Creation d'une application Cloud native",
    "Projet de synthese",
    "Integration du milieu Professionnel",
  ];
  const[open, setOpen] = useState(false);
  const Username = useSelector((state) => state.user?.name);
  const Useremail = useSelector((state) => state.user.email);
  const Usermodules = useSelector((state) => state.user?.modules);
  const [nomModule, setnomModule] = useState("");
  const [CoeffModule, setcoeffModule] = useState(0);
  const [CC1, setCC1] = useState(0);
  const [CC2, setCC2] = useState(0);
  const [CC3, setCC3] = useState(0);
  const [EFM, setEFM] = useState(0);
  const [newModule, setNewModule] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(takemodules(newModule));
  }, [newModule]);
  const AddnewModule = () => {
    axios
      .post("http://localhost:8000/Data.php", {
        email: Useremail,
        nomModule: {
          modulename: nomModule,
          CoeffModule: CoeffModule,
          CC1: CC1,
          CC2: CC2,
          CC3: CC3,
          EFM: EFM,
        },
      })
      .then((res) => setNewModule(res.data?.modules));
  };

  const RemoveModule = (e) => {
    axios.post("http://localhost:8000/RemoveData.php", {
      modulename: e,
      email: Useremail,
    });
    dispatch(removemodule(e));
    setOpen(false)
  };

  return (
    <main className="flex bg-gray-100 min-h-screen">
      <div className="SidBarre bg-gray-300 p-4" style={{ width: "400px" }}>
        <div className="AddMarks bg-white p-4 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="" className="font-semibold">
              Nom du Module:
            </label>
            <select
              className="NewMinp border rounded-md p-2 w-full"
              onChange={(e) => setnomModule(e.target.value)}
              required
            >
              <option value="" disabled selected>
                Select a module
              </option>
              {moduleOptions.map((module, index) => (
                <option key={index} value={module}>
                  {module}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="" className="font-semibold">
              Coefficient:
            </label>
            <input
              className="Coeffinp border rounded-md p-2 w-full hover:border-rose-600"
              type="number"
              value={CoeffModule}
              onChange={(e) => setcoeffModule(e.target.value)}
              required
            />
          </div>
          <div className="Notes mb-4">
            <p className="font-semibold">Notes Examens:</p>
            <div className="flex space-x-4">
              <div className="CC1">
                <label htmlFor="" className="font-semibold mr-5">
                  CC1
                </label>
                <input
                  type="number"
                  placeholder="/20"
                  onChange={(e) => setCC1(e.target.value)}
                  className="border rounded-md p-2  w-20 hover:border-rose-600"
                  value={CC1}
                  required
                />
              </div>
              <div className="CC2">
                <label htmlFor="" className="font-semibold mr-5">
                  CC2
                </label>
                <input
                  type="number"
                  placeholder="/20"
                  onChange={(e) => setCC2(e.target.value)}
                  className="border rounded-md p-2  w-20 hover:border-rose-600"
                  value={CC2}
                  required
                />
              </div>
              <div className="CC3">
                <label htmlFor="" className="font-semibold mr-5">
                  CC3
                </label>
                <input
                  type="number"
                  placeholder="/20"
                  onChange={(e) => setCC3(e.target.value)}
                  className="border rounded-md p-2  w-20 hover:border-rose-600"
                  value={CC3}
                  required
                />
              </div>
            </div>
          </div>
          <div className="EFM mb-4">
            <label htmlFor="" className="font-semibold">
              Note EFM: {' '}
            </label>
            <input
              type="number"
              placeholder="/40"
              onChange={(e) => setEFM(e.target.value)}
              className="border rounded-md p-2 hover:border-rose-600"
              value={EFM}
              required
            />
          </div>
          <button
            onClick={AddnewModule}
            className="bg-blue-500  text-white px-4 py-2 rounded-md  hover:bg-blue-600 focus:outline-none "
          >
            Confirmer
          </button>
        </div>
      </div>
      <div className="States p-4 flex-1 ">
        <h3 className="text-2xl mb-4">Hi {Username}</h3>
        <div className="ListModules grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {Usermodules &&
            Usermodules.map((e) => {
              return (
                <div
                  key={e.modulename}
                  className="Modules p-5 rounded-lg shadow-md bg-sky-300 "
                  style={{ width: "220px" }}
                >
                  <h3 className="modulename text-lg font-semibold mb-2">
                    {e.modulename}
                  </h3>
                  <div className="CoeffModule mb-2">
                    CoeffModule: {e.CoeffModule}
                  </div>
                  <div className="CC1 mb-2">CC1: {e.CC1}</div>
                  <div className="CC2 mb-2">CC2: {e.CC2}</div>
                  <div className="CC3 mb-2">CC3: {e.CC3}</div>
                  <div className="EFM mb-2">EFM: {e.EFM}</div>
                  <div className="Meyenne mb-2">
                    Moyenne générale:
                    {(Number(e.CC1) + Number(e.CC2) + Number(e.CC3)) * 0.25 +
                      (Number(e.EFM) / 2) * 0.75}
                  </div>
                  <button
                    onClick={() => setOpen(true)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                  >
                    Remove
                  </button>
                  <Transition.Root show={open} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      onClose={setOpen}
                    >
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                      </Transition.Child>

                      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                          >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationTriangleIcon
                                      className="h-6 w-6 text-red-600"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <Dialog.Title
                                      as="h3"
                                      className="text-base font-semibold leading-6 text-gray-900"
                                    >
                                     Remove Module
                                    </Dialog.Title>
                                    <div className="mt-2">
                                      <p className="text-sm text-gray-500">
                                        Are you sure you want to remove thos infos ?
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                  type="button"
                                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                  onClick={() => RemoveModule(e.modulename)}
                                >
                                  Remove
                                </button>
                                <button
                                  type="button"
                                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                  onClick={() => setOpen(false)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition.Root>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
}
