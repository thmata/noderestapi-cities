import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

// DESCRIÇÃO DO TESTE
describe("Cidades - Create", () => {
  it("Cria registro", async () => {
    const res1 = await testServer.post("/cidades").send({
      nome: "Pernambuco",
    });

    expect(typeof res1.body).toEqual("number");
  });
});
