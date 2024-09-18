import axios from "axios";

const ncNews = axios.create({
  baseURL: "https://backend-project-g86q.onrender.com/api",
});

export const getUser = (username) => {
  return ncNews.get(`/users/${username}`).then(({ data }) => {
    return data.user;
  });
};

export const getAllArticles = (topic, pageNum, sortByQuery, orderQuery) => {
  return ncNews
    .get("/articles", {
      params: {
        topic: topic,
        p: pageNum,
        sort_by: sortByQuery,
        order: orderQuery,
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

export const getArticleComments = (article_id) => {
  return ncNews.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const patchArticleVotes = (article_id, num) => {
  return ncNews.patch(`/articles/${article_id}`, {
    inc_votes: num,
  });
};

export const postComment = (article_id, comment, username) => {
  return ncNews
    .post(`/articles/${article_id}/comments`, {
      username: username,
      body: comment,
    })
    .then(({ data }) => {
      return data.comment;
    });
};

export const deleteComment = (comment_id) => {
  return ncNews.delete(`/comments/${comment_id}`);
};
