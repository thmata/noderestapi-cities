import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Pessoas - GetAll - Retornar todas as Pessoas.", () => {
  it("Apagar Registro", async () => {
    const res1 = await testServer.get("/cidades").send({});

    expect(res1.statusCode).toEqual(StatusCodes.OK);

    const ResGetAll = await testServer.get("/cidades").send();

    expect(Number(ResGetAll.header["x-total-count"])).toBeGreaterThan(0);
    expect(ResGetAll.statusCode).toEqual(StatusCodes.OK);
    expect(ResGetAll.body.length).toBeGreaterThan(0);
  });
});
