import { useAuth } from "../../contexts/AuthContext";

const Home = () => {
  const user = useAuth();

  console.log("🚀 ~ user:", user);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
