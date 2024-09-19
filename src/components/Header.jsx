import { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { UserContext } from "../context/User";
import { Link } from "react-router-dom";

import logo from "../assets/img/text-logo.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/artstation.png";
import navIcon3 from "../assets/img/resume.png";
import navIcon4 from "../assets/img/github.png";

export const Header = () => {
  const [activeLink, setActiveLink] = useState("home");

  const [scrolled, setScrolled] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  const onLogout = () => {
    setUser({});
  };

  return (
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <img src={logo} alt="logo"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/home"
              className={
                activeLink === "home" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("home")}>
              Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/profile"
              className={
                activeLink === "profile" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("profile")}>
              {user.username ? user.username : "Profile"}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/"
              className={
                activeLink === "logout" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onLogout()}>
              Logout
            </Nav.Link>
          </Nav>

          <span className="navbar-text">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/danny-greenan/">
                <img src={navIcon1} alt=""></img>
              </a>
              <a href="https://github.com/DannyGreenan">
                <img src={navIcon4} alt=""></img>
              </a>
              <a href="https://www.artstation.com/dannygreenan">
                <img src={navIcon2} alt=""></img>
              </a>
              <a href="https://docs.google.com/document/d/1Oap6DoS1R_vl4su7goZcx_PZaqhcjxceXkMEEBGGqYU/edit?usp=sharing">
                <img src={navIcon3} alt=""></img>
              </a>
            </div>
            <button className="vvd" onClick={() => console.log("connect")}>
              <span>Post an Article</span>
            </button>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
