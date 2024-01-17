const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.send({
        data: "",
        message: "Get API is working!",
        code: 200
    })
});


app.listen(port, () => {
    console.log("App is running on port number: ", port);
})