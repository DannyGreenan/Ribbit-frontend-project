import { useParams } from "react-router-dom";
import { Accordion, Row, Col, ButtonGroup, Button } from "react-bootstrap";

import { getArticleById, getArticleComments, patchArticleVotes } from "../api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ArticlePage = () => {
  const { article_id, topic } = useParams();

  const [article, SetArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoadingUp, setLoadingUp] = useState(false);
  const [isLoadingDown, setLoadingDown] = useState(false);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      SetArticle(article);
      setVotes(article.votes);
    });
  }, [article_id]);

  useEffect(() => {
    getArticleComments(article_id).then((comments) => {
      setComments(comments);
    });
  }, [article_id]);

  const handleCroak = (value) => {
    if (value === "up") {
      setLoadingUp(true);
      patchArticleVotes(article_id, 1).then((res) => {
        setVotes(votes + 1);
        setLoadingUp(false);
      });
    } else {
      setLoadingDown(true);
      patchArticleVotes(article_id, -1).then((res) => {
        setVotes(votes - 1);
        setLoadingDown(false);
      });
    }
  };

  return (
    <>
      <section className="article-page">
        <Row>
          <Col sm={1}></Col>
          <Col sm>
            <Link to={`/home/${topic}`}>/{topic}</Link>
          </Col>
          <Col sm></Col>
        </Row>
        <Row className="justify-content-md-center">
          <h2>{article.title}</h2>
        </Row>
        <Row className="justify-content-md-center">
          <img src={article.article_img_url}></img>
        </Row>
        <Row>
          <Col sm={3}></Col>
          <Col sm>
            {" "}
            <p>{article.body}</p>
          </Col>
          <Col sm={3}></Col>
        </Row>
        <Row>
          <Col sm={3}></Col>
          <Col>
            <ButtonGroup className="button-group">
              <Button
                disabled={isLoadingUp}
                onClick={
                  !isLoadingUp
                    ? () => {
                        handleCroak("up");
                      }
                    : null
                }>
                {isLoadingUp ? "Loading..." : "UpCroak"}
              </Button>
              <Button disabled>{votes}</Button>
              <Button
                disabled={isLoadingDown}
                onClick={
                  !isLoadingDown
                    ? () => {
                        handleCroak();
                      }
                    : null
                }>
                {isLoadingDown ? "Loading..." : "DownCroak"}
              </Button>
            </ButtonGroup>
          </Col>
          <Col sm>
            <button>Comment</button>
          </Col>
          <Col sm>
            <button>Share</button>
          </Col>

          <Col sm={3}></Col>
        </Row>
        <Row>
          <Accordion defaultActiveKey={["0"]} alwaysOpen="true">
            {comments.map((comment, index) => {
              return (
                <Accordion.Item eventKey={index} key={index}>
                  <Accordion.Header>{comment.author}</Accordion.Header>
                  <Accordion.Body>{comment.body}</Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </Row>
      </section>{" "}
    </>
  );
};

export default ArticlePage;
