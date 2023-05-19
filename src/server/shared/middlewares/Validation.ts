import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from "yup";

type TValidation = (
  field: "body" | "header" | "params" | "query",
  schema: Schema<any>
) => RequestHandler;

export const validation: TValidation =
  (field, schema) => async (req, res, next) => {
    console.log("test");

    try {
      // abortEarly como falso faz ele verificar todos os erros antes de disparar o erro, assim a gente consegue pegar todos os erros e não só o primeiro.
      await schema.validate(req[field], { abortEarly: false });
      return next();
    } catch (error) {
      const yupError = error as ValidationError;
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
