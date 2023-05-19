import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from "yup";

type TProperty = "body" | "header" | "params" | "query";

type TAllSchemas = Record<TProperty, Schema<any>>;

type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler;

export const validation: TValidation = (schemas) => async (req, res, next) => {
  const errorsResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      // abortEarly como falso faz ele verificar todos os erros antes de disparar o erro, assim a gente consegue pegar todos os erros e não só o primeiro.
      schema.validateSync(req[key as TProperty], { abortEarly: false });
      return next();
    } catch (error) {
      const yupError = error as ValidationError;
      const validationErros: Record<string, string> = {};

      // VALIDAÇÃO DE ERROS COMPLETOS.
      yupError.inner.forEach((error) => {
        if (!error.path) return;

        validationErros[error.path] = error.message;
      });

      errorsResult[key] = validationErros;
    }
  });

  if (Object.entries(errorsResult).length === 0) {
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: errorsResult,
      },
    });
  }
};
