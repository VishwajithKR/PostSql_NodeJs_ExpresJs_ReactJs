import express from "express";
import "dotenv/config";
import cors from "cors";
import crudRoute from "./routes/crud.route.js";
import authRoute from "./routes/auth.route.js";

// import cookieParser from "cookie-parser";

const app = express();

// app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/api",crudRoute);  
app.use("/auth",authRoute);

 
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 3000");
});
