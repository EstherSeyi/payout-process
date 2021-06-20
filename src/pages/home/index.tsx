import { Redirect } from "react-router";

const Home = () => <Redirect to={`/amount?page=${1}`} />;

export default Home;
