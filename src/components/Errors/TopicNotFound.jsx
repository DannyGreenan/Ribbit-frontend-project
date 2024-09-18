import errorTopicImg from "../../assets/img/topic-error.png";

const TopicNotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <img
        src={errorTopicImg}
        style={{
          height: "500px",
          width: "500px",
        }}
      />
    </div>
  );
};

export default TopicNotFound;
