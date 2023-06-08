import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - GetAll - Retornar todas as Cidades.", () => {
  it("Apagar Registro", async () => {
    const res1 = await testServer.post("/cidades").send({
      name: "Pernambuco",
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const ResGetAll = await testServer.get("/cidades").send();

    expect(Number(ResGetAll.header["x-total-count"])).toBeGreaterThan(0);
    expect(ResGetAll.statusCode).toEqual(StatusCodes.OK);
    expect(ResGetAll.body.length).toBeGreaterThan(0);
  });
});
