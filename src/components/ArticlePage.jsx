import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";

import { getArticleById } from "../api";
import { useEffect, useState } from "react";

const ArticlePage = () => {
  const { article_id } = useParams();

  const [article, SetArticle] = useState({});

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      console.log(article);
      SetArticle(article);
    });
  }, [article_id]);

  return (
    <section className="article-page">
      <Card
        style={{ width: "100%" }}
        key={article.title}
        className="custom-card">
        <Card.Img variant="top" src={article.article_img_url} />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.body}</Card.Text>
        </Card.Body>
      </Card>
    </section>
  );
};

export default ArticlePage;
