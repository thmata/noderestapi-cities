import express from "express";
import "dotenv/config";

// Router é como se fosse o plugin do fastFy, server para adicionar as rotas na aplicação.
import { router } from "./routes";

const server = express();

server.use(router);

export { server };
