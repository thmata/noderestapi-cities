import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

const bodyValidation = yup.object().shape({
  name: yup.string().required().min(3),
  estado: yup.string().required().min(3),
});

export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try {
    // abortEarly como falso faz ele verificar todos os erros antes de disparar o erro, assim a gente consegue pegar todos os erros e não só o primeiro.
    await bodyValidation.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    const yupError = error as yup.ValidationError;
    const validationErros: Record<string, string> = {};

    // VALIDAÇÃO DE ERROS COMPLETOS.
    yupError.inner.forEach((error) => {
      if (!error.path) return;

      validationErros[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: validationErros,
      },
    });
  }
};

export const create = async (req: Request, res: Response) => {
  console.log(req.body);

  return res.send("Chegou");
};
