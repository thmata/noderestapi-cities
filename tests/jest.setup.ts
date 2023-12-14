import { server } from "../src/server/Server";

import supertest from "supertest";
import { Knex } from "../src/server/database/knex";

// PARA FUNCIONAR OS TESTES JUNTO COM KNEX
beforeAll(async () => {
  await Knex.migrate.latest();
});

afterAll(async () => {
  Knex.destroy;
});

export const testServer = supertest(server);
