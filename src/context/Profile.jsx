import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticlesByAuthor, getUser } from "../api";

import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Carousel,
  Accordion,
} from "react-bootstrap";

const Profile = () => {
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [userArticles, setUserArticles] = useState([]);
  const [activeKey, setActiveKey] = useState("0");

  useEffect(() => {
    getUser(username)
      .then((user) => {
        setUserProfile(user);
        return getArticlesByAuthor(user.username);
      })
      .then((articles) => {
        setUserArticles(articles);
      });
  }, []);

  return (
    <>
      <div className="user-page">
        <Container>
          <Row>
            <Col md={1}></Col>
            <Col md={2}>
              <img
                src={userProfile.avatar_url}
                alt="User Avatar"
                style={{
                  width: "150px",
                  height: "100px",
                }}
              />
            </Col>
            <Col md={3}>
              <h2>u/{userProfile.username}</h2>
              <h3>{userProfile.name}</h3>
            </Col>
            <Col md={6}>
              <Carousel>
                {userArticles
                  ? userArticles.map((article, index) => {
                      return (
                        <Carousel.Item key={index}>
                          <img
                            src={article.article_img_url}
                            style={{
                              width: "100%",
                              maxHeight: "300px",
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                            alt={`Slide ${index}`}
                          />
                          <Carousel.Caption>
                            <h3>{article.title}</h3>
                            <p>p/{article.topic}</p>
                          </Carousel.Caption>
                        </Carousel.Item>
                      );
                    })
                  : null}
              </Carousel>
            </Col>
          </Row>
          <Row>
            <Container>
              <h2>User Articles</h2>
              {userArticles ? (
                <Accordion
                  activeKey={activeKey}
                  onSelect={(key) => setActiveKey(key)}>
                  {userArticles.map((article, index) => (
                    <Accordion.Item eventKey={String(index)} key={index}>
                      <Accordion.Header
                        style={{ backgroundColor: "#f06292", color: "white" }}>
                        {new Date(article.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </Accordion.Header>
                      <Accordion.Body>
                        <img
                          src={article.article_img_url}
                          alt="article thumbnail"
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}></img>
                        <Link
                          to={`/home/${article.topic}/${article.article_id}`}>
                          {article.title}
                        </Link>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              ) : null}
            </Container>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Profile;
