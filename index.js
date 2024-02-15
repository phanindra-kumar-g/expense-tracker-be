const express = require("express");
const cors = require("cors");
const expenses = require("./expenses");
const reminders = require("./reminders");

const app = express();
app.use(cors());
app.use("/expenses", expenses);
app.use("/reminders", reminders)

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