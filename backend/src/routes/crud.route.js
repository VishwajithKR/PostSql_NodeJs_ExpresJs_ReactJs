import express from "express";
import { deleteMethod, findMethod, getMethod, postMethod, updateMethod } from "../controllers/crud.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();


router.use(protectRoute);

router.post("/post",postMethod);

router.post("/find",findMethod);

router.get("/getall",getMethod);

router.put("/update",updateMethod);

router.delete("/delete",deleteMethod);

export default router;
