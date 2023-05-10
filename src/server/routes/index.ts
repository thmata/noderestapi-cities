import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (_req, res) => {
  return res.status(StatusCodes.ACCEPTED).send("Funciona");
});

export { router };
