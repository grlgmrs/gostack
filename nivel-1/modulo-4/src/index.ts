import express from "express";

import { helloWorld } from "./routes";

const app = express();

app.get("/", helloWorld);

app.listen(3000, () => {
  console.log("Application started at http://localhost:3000");
});
