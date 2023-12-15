import { validation } from "../../shared/middlewares";
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UsuariosProvider } from "../../providers/usuarios/index";
import * as yup from "yup";

export const signInValidation = validation({
  body: yup.object().shape({
    email: yup.string().required().min(6),
    password: yup.string().required().min(5),
    username: yup.string().required().min(4),
    name: yup.string().required().min(4),
    lastname: yup.string().required().min(4),
  }),
});

export const SignUp = async (req: Request, res: Response) => {
  const result = await UsuariosProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
