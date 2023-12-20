import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - GetAll - Retornar todas as Cidades.", () => {
  let accessToken = "";

  beforeAll(async () => {
    const email = "create-cidades@gmail.com";
    await testServer.post("/cadastrar").send({
      email,
      password: "123456",
      username: "TesteTest",
      name: "Teste",
      lastname: "Oliveira",
    });
    const signInRes = await testServer
      .post("/entrar")
      .send({ email, password: "123456" });

    accessToken = signInRes.body.accessToken;
  });

  it("Pegar Registros", async () => {
    const res1 = await testServer.post("/cidades").send({
      name: "Pernambuco",
    });

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);

    const ResGetAll = await testServer.get("/cidades").send();

    expect(ResGetAll.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
  });

  it("Pegar Registros", async () => {
    const res1 = await testServer
      .post("/cidades")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Pernambuco",
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const ResGetAll = await testServer
      .get("/cidades")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(ResGetAll.header["x-total-count"])).toBeGreaterThan(0);
    expect(ResGetAll.statusCode).toEqual(StatusCodes.OK);
    expect(ResGetAll.body.length).toBeGreaterThan(0);
  });
});
