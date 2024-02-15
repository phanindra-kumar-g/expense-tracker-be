const uuid = require("uuid"); 

const Expense = function (exp) {
    this.id = uuid.v4();
    this.type = exp.type;
    this.amount = exp.amount;
    this.title = exp.title;
    this.description = exp.description;
    this.date = exp.date;
    this.comments = exp.comments;
    this.paidFromOrTo = exp.paidFromOrTo;
    this.fromOrTo = exp.fromOrTo;
    this.category = exp.category;
}

const Reminder = function (rem) {
    this.id = uuid.v4();
    this.title = rem.title;
    this.time = rem.time;
    this.repeat = rem.repeat;
    this.identifier = rem.identifier;
    this.body = rem.body;
    this.data = rem.data;
}

module.exports = { Expense, Reminder };