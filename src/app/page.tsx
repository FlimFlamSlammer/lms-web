import { getAuthenticatedUser } from "./actions/auth/get-authenticated-user";

const Home = async () => {
  const { data: user, error } = await getAuthenticatedUser();

  if (error) {
    throw new Error(error);
  }

  return <div className="text-white">{user?.name}</div>;
};

export default Home;
