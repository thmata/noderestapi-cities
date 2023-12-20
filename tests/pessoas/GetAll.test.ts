import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Pessoas - GetAll - Retornar todas as Pessoas.", () => {
  let cidadeId: number | undefined = undefined;
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

  beforeAll(async () => {
    const resCidade = await testServer
      .post("/cidades")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nome: "Teste",
      });

    cidadeId = resCidade.body;
  });

  it("Buscar Registro", async () => {
    const res1 = await testServer
      .post("/pessoas")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: "Thiago",
        sobrenome: "Mata",
        email: "oliveira3@gmail.com",
        cidadeId,
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const ResGetAll = await testServer
      .get("/pessoas")
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({});

    expect(ResGetAll.statusCode).toEqual(StatusCodes.OK);
    expect(Number(ResGetAll.header["x-total-count"])).toBeGreaterThan(0);
    expect(ResGetAll.body.length).toBeGreaterThan(0);
  });
});
