import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (req, res) => {
  return res.send("ola dev");
});

router.post("/teste", (req, res) => {
  return res.status(StatusCodes.ACCEPTED).json(req.body);
});

export { router };
