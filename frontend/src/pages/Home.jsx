import { useEffect } from "react";
import { useReusableMutation } from "../customHooks/useDataQuery";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = ({ data }) => {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { mutate: todoData } = useReusableMutation({
    onSuccess: (data) => {
     
    },
    onError: (err) => {
      console.error("Login error:", err);
    },
  });
  useEffect(() => {
    todoData({
      endPoint: "api/find",
      method: "post",
      payload: { id: data?.id },
      token,
    });
  }, []);
  return <div>Home</div>;
};

export default Home;
