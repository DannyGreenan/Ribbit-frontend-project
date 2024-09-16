import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllArticles } from "../api";
import Pagination from "react-bootstrap/Pagination";

import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Home = () => {
  const { topic } = useParams();
  const [articles, SetArticles] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    getAllArticles(topic, pageNum).then((articles) => {
      SetArticles(articles);
      setPageNum(1);
    });
  }, [topic]);

  useEffect(() => {
    getAllArticles(topic, pageNum).then((articles) => {
      SetArticles(articles);
    });
  }, [pageNum]);

  const changePage = (Num) => {
    setPageNum(Num);
  };

  return (
    <section>
      <Container>
        <Row>
          {articles
            ? articles.map((article, index) => {
                return (
                  <Col
                    xs={12}
                    sm={6}
                    md={3}
                    lg={3}
                    key={index}
                    className="mb-4">
                    <Card
                      style={{ width: "100%" }}
                      key={article.title}
                      className="custom-card">
                      <Card.Img variant="top" src={article.article_img_url} />
                      <Card.Body>
                        <Card.Title>{article.title}</Card.Title>
                        <Card.Text>{article.topic}</Card.Text>
                        <Button
                          variant="warning"
                          className="custom-button"
                          href={``}>
                          More Details
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            : null}
        </Row>
        <Row>
          <Pagination size="lg">
            <Pagination.Item
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
        </Row>
      </Container>
    </section>
  );
};

export default Home;
