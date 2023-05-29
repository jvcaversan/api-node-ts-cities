import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { IUsuario } from "../../database/models";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { JWTService, PasswordCrypto } from "../../shared/services";

interface IBodyProps extends Omit<IUsuario, "id" | "nome"> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().min(5).email(),
      senha: yup.string().required().min(6),
    })
  ),
}));

export const signIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const { email, senha } = req.body;

  const usuario = await UsuariosProvider.getByEmail(email);
  if (usuario instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou Senha inválido",
      },
    });
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(
    senha,
    usuario.senha
  );
  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha são inválidos",
      },
    });
  } else {
    const acessToken = JWTService.sign({ uid: usuario.id });

    if (acessToken === "JWT_SECRET_NOT_FOUND") {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: "Erro ao gerar token de acesso",
        },
      });
    }
    return res.status(StatusCodes.OK).json({ acessToken: acessToken });
  }
  // return res.status(StatusCodes.ACCEPTED).json(result);
};
