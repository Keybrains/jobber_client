import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Connecting Talent with Opportunity.",
          "Your Dream Job Awaits",
          "Empowering Careers, Enriching Lives",
          "Discover Your Next Career Move",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
