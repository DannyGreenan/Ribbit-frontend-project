import { useParams } from "react-router-dom";
import { Row, Col, Button, Alert } from "react-bootstrap";

import upLogo from "../assets/img/up.png";
import downLogo from "../assets/img/down.png";
import errorLogo from "../assets/img/error.png";
import successLogo from "../assets/img/success.png";

import {
  deleteComment,
  getArticleById,
  getArticleComments,
  patchArticleVotes,
  postComment,
} from "../api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ArticlePage = () => {
  const { article_id, topic } = useParams();

  const [article, SetArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoadingUp, setLoadingUp] = useState(false);
  const [isLoadingDown, setLoadingDown] = useState(false);
  const [isLoadingComment, setIsLoadingComment] = useState(false);
  const [votes, setVotes] = useState(0);
  const [commentInput, setCommentInput] = useState("");
  const [_, setTrigger] = useState(false);
  const [noCommentInput, setNoCommentInput] = useState(false);
  const [CommentPosted, setCommentPosted] = useState(false);

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
  }, [article_id, commentInput, _]);

  const handleArticleVote = (value) => {
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

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setIsLoadingComment(true);
    if (commentInput === "") {
      setNoCommentInput(true);
      setIsLoadingComment(false);
    } else {
      setNoCommentInput(false);
      postComment(article_id, commentInput, "tickle122").then((res) => {
        setCommentInput("");
        setIsLoadingComment(false);
        setCommentPosted(true);
      });
    }
    //hardCoded username is placeholder until login page implemented
  };

  const handleCommentVote = (comment_id, value) => {
    console.log(comment_id, value, "Comment Vote");
  };

  const onDeleteComment = (comment_id) => {
    deleteComment(comment_id).then(() => {
      setTrigger((prev) => !prev);
    });
  };

  const onInputClick = () => {
    setCommentPosted(false);
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
            <Button
              className="votes-button"
              disabled={isLoadingUp}
              onClick={
                !isLoadingUp
                  ? () => {
                      handleArticleVote("up");
                    }
                  : null
              }>
              {isLoadingUp ? (
                "Loading..."
              ) : (
                <img className="votes-img" src={upLogo}></img>
              )}
            </Button>
            <Button className="votes-button" disabled>
              {votes}
            </Button>
            <Button
              className="votes-button"
              disabled={isLoadingDown}
              onClick={
                !isLoadingDown
                  ? () => {
                      handleArticleVote();
                    }
                  : null
              }>
              {isLoadingDown ? (
                "Loading..."
              ) : (
                <img className="votes-img" src={downLogo}></img>
              )}
            </Button>
          </Col>
          <Col sm>
            <button>Comment</button>
          </Col>
          <Col sm>
            <button>Share</button>
          </Col>

          <Col sm={3}></Col>
        </Row>
        <br></br>
        <Row>
          <h2>Comment Pond</h2>
        </Row>
        <Row>
          <div>
            <form id="comment-form" onSubmit={(e) => handleCommentSubmit(e)}>
              <input
                type="text"
                placeholder="comment.."
                value={commentInput}
                onClick={onInputClick}
                onChange={(e) => setCommentInput(e.target.value)}></input>
              <Button type="submit">
                {isLoadingComment ? "Adding comment ..." : "Comment"}
              </Button>
              {noCommentInput ? (
                <img src={errorLogo} className="error-img"></img>
              ) : null}
              {CommentPosted ? (
                <img src={successLogo} className="error-img"></img>
              ) : null}
            </form>
          </div>
        </Row>

        {comments.length > 0 ? (
          <Row>
            <Col sm={3}></Col>
            <Col sm>
              {comments.map((comment, index) => {
                return (
                  <Alert key={index} variant="info" className="alert">
                    <Col sm={3}></Col>
                    <Col>
                      {" "}
                      <h5 className="author">
                        {comment.author} {comment.comment_id}
                      </h5>
                      <span className="date">
                        {new Date(comment.created_at).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </span>{" "}
                    </Col>
                    <Col sm={3}></Col>

                    <br></br>
                    <br></br>
                    {comment.body}
                    <Col sm={3}></Col>
                    <Col>
                      <Button
                        value={comment.comment_id}
                        className="votes-button"
                        onClick={(e) => {
                          handleCommentVote(e.currentTarget.value, 1);
                        }}>
                        {<img className="votes-img" src={upLogo}></img>}
                      </Button>
                      <Button className="votes-button" disabled>
                        {comment.votes}
                      </Button>
                      <Button
                        value={comment.comment_id}
                        className="votes-button"
                        onClick={(e) => {
                          handleCommentVote(e.currentTarget.value, -1);
                        }}>
                        {<img className="votes-img" src={downLogo}></img>}
                      </Button>
                      <Button
                        className="date"
                        value={comment.comment_id}
                        onClick={(e) => {
                          onDeleteComment(e.currentTarget.value);
                        }}>
                        Delete
                      </Button>
                    </Col>
                    <Col sm={3}></Col>
                  </Alert>
                );
              })}
            </Col>
            <Col sm={3}></Col>
          </Row>
        ) : (
          <Row>
            <p>No Comments</p>
          </Row>
        )}
      </section>{" "}
    </>
  );
};

export default ArticlePage;
