import React from "react";
import { Link } from "react-router-dom";

import Analysis from "./Analysis";
import Carrot from "./Carrot";
import Hospital from "./Hospital";
import Mart from "./Mart";
import PoliceOffice from "./PoliceOffice";
import School from "./School";

const MainPage = () => {
  return (
    <div>
      <h1>MainPage</h1>
      <div>
        <Link to="/analysis">
          <Analysis />
        </Link>
      </div>
      <div>
        <Link to="/carrot">
          <Carrot />
        </Link>
      </div>
      <div>
        <Link to="/hospital">
          <Hospital />
        </Link>
      </div>
      <div>
        <Link to="/mart">
          <Mart />
        </Link>
      </div>
      <div>
        <Link to="/police">
          <PoliceOffice />
        </Link>
      </div>
      <div>
        <Link to="/school">
          <School />
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
