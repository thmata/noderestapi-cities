import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

export const getByIdValidation = validation({
  params: yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  }),
});

export const getById = async (req: Request, res: Response) => {
  console.log(req.params);

  if (Number(req.params) === 9999) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: {
          params: "Registro Não Encontrado.",
        },
      },
    });
  }

  return res.status(StatusCodes.OK).json({
    id: req.params.id,
    name: "Pernambuco",
  });
};
