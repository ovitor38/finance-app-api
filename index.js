import "dotenv/config.js";
import { PostgresHelper } from "./src/db/postgres/helper.js";
import express from "express";

const app = express();

app.get("/", async (req, res) => {
    const results = await PostgresHelper.query("SELECT * FROM users;");
    res.send(JSON.stringify(results));
});

app.listen(3000, () => {
    console.log("hello server running on port 3000");
});
