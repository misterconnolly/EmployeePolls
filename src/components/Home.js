import QuestionListContainer from "./QuestionListContainer";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <div>Username</div>
      <div>
        <h1>List of questions</h1>
        <QuestionListContainer />
      </div>
    </div>
  );
};

export default Home;
