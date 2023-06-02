import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

export const createValidation = validation({
  body: yup.object().shape({
    name: yup.string().required().min(3),
  }),
});

export const create = async (req: Request, res: Response) => {
  return res.status(StatusCodes.CREATED).json("Não Implementado");
};
