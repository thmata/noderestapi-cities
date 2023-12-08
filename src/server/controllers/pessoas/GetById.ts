import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { GetById } from "../../providers/pessoas/GetById";

export const getByIdValidation = validation({
  params: yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  }),
});

export const getById = async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: {
          params: "O parâmetro 'Id' precisa ser informado.",
        },
      },
    });
  }

  const result = await GetById(Number(req.params.id));

  if (!(result instanceof Error)) {
    console.log("result", result);
    return res.status(StatusCodes.OK).json({
      id: result.id,
      name: result.name,
    });
  } else {
    console.log("Erro GetByID/Controller/Pessoas");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: {
          params: "Registro Não Encontrado.",
        },
      },
    });
  }
};
