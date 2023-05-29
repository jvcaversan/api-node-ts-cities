import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
  CidadesController,
  PessoasController,
  UsuariosController,
} from "./../controllers";
import { getByIdValidation } from "../controllers/pessoas/GetById";
import { create } from "../controllers/pessoas/Create";
import { ensureAuthenticated } from "../shared/middlewares";

const router = Router();

router.get("/", (req, res) => {
  return res.send("ola dev");
});

//routes cidades
router.get(
  "/cidades",
  ensureAuthenticated,
  CidadesController.getAllValidation,
  CidadesController.getAll
);
router.get(
  "/cidades/:id",
  ensureAuthenticated,
  CidadesController.getByIdValidation,
  CidadesController.getById
);
router.post(
  "/cidades",
  ensureAuthenticated,
  CidadesController.createValidation,
  CidadesController.create
);
router.put(
  "/cidades/:id",
  ensureAuthenticated,
  CidadesController.updateByIdValidation,
  CidadesController.updateById
);
router.delete(
  "/cidades/:id",
  ensureAuthenticated,
  CidadesController.deleteByIdValidation,
  CidadesController.deleteById
);

//routes pessoas
router.get(
  "/pessoas",
  ensureAuthenticated,
  PessoasController.getAllValidation,
  PessoasController.getAll
);
router.get(
  "/pessoas/:id",
  ensureAuthenticated,
  PessoasController.getByIdValidation,
  PessoasController.getById
);
router.post(
  "/pessoas",
  ensureAuthenticated,
  PessoasController.createValidation,
  PessoasController.create
);
router.put(
  "/pessoas/:id",
  ensureAuthenticated,
  PessoasController.updateByIdValidation,
  PessoasController.updateById
);
router.delete(
  "/pessoas/:id",
  ensureAuthenticated,
  PessoasController.deleteByIdValidation,
  PessoasController.deleteById
);

// routes usuario

router.post(
  "/entrar",
  UsuariosController.signInValidation,
  UsuariosController.signIn
);

router.post(
  "/cadastrar",
  UsuariosController.signUpValidation,
  UsuariosController.signUp
);

export { router };
