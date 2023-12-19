import React from "react";
import { Container, Row, Col } from "@themesberg/react-bootstrap";
import homeLogo from "../assets/img/home-main2.png";
// import Home2 from "./Home2";
import Type from "./components/Type";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" style={{paddingBottom:0, margin:0}} id="home">
        <Container className="home-content">
          <Row>
            <Col md={6} style={{ paddingBottom: 200 }}>
                <img
                  src={homeLogo}
                  alt="home pic"
                  className="img-fluid home-main-image"
                  style={{ maxHeight: "500px" }}
                />
            </Col>

            <Col md={5} className="home-header" style={{marginLeft:100}}>
              <h1 style={{ paddingBottom: 15 }} className="heading">
              Where, {" "}
              </h1>

              <h1 className="heading-name">
                <h5 className="main-name"> talent meets opportunity. As a leading recruitment platform, Jobber connects employers with skilled professionals, streamlining the hiring process for businesses and empowering individuals to discover fulfilling careers. </h5>
              </h1>

            </Col>

          </Row>
        </Container>
      </Container>
    </section>
  );
}

export default Home;
