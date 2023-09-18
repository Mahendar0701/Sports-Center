import React from "react";
import "./SportCard.css";
import { SportItem } from "./types";

// interface SportProp {
//   title: string;
// }

const Sport = (props: SportItem) => {
  return (
    <div className="TaskItem shadow-md border border-slate-100">
      <h2 className="text-base font-bold my-1">{props.title}</h2>
    </div>
  );
};

// class Sport extends React.Component<SportProp> {
//   render() {
//     return (
//       <div className="SportItem shadow-md border-gray-500">
//         <h2 className="text-base font-bold my-1">{this.props.title}</h2>
//         <p className="text-sm text-slate-500">Due Date:</p>
//         <p className="text-sm text-slate-500">Description:</p>
//       </div>
//     );
//   }
// }
export default Sport;
