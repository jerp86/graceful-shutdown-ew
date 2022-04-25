import { createServer } from "node:http";

const PORT = 3000;

async function handler(request, response) {
  try {
  } catch (error) {}
}

const server = createServer(handler)
  .listen(PORT)
  .on("listening", () => console.log(`server runing at ${PORT}`));
