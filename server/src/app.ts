import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

import { router as userRouter } from "./routes/users";
import { router as transactionRouter } from "./routes/transactions";
import { router as groupRouter } from "./routes/groups";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/transactions", transactionRouter);
app.use("/groups", groupRouter);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
);

app.listen(port, () => {
  return console.log(
    `Express is listening at http://localhost:${process.env.PORT}`
  );
});
