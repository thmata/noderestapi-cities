import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Pessoas - GetById", () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const res2 = await testServer.post("/cidades").send({
      name: "Pernambuco",
    });

    cidadeId = res2.body;
  });

  it("Buscar Registro por ID", async () => {
    const resPessoa = await testServer.post("/pessoas").send({
      name: "Thiago",
      sobrenome: "Mata",
      email: "taiagomata@gmail.com",
      cidadeId,
    });

    expect(resPessoa.statusCode).toEqual(StatusCodes.CREATED);

    const resBusca = await testServer.get(`/pessoas/${resPessoa.body}`);

    expect(resBusca.statusCode).toEqual(StatusCodes.OK);
    expect(resBusca.body).toHaveProperty("email");
  });

  it("Tentar Buscar Registro que não existe", async () => {
    const res1 = await testServer.get("/pessoas/9999").send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty("errors.default.params");
  });
});
