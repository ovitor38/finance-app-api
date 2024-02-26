import "dotenv/config.js";
import { PostgresHelper } from "./src/db/postgres/helper.js";
import express from "express";

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
    const results = await PostgresHelper.query("SELECT * FROM users;");
    res.send(JSON.stringify(results));
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
});
