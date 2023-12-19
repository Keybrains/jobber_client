import React from "react";
import { Container, Row, Col } from "@themesberg/react-bootstrap";
import homeLogo from "../assets/img/home-main.png";
// import Home2 from "./Home2";
import Type from "./components/Type";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
              Explore Opportunities!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                It's
                <strong className="main-name"> job Cloud Company </strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 0 }}>
                <img
                  src={homeLogo}
                  alt="home pic"    
                  className="img-fluid home-main-image"
                  style={{ maxHeight: "450px" }}
                />
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
}

export default Home;
