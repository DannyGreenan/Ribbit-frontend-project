import { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getAllArticles } from "../api";
import Pagination from "react-bootstrap/Pagination";
import topicErrorImg from "../assets/img/topic-error.png";

import { CaretUp, ChatDots, ArrowRightCircle } from "react-bootstrap-icons";

import { Player, Controls } from "@lottiefiles/react-lottie-player";
import loadingAni from "../assets/animation/loading.json";

import { LoadingContext } from "../context/Loading";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
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
        console.log(err);
        setError(true);
      });
  }, [topic, sortByQuery, orderQuery, pageNum]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   getAllArticles(topic, pageNum).then((articles) => {
  //     SetArticles(articles);
  //     setIsLoading(false);
  //   });
  // }, [pageNum]);

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
            <Row>
              <Col md={9}>
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
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
              <Col md={3}>
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
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
              ) : (
                articles.map((article, index) => {
                  return (
                    <Col
                      xs={12}
                      sm={6}
                      md={3}
                      lg={3}
                      key={index}
                      className="mb-4">
                      <Card
                        as={Link}
                        to={`/home/${article.topic}/${article.article_id}`}
                        style={{ width: "100%" }}
                        key={article.title}
                        className="custom-card">
                        <Card.Img variant="top" src={article.article_img_url} />
                        <Card.Body>
                          <Card.Text>p/{article.topic}</Card.Text>

                          <Card.Title>{article.title}</Card.Title>
                          <Row>
                            <Col md={4}>
                              <Button
                                as={Link}
                                to={`/home/${article.topic}/${article.article_id}`}
                                className="custom-button">
                                {article.votes}
                                <CaretUp size={25} className="card-button" />
                              </Button>
                            </Col>
                            <Col md={4}>
                              {" "}
                              <Button
                                className="custom-button"
                                as={Link}
                                to={`/home/${article.topic}/${article.article_id}`}>
                                <ChatDots size={25} className="card-button" />{" "}
                              </Button>
                            </Col>
                            <Col md={4}>
                              <Button
                                className="custom-button"
                                as={Link}
                                to={`/home/${article.topic}/${article.article_id}`}>
                                <ArrowRightCircle
                                  size={25}
                                  className="card-button"
                                />
                              </Button>
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
