// import React, { useEffect } from "react";
import { SportItem } from "./types";
import SportForm from "./SportForm";
import SportList from "./SportList";
import { useLocalStorage } from "./hooks/useLocalStorage";

// interface SportAppProp {}
interface SportAppState {
  sports: SportItem[];
}

const SportApp = () => {
  const [sportAppState, setSportAppState] = useLocalStorage<SportAppState>(
    "sports",
    {
      sports: [],
    }
  );
  //   useEffect(() => {
  //     const id = setTimeout(() => {
  //       console.log(`Saved ${sportAppState.sports.length} items to backend...`);
  //     }, 5000);
  //     return () => {
  //       console.log("clear or cancel any existing network call");
  //       clearTimeout(id);
  //     };
  //   }, [sportAppState.sports]);
  const addSport = (sport: SportItem) => {
    setSportAppState({ sports: [...sportAppState.sports, sport] });
  };
  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl mb-2 font-bold text-slate-700">Smarter Tasks</h1>
      <h1 className="text-lg mb-6 text-slate-600">
        <span className="font-bold">Project: </span>
        Graduation Final Year Project (Revamp college website)
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-slate-200 rounded-xl p-4">
          <h1 className="text-slate-500 text-xl font-bold text-center mb-2">
            Pending
          </h1>
          <SportForm addSport={addSport} />
          <SportList sports={sportAppState.sports} />
        </div>
      </div>
    </div>
  );
};

// class SportApp extends React.Component<SportAppProp, SportAppState> {
//   constructor(props: SportAppProp) {
//     super(props);
//     this.state = {
//       sports: [],
//     };
//   }
//   addSport = (sport: SportItem) => {
//     this.setState((state) => {
//       return {
//         sports: [...state.sports, sport],
//       };
//     });
//   };
//   render() {
//     return (
//       //   <div>

//       //   </div>
//       <div className="container py-10 max-w-4xl mx-auto">
//         <h1 className="text-3xl mb-2 font-bold text-slate-700">
//           Smarter Tasks
//         </h1>
//         <h1 className="text-lg mb-6 text-slate-600">
//           <span className="font-bold">Project: </span>
//           Graduation Final Year Project (Revamp college website)
//         </h1>
//         <div className="grid grid-cols-2 gap-4">
//           <div className="border border-slate-200 rounded-xl p-4">
//             <h1 className="text-slate-500 text-xl font-bold text-center mb-2">
//               Pending
//             </h1>
//             <SportForm addSport={this.addSport} />
//             <SportList sports={this.state.sports} />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

export default SportApp;
