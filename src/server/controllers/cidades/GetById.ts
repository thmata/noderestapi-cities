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

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não Implementado");
};
