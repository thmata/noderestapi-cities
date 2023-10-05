import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { DeleteById } from "../../providers/pessoas/DeleteById";

export const deleteByIdValidation = validation({
  params: yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  }),
});

export const deleteById = async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: {
        default: {
          params: "O parâmetro 'Id' precisa ser informado",
        },
      },
    });
  }

  const result = await DeleteById(Number(req.params.id));

  if (result) {
    return res
      .status(StatusCodes.NO_CONTENT)
      .json(`ID: ${req.params} FOI DELETADO`);
  } else {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      erros: {
        default: {
          params: "Registro não encontrado.",
        },
      },
    });
  }
};
