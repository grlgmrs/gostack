import { Request, Response } from "express";

import createUser from "./services/CreateUser";

export function helloWorld(req: Request, res: Response) {
  const user = createUser({
    name: "Gabriel",
    email: "gabriel@example.com",
    password: "password",
    techs: [{ title: "NodeJS", experience: 2 }],
  });

  return res.send("Hello World from routes.ts");
}
