// import React from "react";
import Sport from "./Sport";
import { SportItem } from "./types";

interface Props {
  sports: SportItem[];
}

// interface SportItem {
//   title: string;
// }
// interface State {
//   // sports: SportItem[];
// }

const SportList = (props: Props) => {
  const list = props.sports.map((sport, idx) => (
    <Sport key={idx} title={sport.title} />
  ));
  return <>{list}</>;
};

// class SportList extends React.Component<Props, State> {
//   // constructor(props: Props) {
//   //   // componentDidMount() {
//   //   super(props);
//   //   const sports = [{ title: "Pay rent" }, { title: "Submit assignment" }];
//   //   this.state = {
//   //     sports,
//   //   };
//   // }
//   render() {
//     return this.props.sports.map((sport, idx) => (
//       <Sport key={idx} title={sport.title} />
//     ));
//   }
// }

export default SportList;
