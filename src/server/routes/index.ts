import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { CidadesController } from "./../controllers";

const router = Router();

router.post(
  "/cidades",
  CidadesController.createValidation,
  CidadesController.create
);

router.get(
  "/cidades",
  CidadesController.getAllValidation,
  CidadesController.getAll
);

router.get(
  "/cidades/:id",
  CidadesController.getByIdValidation,
  CidadesController.getById
);

router.delete(
  "/cidades/:id",
  CidadesController.deleteByIdValidation,
  CidadesController.deleteById
);

router.put(
  "/cidades/:id",
  CidadesController.updateByIdValidation,
  CidadesController.updateById
);

export { router };
