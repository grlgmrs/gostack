import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const message = "Hello World from separated routes file!";

  return res.send(message);
});

export default router;
