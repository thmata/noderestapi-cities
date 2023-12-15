import { validation } from "../../shared/middlewares";
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UsuariosProvider } from "../../providers/usuarios/index";
import * as yup from "yup";

export const signUpValidation = validation({
  body: yup.object().shape({
    email: yup.string().required().min(6),
    password: yup.string().required().min(5),
  }),
});

export const SignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await UsuariosProvider.GetByEmail(email);

  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha inválidos",
      },
    });
  }

  if (password !== result.password) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha inválidos",
      },
    });
  } else {
    return res.status(StatusCodes.OK).json({ acessToken: "teste.teste.test" });
  }

  return res.status(StatusCodes.OK).json(result);
};
