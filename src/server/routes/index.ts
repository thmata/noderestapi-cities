import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { CidadesController } from "./../controllers";

const router = Router();

router.post(
  "/cidades",
  CidadesController.createBodyValidator,
  CidadesController.create
);

export { router };
