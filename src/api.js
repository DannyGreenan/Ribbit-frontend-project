import axios from "axios";

const ncNews = axios.create({
  baseURL: "https://backend-project-g86q.onrender.com/api",
});

export const getAllArticles = (topic, pageNum) => {
  return ncNews
    .get("/articles", {
      params: {
        topic: topic,
        p: pageNum,
      },
    })
    .then(({ data }) => {
      return data.articles;
    });
};

export const getArticleById = (article_id) => {
  return ncNews.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};
