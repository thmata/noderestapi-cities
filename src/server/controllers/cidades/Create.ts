import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

const bodyValidation = yup.object().shape({
  name: yup.string().required().min(3),
  estado: yup.string().required().min(3),
});

export const createValidation = validation("body", bodyValidation);

export const create = async (req: Request, res: Response) => {
  console.log(req.body);

  return res.send("Chegou");
};
