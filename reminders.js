const express = require("express");
const fs = require("fs");
const { Reminder } = require("./types");
const filePath = "./data/phanindra.json";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    try {
        const fileData = fs.readFileSync(filePath, { encoding: 'utf-8' });
        let reminders = JSON.parse(fileData).reminders;
        res.send({
            data: reminders,
            code: 200,
            message: ""
        });
    } catch (err) {
        res.send({
            data: [],
            code: 500,
            message: JSON.stringify(err)
        })
    }
});

app.post("/add", (req, res) => {
    try {
        let newReminder = new Reminder(req.body);
        let fileData = fs.readFileSync(filePath, { encoding: 'utf-8' });
        let newFileData = JSON.parse(fileData);
        newFileData.reminders = [...newFileData.reminders, { ...newReminder }];
        fs.writeFileSync(filePath, JSON.stringify(newFileData));
        res.send({
            data: [],
            code: 200,
            message: "Successfully Updated!"
        });
    } catch (err) {
        console.log("Err: ", err);
        res.send({
            data: [],
            code: 500,
            message: JSON.stringify(err)
        });
    }
});

app.get("/:id", (req, res) => {
    try {
        let fileData = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
        let selReminder = fileData.reminders.filter(rem => rem.id === req.params.id);
        if (selExp) {
            res.send({
                data: { ...selReminder[0] },
                code: 200,
                message: ""
            });
        } else {
            res.send({
                data: {},
                code: 404,
                message: "Expense not found!"
            });
        }
    } catch (err) {
        res.send({
            data: [],
            code: 500,
            message: JSON.stringify(err)
        })
    }
});

app.delete("/:id", (req, res) => {
    try {
        let fileData = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
        let filteredReminderList = fileData.reminders.filter(rem => rem.id != req.params.id);
        let newFileData = JSON.parse(JSON.stringify(fileData));
        newFileData.reminders = [...filteredReminderList];
        fs.writeFileSync(filePath, JSON.stringify(newFileData));
        res.send({
            data: [],
            code: 200,
            message: "Successfully deleted!"
        });
    } catch (err) {
        console.log("Error occured: ", err)
        res.send({
            data: [],
            code: 500,
            message: JSON.stringify(err)
        })
    }
});

module.exports = app;