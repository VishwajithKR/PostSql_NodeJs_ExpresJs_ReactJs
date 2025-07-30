import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { useDispatch } from "react-redux";
import { setUserState } from "../redux/slice/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    mobile: "",
    place: "",
    age: "",
    password: "",
  });

  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const registerUser = async ({ firstName, email, mobile, place, age, password }) => {
    const response = await axiosInstance.post("/register", {
      name: firstName,
      email,
      mobile,
      place,
      age,
      password,
    });
    return response.data;
  };

  const {
    mutate: register,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: registerUser,
    onSuccess: ({ token, user: { name: fullName, email } }) => {
      dispatch(setUserState({ fullName, email,token }));
      navigate("/");
    },
    onError: (err) => {
      console.error("Register error:", err);
    },
  });

  useEffect(() => {
    if (isError) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <div className="flex min-h-screen mx-auto justify-center items-center bg-gray-50 py-12 px-4">
      <div className="registration-form max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-800">Create your account</h2>
          <p className="mt-1 text-center text-gray-500">
            Already Registered?{" "}
            <Link to={"/login"}>
              <button className="text-green-500 hover:underline">Sign in</button>
            </Link>
          </p>
        </div>

        <form
          className="bg-white py-8 px-6 shadow rounded-lg mb-0 space-y-5"
          onSubmit={handleSubmit}
        >
          {showError && (
            <p className="text-red-500 text-sm">
              {`${error?.response?.data?.error} !` || "Registration failed"}
            </p>
          )}

          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              autoComplete="off"
              
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Place */}
          <div>
            <label htmlFor="place" className="block text-sm font-medium text-gray-700">
              Place
            </label>
            <input
              type="text"
              name="place"
              id="place"
              value={formData.place}
              onChange={handleChange}
              autoComplete="off"
              
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              value={formData.age}
              onChange={handleChange}
              autoComplete="off"
              
              min={1}
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Mobile */}
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
              Mobile No.
            </label>
            <input
              type="tel"
              name="mobile"
              id="mobile"
              pattern="^\d{10}$"
              value={formData.mobile}
              onChange={handleChange}
              autoComplete="off"
              
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
              
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
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
