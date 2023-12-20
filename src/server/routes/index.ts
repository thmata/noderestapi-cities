import { Router } from "express";
import {
  CidadesController,
  PessoasController,
  UsuariosController,
} from "./../controllers";
import { ensureAuthenticated } from "../shared/middlewares";

const router = Router();

router.post(
  "/cidades",
  ensureAuthenticated,
  CidadesController.createValidation,
  CidadesController.create
);

router.get(
  "/cidades",
  ensureAuthenticated,
  CidadesController.getAllValidation,
  CidadesController.getAll
);

router.get(
  "/cidades/:id",
  ensureAuthenticated,
  CidadesController.getByIdValidation,
  CidadesController.getById
);

router.delete(
  "/cidades/:id",
  ensureAuthenticated,
  CidadesController.deleteByIdValidation,
  CidadesController.deleteById
);

router.put(
  "/cidades/:id",
  ensureAuthenticated,
  CidadesController.updateByIdValidation,
  CidadesController.updateById
);

router.post(
  "/pessoas",
  ensureAuthenticated,
  PessoasController.createValidation,
  PessoasController.create
);

router.get(
  "/pessoas",
  ensureAuthenticated,
  PessoasController.getAllValidation,
  PessoasController.getAll
);

router.get(
  "/pessoas/:id",
  ensureAuthenticated,
  PessoasController.getByIdValidation,
  PessoasController.getById
);

router.delete(
  "/pessoas/:id",
  ensureAuthenticated,
  PessoasController.deleteByIdValidation,
  PessoasController.deleteById
);

router.put(
  "/pessoas/:id",
  ensureAuthenticated,
  PessoasController.updateByIdValidation,
  PessoasController.updateById
);

router.post(
  "/entrar",
  UsuariosController.signInValidation,
  UsuariosController.SignIn
);

router.post(
  "/cadastrar",
  UsuariosController.signUpValidation,
  UsuariosController.SignUp
);

export { router };
