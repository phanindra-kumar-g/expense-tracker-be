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
};

const Reminder = function (rem) {
  this.id = uuid.v4();
  this.title = rem.title;
  this.time = rem.time;
  this.identifier = rem.identifier;
  this.body = rem.body;
  this.data = rem.data;
};

const Groceries = function (gro) {
  this.id = uuid.v4();
  this.name = gro.name;
  this.storesList = gro.storesList.map((st) => ({
    storeId: uuid.v4(),
    name: st.name,
    price: st.price,
  }));
};

module.exports = { Expense, Reminder, Groceries };
