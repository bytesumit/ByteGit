// import React, { useEffect, useState } from "react";
// import HeatMap from "@uiw/react-heat-map";

// // Function to generate random activity
// const generateActivityData = (startDate, endDate) => {
//   const data = [];
//   let currentDate = new Date(startDate);
//   const end = new Date(endDate);

//   while (currentDate <= end) {
//     const count = Math.floor(Math.random() * 50);
//     data.push({
//       date: currentDate.toISOString().split("T")[0], //YYY-MM-DD
//       count: count,
//     });
//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   return data;
// };

// const getPanelColors = (maxCount) => {
//   const colors = {};
//   for (let i = 0; i <= maxCount; i++) {
//     const greenValue = Math.floor((i / maxCount) * 255);
//     colors[i] = `rgb(0, ${greenValue}, 0)`;
//   }

//   return colors;
// };

// const HeatMapProfile = () => {
//   const [activityData, setActivityData] = useState([]);
//   const [panelColors, setPanelColors] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       const startDate = "2001-01-01";
//       const endDate = "2001-01-31";
//       const data = generateActivityData(startDate, endDate);
//       setActivityData(data);

//       const maxCount = Math.max(...data.map((d) => d.count));
//       setPanelColors(getPanelColors(maxCount));
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h4>Recent Contributions</h4>
//       <HeatMap
//         className="HeatMapProfile"
//         style={{ maxWidth: "700px", height: "200px", color: "white" }}
//         value={activityData}
//         weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
//         startDate={new Date("2001-01-01")}
//         rectSize={15}
//         space={3}
//         rectProps={{
//           rx: 2.5,
//         }}
//         panelColors={panelColors}
//       />
//     </div>
//   );
// };

// export default HeatMapProfile;


// my updated code 

import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import "bootstrap/dist/css/bootstrap.min.css";

// Function to generate random activity
const generateActivityData = (startDate, endDate) => {
  const data = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    const count = Math.floor(Math.random() * 50);
    data.push({
      date: currentDate.toISOString().split("T")[0], // YYYY-MM-DD
      count: count,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

const getPanelColors = (maxCount) => {
  const colors = {};
  const colorShades = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
  for (let i = 0; i <= maxCount; i++) {
    colors[i] = colorShades[Math.min(Math.floor((i / maxCount) * colorShades.length), colorShades.length - 1)];
  }
  return colors;
};

const HeatMapProfile = () => {
  const [activityData, setActivityData] = useState([]);
  const [panelColors, setPanelColors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const startDate = "2024-01-01";
      const endDate = "2024-03-10";
      const data = generateActivityData(startDate, endDate);
      setActivityData(data);

      const maxCount = Math.max(...data.map((d) => d.count));
      setPanelColors(getPanelColors(maxCount));
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4 p-3 bg-light rounded shadow">
      <h4 className="text-dark mb-3">Recent Contributions</h4>
      <div className="d-flex justify-content-center">
        <HeatMap
          className="HeatMapProfile"
          style={{ maxWidth: "100%", height: "auto" }}
          value={activityData}
          weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
          startDate={new Date("2024-01-01")}
          rectSize={15}
          space={3}
          rectProps={{ rx: 2.5 }}
          panelColors={panelColors}
        />
      </div>
    </div>
  );
};

export default HeatMapProfile;