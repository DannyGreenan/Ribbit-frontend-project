import { useState, useEffect, useContext, useRef } from "react";
import { ArrowRightCircle } from "react-bootstrap-icons";
import { Container, Row, Col, Form } from "react-bootstrap";
import logo from "../assets/img/logo.png";
import { getUser } from "../api";
import { LoadingContext } from "../context/Loading";
import { UserContext } from "../context/User";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = ["Post Articles", "Browse Topics", "Comment in Pools"];
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 2000;

  const [input, setInput] = useState("tickle122");
  const [usernameError, setUsernameError] = useState(false);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { user, setUser } = useContext(UserContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUser({});
    getUser(input)
      .then((user) => {
        setUser(user);
        setUsernameError(false);
        setIsLoading(false);
        setIsDisabled(false);
        navigate("/home");
      })
      .catch((err) => {
        setUsernameError(true);
        setIsLoading(false);
      });
  };

  const handleBrowseTopicsClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formRef.current) {
      if (formRef.current.checkValidity()) {
        getUser(input)
          .then((user) => {
            setUser(user);
            setIsLoading(false);
            navigate("/home");
          })
          .catch((err) => {
            setUsernameError(true);
            setIsLoading(false);
          });
      } else {
        formRef.current.reportValidity();
        setIsLoading(false);
      }
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <span className="taglin">Danny Greenan personal project</span>
            <h1>
              {`Welcome to Ribbit: `}
              <span className="wrap">{text}</span>
            </h1>
            <p>
              Personal frontend project built with React, API Backend using
              Express.js and integrates with a PostgreSQL database hosted on
              Supabase, utilising the node-postgres library for database
              interactions.
            </p>
            <Form onSubmit={handleSubmit} ref={formRef}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username..."
                  required
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                {user.username ? null : (
                  <>
                    <Form.Label style={{ color: "grey" }}>
                      Please Login, example = tickle122{" "}
                      <p style={{ color: "grey", fontSize: "12px" }}>
                        (Render server might need time to bootup, login could
                        take up to 50 seconds.)
                      </p>
                    </Form.Label>
                  </>
                )}
                {usernameError ? (
                  <Form.Label style={{ color: "red" }}>
                    {" " + "Username not Found"}
                  </Form.Label>
                ) : null}
                {Object.keys(user).length === 0 ? null : (
                  <Form.Label style={{ color: "green" }}>
                    {`Logged in as ${user.username}`}
                  </Form.Label>
                )}
              </Form.Group>
              <Row>
                <Col>
                  <button type="submit">
                    {isLoading ? "Logging in ..." : "Login "}{" "}
                    <ArrowRightCircle size={25} />
                  </button>
                </Col>
                <Col>
                  <Link to="#" onClick={handleBrowseTopicsClick}>
                    <button type="button" disabled={false}>
                      {isLoading ? "Logging in ..." : "Browse Topics"}
                      <ArrowRightCircle size={25} />
                    </button>
                  </Link>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <img src={logo} alt="Header Image" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
