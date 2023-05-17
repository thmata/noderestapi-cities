import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

const bodyValidation = yup.object().shape({
  name: yup.string().required().min(3),
  estado: yup.string().required().min(3),
});

export const create = async (req: Request, res: Response) => {
  let validatedData = undefined;

  try {
    validatedData = await bodyValidation.validate(req.body, {
      abortEarly: false,
    });
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

  console.log(validatedData, "Testando");

  return res.send("Chegou");
};
