import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col>
            {" "}
            <h2>Ribbit</h2>
          </Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="warning" id="dropdown-basic">
                Topics
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/home/coding">
                  Coding
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/home/football">
                  Football
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/home/cooking">
                  Cooking
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/home">
                  All Items
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            {" "}
            <Link to="/home">Home</Link>
          </Col>
          <Col>
            {" "}
            <Link>Profile</Link>
          </Col>
          <Col>
            {" "}
            <Link>Logout</Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Header;
