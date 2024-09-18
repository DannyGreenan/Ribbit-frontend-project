import errorPageImg from "../../assets/img/error-page.png";

const PageNotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <img
        src={errorPageImg}
        style={{
          height: "500px",
          width: "500px",
        }}
      />
    </div>
  );
};

export default PageNotFound;
