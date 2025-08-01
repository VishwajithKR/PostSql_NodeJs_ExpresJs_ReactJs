import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserState } from "../redux/slice/authSlice";
import { useReusableMutation } from "../customHooks/useDataQuery";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", email: "", place: "", age: "", password: "",
  });

  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: register, isError, error,isPending } = useReusableMutation({
 onSuccess: (data) => {
      if(data){
        const token = data.token;
        const name =  data.user.name;
        const email = data.user.email;
        dispatch(setUserState({ fullName: name, email, token }));
        navigate("/");
      }
    },
    onError: (err) => {
      console.error("Login error:", err);
    },
  })

  useEffect(() => {
    if (isError) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ endPoint: "auth/register", payload:formData});
  };

  return (
    <div className="flex min-h-screen mx-auto justify-center items-center bg-gray-50 py-12 px-4">
      <div className="registration-form max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-800">Create your account</h2>
          <p className="mt-1 text-center text-gray-500">
            Already Registered?{" "}
            <Link to={"/login"}><button className="text-green-500 hover:underline">Sign in</button></Link>
          </p>
        </div>
        <form className="bg-white py-8 px-6 shadow rounded-lg mb-0 space-y-5" onSubmit={handleSubmit} >
          {showError && (
            <p className="text-red-500 text-sm">
              {`${error?.response?.data?.error} !` || "Registration failed"}
            </p>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} autoComplete="off"
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} autoComplete="off"
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Place</label>
            <input type="text" name="place" value={formData.place} onChange={handleChange} autoComplete="off"
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} autoComplete="off" min={1}
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="off"
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>
          <button type="submit" disabled={isPending}
            className="w-full px-4 py-2 text-center bg-green-500 rounded border border-transparent shadow-sm text-white font-medium hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-green-400"
          >
            {isPending ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
