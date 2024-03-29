import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { PessoasProviders } from "../../providers/pessoas";

export const getAllValidation = validation({
  query: yup.object().shape({
    name: yup.string().notRequired().default(""),
    sobrenome: yup.string().notRequired().default(""),
    page: yup.number().integer().notRequired().moreThan(0).default(1),
    limit: yup.number().integer().notRequired().moreThan(0).default(7),
  }),
});

export const getAll = async (req: Request, res: Response) => {
  const result = await PessoasProviders.getAll(
    Number(req.query.page || 1),
    Number(req.query.limit || 1),
    String(req.query.name || ""),
    String(req.query.lastname || "")
  );

  const count = await PessoasProviders.Count(
    String(req.query.name || ""),
    String(req.query.lastname || "")
  );

  if (result instanceof Error) {
    console.log("Erro no Result/Pessoas");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      erros: { default: result.message },
    });
  } else if (count instanceof Error) {
    console.log("Erro GetAll Pessoas/Count");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      erros: { default: count.message },
    });
  }

  console.log("Count", count);

  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", count);

  return res.status(StatusCodes.OK).send(result);
};
