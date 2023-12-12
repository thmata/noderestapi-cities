import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Pessoas - GetAll - Retornar todas as Pessoas.", () => {
  let cidadeId: number | undefined = undefined;

  beforeAll(async () => {
    const resCidade = await testServer.post("/cidades").send({
      nome: "Teste",
    });

    cidadeId = resCidade.body;
  });

  it("Buscar Registro", async () => {
    const res1 = await testServer.post("/pessoas").send({
      name: "Thiago",
      sobrenome: "Mata",
      email: "taiagomata@gmail.com",
      cidadeId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const ResGetAll = await testServer.get("/pessoas").send({});

    expect(ResGetAll.statusCode).toEqual(StatusCodes.OK);
    expect(Number(ResGetAll.header["x-total-count"])).toBeGreaterThan(0);
    expect(ResGetAll.body.length).toBeGreaterThan(0);
  });
});
