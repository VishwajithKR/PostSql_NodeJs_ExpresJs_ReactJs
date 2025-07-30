import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserState } from "../redux/slice/authSlice";
import { useReusableMutation } from "../customHooks/useDataQuery";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

 const { mutate: login, isPending, isError, error } = useReusableMutation({
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
});

  useEffect(() => {
    if (isError) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

 const handleSubmit = (e) => {
  e.preventDefault();
  login({
    endPoint: "login",
    payload: { email, password },
  });
};


  return (
    <div className="flex min-h-screen mx-auto justify-center items-center bg-gray-50 py-12 px-4">
      <div className="login-form max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-800">Log in to your account</h2>
          <p className="mt-1 text-center text-gray-500">
            Not Registered?{" "}
            <Link to={"/register"}>
              <button className="text-green-500 hover:underline">Sign up</button>
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white py-8 px-6 shadow rounded-lg mb-0 space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <div className="mt-1">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                className="appearance-none px-3 py-2 w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                className="appearance-none px-3 py-2 w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>

         {showError && <p className="text-red-500 text-sm">{ `${error?.response?.data?.error} !` || "Login failed"}</p>}
          <button
            type="submit"
            disabled={isPending}
            className="w-full px-4 py-2 text-center bg-green-500 rounded border border-transparent shadow-sm text-white font-medium hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-green-400"
          >
            {isPending ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
