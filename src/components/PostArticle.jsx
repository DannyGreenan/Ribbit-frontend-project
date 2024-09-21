import { Col, Row, Button, Form, InputGroup } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../context/User";

import successPageImg from "../assets/img/success.png";
import { postArticle } from "../api";

const PostArticle = () => {
  const [validated, setValidated] = useState(false);
  const { user } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");
  const [img, setImg] = useState("");

  const [postedArticle, setPostedArticle] = useState(false);
  const [postedArticleInfo, setPostedArticleInfo] = useState({});

  const handleChange = (e, setStateFunc) => {
    setStateFunc(e.target.value);
  };

  useEffect(() => {
    setValidated(false);
  }, [title, body, topic, img]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() && title && body && topic && img) {
      const postObject = {
        author: user.username,
        title,
        body,
        topic,
        article_img_url: img,
      };
      console.log(postObject);
      postArticle(postObject).then((article) => {
        setPostedArticle(true);
        setPostedArticleInfo({
          article_id: article.article_id,
          topic: article.topic,
        });
      });
    } else {
      setValidated(true);
    }
  };

  return (
    <>
      {postedArticle ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}>
          <img
            src={successPageImg}
            style={{
              height: "500px",
              width: "500px",
            }}
          />
          <Button
            as={Link}
            to={`/home/${postedArticleInfo.topic}/${postedArticleInfo.article_id}`}>
            View Post
          </Button>
        </div>
      ) : (
        <section className="post-article-form">
          <Row>
            <Col xs={1}></Col>
            <Col xs={10}>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Post Title..."
                      onChange={(e) => handleChange(e, setTitle)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please choose a title.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    md="6"
                    controlId="validationCustomUsername">
                    <Form.Label>Username</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">
                        @
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder={user.username}
                        aria-describedby="inputGroupPrepend"
                        required
                        defaultValue={user.username}
                        readOnly
                      />
                      <Form.Control.Feedback type="invalid">
                        Please choose a username.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    className="position-relative mb-3"
                    controlId="validationCustom03">
                    <Form.Label>Article body</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Article body.. "
                      required
                      as="textarea"
                      aria-label="With textarea"
                      onChange={(e) => handleChange(e, setBody)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid body.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>{" "}
                <Row>
                  <Form.Group
                    as={Col}
                    className="position-relative mb-3"
                    controlId="validationCustom04">
                    <Form.Label>Topic</Form.Label>
                    <Form.Select
                      required
                      onChange={(e) => handleChange(e, setTopic)}>
                      <option value="">Select a topic...</option>
                      <option value="coding">Coding</option>
                      <option value="football">Football</option>
                      <option value="cooking">Cooking</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please pick a topic.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label>Article Image URL</Form.Label>
                  <Form.Control
                    required
                    type="url"
                    placeholder="Img url.."
                    onChange={(e) => handleChange(e, setImg)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please give a image url. You could use this
                    (https://tinyurl.com/RibbitRibbitFrog)
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="post-button">
                  Submit form
                </Button>
              </Form>
            </Col>
            <Col xs={1}></Col>
          </Row>
        </section>
      )}
    </>
  );
};

export default PostArticle;
