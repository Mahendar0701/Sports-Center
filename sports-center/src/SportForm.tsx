import React from "react";
// import useState from "react";
import { SportItem } from "./types";
interface SportFormProps {
  addSport: (task: SportItem) => void;
}
interface SportFormState {
  title: string;
}
const SportForm = (props: SportFormProps) => {
  const [formState, setFormState] = React.useState<SportFormState>({
    title: "",
    // description: "",
    // dueDate: "",
  });
  const titleChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(`${event.target.value}`);
    setFormState({ ...formState, title: event.target.value });
  };
  //   setFormState({ title: "sample title" });
  const addSport: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log(`Submitted the form with`);
    if (formState.title.length === 0) {
      return;
    }
    props.addSport(formState);
    setFormState({ title: "" });
  };
  return (
    <form onSubmit={addSport}>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="relative z-0 w-full mb-6 group">
          <input
            id="todoTitle"
            name="todoTitle"
            type="text"
            value={formState.title}
            onChange={titleChanged}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="todoTitle"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Sport Title
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add item
          </button>
        </div>
      </div>
    </form>
  );
};
// class SportForm extends React.Component<SportFormProps, SportFormState> {
//   constructor(props: SportFormProps) {
//     super(props);
//     this.state = {
//       title: "",
//     };
//   }
//   titleChanged: React.ChangeEventHandler<HTMLInputElement> = (event) => {
//     console.log(`${event.target.value}`);
//     this.setState({ title: event.target.value });
//   };
//   addSport: React.FormEventHandler<HTMLFormElement> = (event) => {
//     event.preventDefault();
//     console.log(`Submitted the form with ${this.state.title}`);
//     const newSport = {
//       title: this.state.title,
//     };
//     this.props.addSport(newSport);
//     this.setState({ title: "" });
//   };

//   render() {
//     return (
//       <form onSubmit={this.addSport}>
//         <input
//           className="border"
//           type="text"
//           value={this.state.title}
//           onChange={this.titleChanged}
//         />
//         <button type="submit">Add item</button>
//       </form>
//     );
//   }
// }
export default SportForm;
