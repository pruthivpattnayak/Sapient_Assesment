import React, { useState, useEffect } from "react";
import "./App.css";
import SideBar from "./Components/SideBar/SideBar";
import Cards from "./Components/Cards/Cards";

function App() {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [s_Lunch, setS_Lunch] = useState("");
  const [s_Landing, setS_Landing] = useState("");

  const API_URL = "https://api.spaceXdata.com/v3/launches?limit=100";

  useEffect(() => {
    const loadData = async () => {
      const lunchYear_URL = selectedYear && `&launch_year=${selectedYear}`;
      const s_Lunch_URL = s_Lunch && `&launch_success=${s_Lunch.toLowerCase()}`;
      const s_Landing_URL =
        s_Landing && `&land_success=${s_Landing.toLowerCase()}`;
      const response = await fetch(
        `${API_URL}${lunchYear_URL}${s_Lunch_URL}${s_Landing_URL}`
      );
      const data = await response.json();
      setData(data);
    };
    loadData();
  }, [selectedYear, s_Lunch, s_Landing]);

  const handleYearClick = (data) => {
    setSelectedYear(data);
  };
  const handleS_LunchClick = (data) => {
    setS_Lunch(data);
  };
  const handleS_LandingClick = (data) => {
    setS_Landing(data);
  };

  return (
    <div className="mainContainer">
      <div className="row">
        <div className="header">SpaceX Launch Programs</div>
        <div className="column left">
          <SideBar
            data={data}
            handleYearClick={handleYearClick}
            handleS_LunchClick={handleS_LunchClick}
            handleS_LandingClick={handleS_LandingClick}
            selectedYear={selectedYear}
            s_Lunch={s_Lunch}
            s_Landing={s_Landing}
          />
        </div>
        <div className="column right">
          {data && data.length > 0 ? <Cards data={data} />:<div className="nodata">No Data Found</div>}
        </div>
      </div>
      <div className="name_container">
        <div className="sub_header">{"Developed by: "}</div>
        <div>{"Pruthiv Pattnayak"}</div>
      </div>
    </div>
  );
}

export default App;
