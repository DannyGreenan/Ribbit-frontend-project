import { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getAllArticles } from "../api";
import Pagination from "react-bootstrap/Pagination";
import topicErrorImg from "../assets/img/topic-error.png";
import upVoteImg from "../assets/img/up.png";

import { ChatDots, ArrowRightCircle, Share } from "react-bootstrap-icons";

import { Player, Controls } from "@lottiefiles/react-lottie-player";
import loadingAni from "../assets/animation/loading.json";

import { LoadingContext } from "../context/Loading";
import { UserContext } from "../context/User";

import {
  Container,
  Row,
  Col,
  Card,
  Dropdown,
  DropdownDivider,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const { topic } = useParams();
  const [articles, SetArticles] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const { user } = useContext(UserContext);

  const [_, setTrigger] = useState(false);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");

  useEffect(() => {
    setIsLoading(true);
    getAllArticles(topic, pageNum, sortByQuery, orderQuery)
      .then((articles) => {
        SetArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
      });
  }, [topic, sortByQuery, orderQuery, pageNum]);

  const changePage = (Num) => {
    setPageNum(Num);
  };

  const OnSortByClick = () => {
    setTrigger((prev) => !prev);
  };

  return (
    <>
      {error ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}>
          <img
            src={topicErrorImg}
            style={{
              height: "500px",
              width: "500px",
            }}
          />
        </div>
      ) : (
        <section className="home">
          <Container>
            <Row className="d-flex flex-wrap">
              <Col xs={8}>
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="w-100 sort-button">
                    {topic
                      ? topic.charAt(0).toUpperCase() + topic.slice(1)
                      : "Choose Topic"}
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
                    <DropdownDivider />
                    <Dropdown.Item as={Link} to="/home">
                      All Topics
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>{" "}
              <Col xs={4}>
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="w-100 sort-button">
                    {sortByQuery
                      ? sortByQuery.charAt(0).toUpperCase() +
                        sortByQuery.slice(1) +
                        " " +
                        (orderQuery ? orderQuery : "")
                      : "Sort By"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      as={Link}
                      to={`/home${topic ? `/${topic}` : ""}?sort_by=created_at`}
                      onClick={OnSortByClick}>
                      Date
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to={`/home${topic ? `/${topic}` : ""}?sort_by=title`}
                      onClick={OnSortByClick}>
                      Title
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to={`/home${topic ? `/${topic}` : ""}?sort_by=votes`}
                      onClick={OnSortByClick}>
                      Votes
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to={`/home${topic ? `/${topic}` : ""}?sort_by=author`}
                      onClick={OnSortByClick}>
                      Author
                    </Dropdown.Item>
                    <DropdownDivider />
                    <Dropdown.Item
                      as={Link}
                      to={`/home${
                        topic ? `/${topic}` : ""
                      }?sort_by=${sortByQuery}&order=asc`}
                      onClick={OnSortByClick}>
                      Ascending
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to={`/home${
                        topic ? `/${topic}` : ""
                      }?sort_by=${sortByQuery}&order=desc`}
                      onClick={OnSortByClick}>
                      Descending
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row>
              {isLoading ? (
                <>
                  <Player
                    autoplay
                    loop
                    src={loadingAni}
                    style={{ height: "500px", width: "500px" }}>
                    <Controls
                      visible={false}
                      buttons={["play", "repeat", "frame", "debug"]}
                    />
                  </Player>
                </>
              ) : (
                articles.map((article, index) => {
                  return (
                    <Col
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      key={index}
                      className="mb-4">
                      <Card
                        as={Link}
                        to={`/home/${article.topic}/${article.article_id}`}
                        style={{ width: "100%", height: "100%" }}
                        key={article.title}
                        className="custom-card">
                        <Card.Img
                          alt={article.article_id + "article image"}
                          variant="top"
                          src={article.article_img_url}
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                          }}
                        />
                        <Card.Body className="d-flex flex-column">
                          <Row className="d-flex justify-content-between align-items-center">
                            <Col>
                              <Card.Text>p/{article.topic}</Card.Text>
                            </Col>
                            <Col sm={6}></Col> {}
                            <Col className="d-flex justify-content-end align-items-center position-relative">
                              <img
                                src={upVoteImg}
                                alt="Upvote"
                                className="me-2"
                                style={{ width: "50px", height: "50px" }}
                              />
                              <span className="vote-badge">
                                Votes {article.votes}
                              </span>
                            </Col>
                          </Row>
                          <br></br>
                          <Row>
                            <Card.Title>{article.title}</Card.Title>
                          </Row>
                          <br></br>
                          <Row className="d-flex justify-content-between flex-row mt-auto">
                            <Col className="col-4 d-flex justify-content-center">
                              <button
                                as={Link}
                                to={`/home/${article.topic}/${article.article_id}`}
                                className="custom-button">
                                <Share
                                  size={25}
                                  className="card-button"
                                  alt="share button"
                                />
                              </button>
                            </Col>
                            <Col className="col-4 d-flex justify-content-center">
                              {" "}
                              <div className="position-relative">
                                <button
                                  className="custom-button"
                                  as={Link}
                                  to={`/home/${article.topic}/${article.article_id}`}>
                                  <ChatDots size={25} className="card-button" />
                                  {article.comment_count > 0 && (
                                    <span className="comment-badge">
                                      {article.comment_count}
                                    </span>
                                  )}
                                </button>
                              </div>
                            </Col>
                            <Col className="col-4 d-flex justify-content-center">
                              <button
                                className="custom-button"
                                as={Link}
                                to={`/home/${article.topic}/${article.article_id}`}>
                                <ArrowRightCircle
                                  size={25}
                                  className="card-button"
                                  alt="To article button"
                                />
                              </button>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })
              )}
            </Row>
            <Row>
              <div className="center-pagination">
                <Pagination size="lg">
                  <Pagination.Item
                    className="pages-buttons"
                    key="1"
                    active={pageNum === 1}
                    onClick={() => changePage(1)}>
                    1
                  </Pagination.Item>
                  <Pagination.Item
                    key="2"
                    active={pageNum === 2}
                    onClick={() => changePage(2)}>
                    2
                  </Pagination.Item>
                  <Pagination.Item
                    key="3"
                    active={pageNum === 3}
                    onClick={() => changePage(3)}>
                    3
                  </Pagination.Item>
                </Pagination>
              </div>
            </Row>
          </Container>
        </section>
      )}
    </>
  );
};

export default Home;
