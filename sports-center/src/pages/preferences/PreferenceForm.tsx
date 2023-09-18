// // First we will import Dialog and Transition component from '@headlessui/react'

// import { Dialog, Transition } from "@headlessui/react";

// // Next we will import Fragment and useState component from 'react'

// import { Fragment, useState } from "react";
// const NewArticle = () => {
//   // Then we will use useState hook to handle local state for dialog component

//   let [isOpen, setIsOpen] = useState(false);

//   // Then we add the openModal function.
//   // If you don't know, Modal and Dialog are almost same thing.

//   const sportsData = [
//     { id: 1, name: "Basketball" },
//     { id: 2, name: "American Football" },
//     { id: 3, name: "Rugby" },
//     { id: 4, name: "Field Hockey" },
//     { id: 5, name: "Table Tennis" },
//     { id: 6, name: "Cricket" },
//   ];

//   const teamsData = [
//     { id: 1, name: "Thunderbolts" },
//     { id: 2, name: "Dragonslayers" },
//     { id: 3, name: "Phoenix Rising" },
//     { id: 4, name: "Avalanche" },
//     { id: 5, name: "Titans" },
//     { id: 6, name: "Vortex Vipers" },
//     { id: 7, name: "Spectral Shadows" },
//     { id: 8, name: "Blitzkrieg" },
//     { id: 9, name: "Fury United" },
//     { id: 10, name: "Lightning Strikes" },
//     { id: 11, name: "Serpents of Fire" },
//     { id: 12, name: "Galaxy Warriors" },
//     { id: 13, name: "Stormbreakers" },
//     { id: 14, name: "Enigma Enforcers" },
//     { id: 15, name: "Blaze Squadron" },
//     { id: 16, name: "Phantom Phantoms" },
//     { id: 17, name: "Celestial Chargers" },
//     { id: 18, name: "Rebel Renegades" },
//     { id: 19, name: "Inferno Ignitors" },
//     { id: 20, name: "Stealth Strikers" },
//     { id: 21, name: "Nova Knights" },
//     { id: 22, name: "Crimson Crushers" },
//     { id: 23, name: "Rapid Raptors" },
//     { id: 24, name: "Shadow Assassins" },
//   ];

//   const openModal = () => {
//     setIsOpen(true);
//   };

//   // Then we add the closeModal function
//   const closeModal = () => {
//     setIsOpen(false);
//   };

//   // In the return statement, we will use the code for modal
//   // that we've obtained from https://headlessui.com/react/dialog

//   return (
//     <>
//       <button
//         type="button"
//         onClick={openModal}
//         className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
//       >
//         Preferences
//       </button>
//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>
//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   <Dialog.Title
//                     as="h3"
//                     className="text-lg font-medium leading-6 text-gray-900"
//                   >
//                     Favorite Sport
//                   </Dialog.Title>
//                   <div className="mt-2">
//                     <form>
//                       {/* <input
//                         type="checkbox"
//                         required
//                         placeholder="Enter project name..."
//                         autoFocus
//                         name="name"
//                         id="name"
//                         className="w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
//                       /> */}
//                       {sportsData.map((sport) => (
//                         <div key={sport.id} className="flex items-center">
//                           <input
//                             type="checkbox"
//                             id={`sport-${sport.id}`}
//                             name={`sport-${sport.id}`}
//                             className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                           />
//                           <label
//                             htmlFor={`sport-${sport.id}`}
//                             className="ml-2 text-gray-700"
//                           >
//                             {sport.name}
//                           </label>
//                         </div>
//                       ))}
//                       <h1>Favourite Teams</h1>

//                       {teamsData.map((team) => (
//                         <div key={team.id} className="flex items-center">
//                           <input
//                             type="checkbox"
//                             id={`team-${team.id}`}
//                             name={`team-${team.id}`}
//                             className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                           />
//                           <label
//                             htmlFor={`team-${team.id}`}
//                             className="ml-2 text-gray-700"
//                           >
//                             {team.name}
//                           </label>
//                         </div>
//                       ))}
//                       <button
//                         type="submit"
//                         className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                       >
//                         Submit
//                       </button>
//                       <button
//                         type="submit"
//                         onClick={closeModal}
//                         className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                       >
//                         Cancel
//                       </button>
//                     </form>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// };

// export default NewArticle;
