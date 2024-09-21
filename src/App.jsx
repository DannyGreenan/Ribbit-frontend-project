import { Routes, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ArticlePage from "./components/ArticlePage";
import PageNotFound from "./components/Errors/PageNotFound";
import Login from "./components/Login";
import PostArticle from "./components/PostArticle.jsx";
import Profile from "./context/Profile.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/home/:topic"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/home/:topic/:article_id"
          element={
            <>
              <Header />
              <ArticlePage />
            </>
          }
        />
        <Route
          path="/home/post"
          element={
            <>
              <Header />
              <PostArticle />
            </>
          }
        />
        <Route
          path="/home/profile/:username"
          element={
            <>
              <Header />
              <Profile />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Header />
              <PageNotFound />
            </>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
