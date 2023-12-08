import { Router } from "express";
import { CidadesController, PessoasController } from "./../controllers";

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

router.post(
  "/cidades",
  PessoasController.createValidation,
  PessoasController.create
);

router.get(
  "/cidades",
  PessoasController.getAllValidation,
  PessoasController.getAll
);

router.get(
  "/cidades/:id",
  PessoasController.getByIdValidation,
  PessoasController.getById
);

router.delete(
  "/cidades/:id",
  PessoasController.deleteByIdValidation,
  PessoasController.deleteById
);

router.put(
  "/cidades/:id",
  PessoasController.updateByIdValidation,
  PessoasController.updateById
);

export { router };
