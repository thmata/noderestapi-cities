import { server } from "./server/Server";
const port = 3000;

server.listen(port, () => {
  console.log(`App Listening on port ${port}`);
});
