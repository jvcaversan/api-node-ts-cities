import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - get By id", () => {
  it("Conseguir buscar uma cidade pelo id", async () => {
    const res1 = await testServer.post("/cidades").send({
      nome: "Caxias do Sul",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resSearch = await testServer.get(`/cidades/${res1.body}`).send();

    expect(resSearch.statusCode).toEqual(StatusCodes.OK);
    expect(resSearch.body).toHaveProperty("nome");
  });

  it("buscar um id que não existe", async () => {
    const res1 = await testServer.get("/cidades/99999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default");
  });
});
