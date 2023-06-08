import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

export const updateByIdValidation = validation({
  body: yup.object().shape({
    name: yup.string().required().min(3),
  }),
  params: yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  }),
});

export const updateById = async (req: Request, res: Response) => {
  if (Number(req.params) === 9999) {
    return res.status(StatusCodes.NO_CONTENT).json({
      errors: {
        default: {
          params: "Registro Não Encontrado.",
        },
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send("Não Implementado");
};
