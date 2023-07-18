import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { CidadeProviders } from "../../providers/cidades";

export const createValidation = validation({
  body: yup.object().shape({
    name: yup.string().required().min(3),
  }),
});

export const create = async (req: Request, res: Response) => {

  const result = await CidadeProviders.create(req.body)

  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:{
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
