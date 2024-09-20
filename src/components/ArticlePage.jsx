import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Row, Col, Button, Alert, FloatingLabel, Form } from "react-bootstrap";

import { UserContext } from "../context/User";

//in vs code, setup with superbase/ npm run seed prod
//market project

import upLogo from "../assets/img/up.png";
import upLogoPressed from "../assets/img/up-pressed.png";
import downLogo from "../assets/img/down.png";
import downLogoPressed from "../assets/img/down-pressed.png";
import errorLogo from "../assets/img/error-comment.png";
import successLogo from "../assets/img/success.png";
import errorArticleImg from "../assets/img/article-error.png";

import {
  deleteArticle,
  deleteComment,
  getArticleById,
  getArticleComments,
  patchArticleVotes,
  patchCommentVotes,
  postComment,
} from "../api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash } from "react-bootstrap-icons";

const ArticlePage = () => {
  const { article_id, topic } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoadingUp, setLoadingUp] = useState(false);
  const [isLoadingDown, setLoadingDown] = useState(false);
  const [isLoadingComment, setIsLoadingComment] = useState(false);
  const [error, setError] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [_, setTrigger] = useState(false);
  const [noCommentInput, setNoCommentInput] = useState(false);
  const [CommentPosted, setCommentPosted] = useState(false);
  const { user } = useContext(UserContext);
  const [votedUp, setVotedUp] = useState(false);
  const [votedDown, setVotedDown] = useState(false);

  useEffect(() => {
    getArticleById(article_id)
      .then((article) => {
        setArticle(article);
      })
      .catch((err) => {
        setError(true);
      });
  }, [article_id, _]);

  useEffect(() => {
    getArticleComments(article_id).then((comments) => {
      setComments(comments);
    });
  }, [article_id, commentInput, _]);

  const handleArticleVote = (value) => {
    if (value === 1) {
      if (votedDown === true) {
        value += 1;
      }
      setLoadingUp(true);
      setVotedUp(true);
      setVotedDown(false);
    } else {
      if (votedUp === true) {
        value -= 1;
      }
      setLoadingDown(true);
      setVotedDown(true);
      setVotedUp(false);
    }

    patchArticleVotes(article_id, value).then((res) => {
      setLoadingUp(false);
      setLoadingDown(false);
      setTrigger((prev) => !prev);
    });
  };
  const handleCommentVote = (comment_id, value) => {
    patchCommentVotes(comment_id, value).then(() => {
      setTrigger((prev) => !prev);
    });
  };
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setIsLoadingComment(true);
    if (commentInput === "") {
      setNoCommentInput(true);
      setIsLoadingComment(false);
    } else {
      setNoCommentInput(false);
      postComment(article_id, commentInput, user.username).then((res) => {
        setCommentInput("");
        setIsLoadingComment(false);
        setCommentPosted(true);
      });
    }
  };

  const onDeleteComment = (comment_id) => {
    deleteComment(comment_id).then(() => {
      setTrigger((prev) => !prev);
    });
  };

  const onInputClick = () => {
    setCommentPosted(false);
  };

  const handleDelete = ({ article_id }) => {
    deleteArticle(article_id).then(() => {
      setTrigger((prev) => !prev);
    });
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
            src={errorArticleImg}
            style={{
              height: "500px",
              width: "500px",
            }}
          />
          <Button as={Link} to="/home">
            Back to Home
          </Button>
        </div>
      ) : (
        <section className="article-page">
          <Row>
            <Col xs={3}></Col>
            <Col>
              <Link to={`/home/${topic}`}>/{topic}</Link>
            </Col>
            <Col xs={4}></Col>
            <Col>
              {article.author === user.username ? (
                <Button onClick={() => handleDelete({ article_id })}>
                  delete my post
                </Button>
              ) : null}
            </Col>
            <Col xs={3}> </Col>
          </Row>
          <Row className="justify-content-md-center">
            <h2>{article.title}</h2>
          </Row>
          <Row className="justify-content-md-center">
            <img src={article.article_img_url}></img>
          </Row>
          <Row>
            <Col xs={2}></Col>
            <Col xs={2}>
              <Button
                className="votes-button"
                disabled={isLoadingUp || votedUp}
                onClick={
                  !isLoadingUp
                    ? () => {
                        handleArticleVote(1);
                      }
                    : null
                }>
                {isLoadingUp ? (
                  "Loading..."
                ) : (
                  <>
                    {votedUp ? (
                      <img className="votes-img" src={upLogoPressed}></img>
                    ) : (
                      <img className="votes-img" src={upLogo}></img>
                    )}
                  </>
                )}
              </Button>
              <Button className="votes-button" disabled>
                {article.votes}
              </Button>
              <Button
                className="votes-button"
                disabled={isLoadingDown || votedDown}
                onClick={
                  !isLoadingDown
                    ? () => {
                        handleArticleVote(-1);
                      }
                    : null
                }>
                {isLoadingDown ? (
                  "Loading..."
                ) : (
                  <>
                    {votedDown ? (
                      <img className="votes-img" src={downLogoPressed}></img>
                    ) : (
                      <img className="votes-img" src={downLogo}></img>
                    )}
                  </>
                )}
              </Button>
            </Col>
            <Col xs={6}>
              <p>{article.body}</p>
            </Col>
            <Col xs={2}></Col>
          </Row>
          <Row>
            <Col sm={3}></Col>
          </Row>
          <br></br>
          <Row>
            <Col sm={1}></Col>
            <Col sm={10}>
              <div className="comment-pool">
                <Row>
                  <h2>Comment Pond</h2>
                </Row>
                <Form
                  id="comment-Form"
                  onSubmit={(e) => handleCommentSubmit(e)}>
                  <Row>
                    <Col xs={3}></Col>
                    <Col xs={4}>
                      <FloatingLabel label="Comment" className="mb-3">
                        <Form.Control
                          as="textarea"
                          placeholder="Leave a comment here.."
                          value={commentInput}
                          onClick={onInputClick}
                          onChange={(e) => setCommentInput(e.target.value)}
                          style={{ height: "100px" }}
                        />
                      </FloatingLabel>
                    </Col>

                    <Col xs={2}>
                      <Button type="submit" className="comment-button">
                        {isLoadingComment
                          ? "Adding comment ..."
                          : "Post comment"}
                      </Button>
                    </Col>
                    <Col xs={3}></Col>
                  </Row>
                  {noCommentInput ? (
                    <img src={errorLogo} className="error-img"></img>
                  ) : null}
                  {CommentPosted ? (
                    <img src={successLogo} className="error-img"></img>
                  ) : null}
                </Form>
                {comments.length > 0 ? (
                  <Row>
                    <Col sm={3}></Col>
                    <Col sm>
                      {comments.map((comment, index) => {
                        return (
                          <Alert key={index} variant="info" className="alert">
                            <Row>
                              <Col sm={3}>
                                <h5 className="author">{comment.author}</h5>
                              </Col>
                              <Col sm={6}></Col>
                              <Col sm={3}>
                                <span className="date">
                                  {new Date(
                                    comment.created_at
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              </Col>
                            </Row>

                            <br></br>
                            <Row>
                              <Col>
                                <p>{comment.body}</p>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={3}></Col>
                              <Col sm={6}>
                                <Button
                                  value={comment.comment_id}
                                  className="votes-button"
                                  onClick={(e) => {
                                    handleCommentVote(e.currentTarget.value, 1);
                                  }}>
                                  {
                                    <img
                                      className="votes-img"
                                      src={upLogo}></img>
                                  }
                                </Button>
                                <Button className="votes-button" disabled>
                                  {comment.votes}
                                </Button>
                                <Button
                                  value={comment.comment_id}
                                  className="votes-button"
                                  onClick={(e) => {
                                    handleCommentVote(
                                      e.currentTarget.value,
                                      -1
                                    );
                                  }}>
                                  {
                                    <img
                                      className="votes-img"
                                      src={downLogo}></img>
                                  }
                                </Button>
                                {comment.author === user.username ? (
                                  <Button
                                    className="comment-delete
                          "
                                    value={comment.comment_id}
                                    onClick={(e) => {
                                      onDeleteComment(e.currentTarget.value);
                                    }}>
                                    <Trash size={25} />
                                  </Button>
                                ) : null}
                              </Col>
                              <Col sm={3}></Col>
                            </Row>
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
                )}{" "}
              </div>
            </Col>
            <Col sm={1}></Col>
          </Row>
        </section>
      )}
    </>
  );
};

export default ArticlePage;
