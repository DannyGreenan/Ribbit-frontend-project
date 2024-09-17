import { useParams } from "react-router-dom";
import { Accordion, Row, Col } from "react-bootstrap";

import { getArticleById, getArticleComments } from "../api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ArticlePage = () => {
  const { article_id, topic } = useParams();

  const [article, SetArticle] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      SetArticle(article);
    });
  }, [article_id]);

  useEffect(() => {
    getArticleComments(article_id).then((comments) => {
      setComments(comments);
    });
  }, [article_id]);

  console.log(comments[0]);

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
          <Col sm>
            <button>UpCroak</button>
          </Col>
          <Col sm>
            <p>{article.votes}</p>
          </Col>
          <Col sm>
            <button>DownCroak</button>
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
                <Accordion.Item eventKey={index} alwaysOpen>
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
