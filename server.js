require('dotenv').config();
const express = require("express");
const app = express();
const PORT = 1234;

app.use(express.json());

app.get("/", (_, res) => {
    res.sendFile('views/index.html', {root: __dirname })
})

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is listening at port ${PORT}`);
})