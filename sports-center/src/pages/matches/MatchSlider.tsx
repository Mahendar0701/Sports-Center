// import React from "react";
// import Slider from "react-slick";

// interface Match {
//   id: number;
//   name: string;
//   location: string;
//   sportName: string;
//   endsAt: string;
//   isRunning: boolean;
// }

// interface MatchSliderProps {
//   matches: Match[];
// }

// const MatchSlider: React.FC<MatchSliderProps> = ({ matches }) => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3, // Adjust the number of matches to display
//     slidesToScroll: 1,
//   };

//   return (
//     <Slider {...settings}>
//       {matches.map((match) => (
//         <div key={match.id} className="match-slide ">
//           <h3>{match.sportName}</h3>
//           <p>{match.name}</p>
//           <p>{match.location}</p>
//           <p>
//             {new Date(match.endsAt).toLocaleDateString("en-US", {
//               year: "numeric",
//               month: "short",
//               day: "2-digit",
//             })}
//           </p>
//         </div>
//       ))}
//     </Slider>
//   );
// };

// export default MatchSlider;

import React, { useState } from "react";

const MatchSlider = ({ matches }) => {
  const [currentMatch, setCurrentMatch] = useState(0);

  const nextMatch = () => {
    setCurrentMatch((prevMatch) =>
      prevMatch === matches.length - 1 ? 0 : prevMatch + 1
    );
  };

  const prevMatch = () => {
    setCurrentMatch((prevMatch) =>
      prevMatch === 0 ? matches.length - 1 : prevMatch - 1
    );
  };

  return (
    <div className="match-slider">
      <button onClick={prevMatch} className="prev-button">
        &lt;
      </button>
      <div className="match-card">
        <h2>{matches[currentMatch].name}</h2>
        <p>{matches[currentMatch].sportName}</p>
      </div>
      <button onClick={nextMatch} className="next-button">
        &gt;
      </button>
    </div>
  );
};

export default MatchSlider;
