import { useState } from "react";
import { useReusableMutation } from "../customHooks/useDataQuery";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ToDo = ({data}) => {
  const [formData, setFormData] = useState({
    userID: data?.id,
    title: "",
    description: "",
    checkData: 0,
  });
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const {mutate: CreateToDo} = useReusableMutation({
    onSuccess: (data) => {
      if (data) {
        navigate("/");
      }
    },
    onError: (err) => {
      console.error("Login error:", err);
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    CreateToDo({
      endPoint: "api/post",
      method: "post",
      payload: formData,
      token,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Demo Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            maxLength="50"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            maxLength="500"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ToDo;
