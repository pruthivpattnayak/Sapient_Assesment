import React, { Fragment } from "react";
import * as constants from "../../constants";
import "./SideBar.css";

function SideBar({
  data,
  handleYearClick,
  selectedYear,
  handleS_LunchClick,
  handleS_LandingClick,
  s_Lunch,
  s_Landing,
}) {
  const yearData = constants.YEAR_LUNCH;

  const successfulNodeStyles = (selector, data) => {
    if (selector === "s_Lunch") {
      return applyStyles(data, s_Lunch);
    } else {
      return applyStyles(data, s_Landing);
    }
  };
  const successfulNode = (data) => {
    return (
      <Fragment>
        <hr />
        <div className="cellContainer">
          <div
            className={successfulNodeStyles(data, "True")}
            onClick={(e) => handleClick(e, data)}
          >
            {"True"}
          </div>
          <div
            className={successfulNodeStyles(data, "False")}
            onClick={(e) => handleClick(e, data)}
          >
            {"False"}
          </div>
        </div>
      </Fragment>
    );
  };

  const handleClick = (e, data) => {
    if (data === "s_Lunch") {
      if (e.target.innerText === s_Lunch) {
        handleS_LunchClick("");
      } else {
        handleS_LunchClick(e.target.innerText);
      }
    } else {
      if (e.target.innerText === s_Landing) {
        handleS_LandingClick("");
      } else {
        handleS_LandingClick(e.target.innerText);
      }
    }
  };

  const lunchYearHandle = (e, data) => {
    if (data === selectedYear) {
      handleYearClick("");
    } else {
      handleYearClick(data);
    }
  };

  const applyStyles = (data, selector) => {
    if (!data) {
      return "cell hide";
    }
    if (data === selector) {
      return "cell active";
    } else {
      return "cell";
    }
  };

  const yearNode = [];

  for (let i = 0; i <= yearData.length - 1; i += 2) {
    yearNode.push(
      <div key={i} className="cellContainer">
        <div
          className={applyStyles(yearData[i], selectedYear)}
          onClick={(e) => lunchYearHandle(e, yearData[i])}
        >
          {yearData[i]}
        </div>
        <div
          className={applyStyles(yearData[i + 1], selectedYear)}
          onClick={(e) => lunchYearHandle(e, yearData[i + 1])}
        >
          {yearData[i + 1]}
        </div>
      </div>
    );
  }

  return (
    <div className="filter_container">
      <div className="sub_headers">Filters</div>
      <div className="filter_inner_container">
        <div className="label">Launch Year</div>
        <hr />
        <div>{yearNode}</div>
        <div className="label">Successful Launch</div>
        {successfulNode("s_Lunch")}
        <div className="label">Successful Landing</div>
        {successfulNode("s_Landing")}
      </div>
    </div>
  );
}

export default SideBar;
