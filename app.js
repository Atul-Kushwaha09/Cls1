const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.send("Hello docker is running");
});

app.listen(3000, () => {
    console.log("app run on 3000....");
});