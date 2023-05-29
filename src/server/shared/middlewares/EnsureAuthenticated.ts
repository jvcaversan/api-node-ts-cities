import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: "Nao identificado" },
    });
  }
  console.log(authorization);

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: "Nao identificado" },
    });
  }

  if (token !== "teste.teste.teste") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: "Nao identificado" },
    });
  }

  return next();
};
