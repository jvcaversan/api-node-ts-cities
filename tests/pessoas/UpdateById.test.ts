import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Update By Id", () => {
  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resCidade = await testServer.post("/cidades").send({ nome: "Teste" });

    cidadeId = resCidade.body;
  });

  it("Conseguir editar uma cidade pelo id", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nomeCompleto: "joao update",
      email: "joaoupdate@gmail.com",
      cidadeId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdate = await testServer.put(`/pessoas/${res1.body}`).send({
      nomeCompleto: "joao update",
      email: "joaoupdate2@gmail.com",
      cidadeId,
    });

    expect(resUpdate.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Tenta editar um id que não existe", async () => {
    const res1 = await testServer
      .put("/pessoas/99999")
      .send({ nome: "joao updatee" });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
