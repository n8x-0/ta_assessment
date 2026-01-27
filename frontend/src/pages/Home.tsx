import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Home = () => {
 return (
    <section className="bg-light py-5">
      <Container>
        <Row className="align-items-center">
          {/* Left content */}
          <Col md={6} className="text-center text-md-start">
            <h1 className="fw-bold display-5 mb-3">
              Convert Currencies <br /> Instantly & Accurately
            </h1>

            <p className="text-muted mb-4">
              Get real-time exchange rates, track your conversion history,
              and make smarter currency decisions — all in one simple app.
            </p>

            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <Link to="/app">
                <Button variant="primary" size="lg">
                  Get Started
                </Button>
              </Link>
              <Button variant="outline-secondary" size="lg">
                Learn More
              </Button>
            </div>
          </Col>

          {/* Right illustration */}
          <Col md={6} className="text-center mt-4 mt-md-0">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2331/2331941.png"
              alt="Currency Converter"
              className="img-fluid"
              style={{ maxHeight: "320px" }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Home