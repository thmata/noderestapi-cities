import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const ensureAuthenticated: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Não autenticado",
      },
    });
  }

  console.log(authorization);

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Não autenticado",
      },
    });
  }

  if (token !== "teste.teste.test") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Não autenticado",
      },
    });
  }

  return next();
};
