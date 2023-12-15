import { Router } from "express";
import {
  CidadesController,
  PessoasController,
  UsuariosController,
} from "./../controllers";

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
  "/pessoas",
  PessoasController.createValidation,
  PessoasController.create
);

router.get(
  "/pessoas",
  PessoasController.getAllValidation,
  PessoasController.getAll
);

router.get(
  "/pessoas/:id",
  PessoasController.getByIdValidation,
  PessoasController.getById
);

router.delete(
  "/pessoas/:id",
  PessoasController.deleteByIdValidation,
  PessoasController.deleteById
);

router.put(
  "/pessoas/:id",
  PessoasController.updateByIdValidation,
  PessoasController.updateById
);

router.post(
  "/entrar",
  UsuariosController.signInValidation,
  UsuariosController.SignIn
);

router.post(
  "/cadastro",
  UsuariosController.signUpValidation,
  UsuariosController.SignUp
);

export { router };
