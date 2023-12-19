import React from "react";

import LandingPageNavbar from "../components/LandingPageNavbar";
import Home from "./LandingContent1";
import "../style.css";
import LandingContent2 from "./LandingContent2";
import LandingContent3 from "./LandingContent3";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

function LandingPage() {
  const cookies = new Cookies();
  const history = useHistory();

  React.useEffect(() => {
    const userData = cookies.get("token");

    if (!userData) {
      history.push("/sign-in");
    }
  }, [cookies]);

  return (
    <div>
      <LandingPageNavbar />
      <Home />
      <LandingContent2 />
      <LandingContent3 />
    </div>
  );
}

export default LandingPage;
