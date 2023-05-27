import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - get By id", () => {
  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resCidade = await testServer.post("/cidades").send({ nome: "Teste" });

    cidadeId = resCidade.body;
  });

  it("Conseguir buscar uma cidade pelo id", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nomeCompleto: "joao getbyid",
      email: "joaogetbyID@gmail.com",
      cidadeId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resSearch = await testServer.get(`/pessoas/${res1.body}`).send();

    expect(resSearch.statusCode).toEqual(StatusCodes.OK);
    expect(resSearch.body).toHaveProperty("nomeCompleto");
  });

  it("buscar um id que não existe", async () => {
    const res1 = await testServer.get("/pessoas/99999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
