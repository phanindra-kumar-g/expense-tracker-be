const express = require("express");
const fs = require("fs");
const { Groceries } = require("./types");
const uuid = require("uuid");

const filePath = "./data/phanindra.json";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  try {
    const fileData = fs.readFileSync(filePath, { encoding: "utf-8" });
    let grocerries = JSON.parse(fileData).grocerries;
    res.send({
      data: grocerries,
      code: 200,
      message: "",
    });
  } catch (err) {
    res.send({
      data: [],
      code: 500,
      message: JSON.stringify(err),
    });
  }
});

app.post("/add", (req, res) => {
  try {
    let newGro = req.body;
    console.log("new groc: ", newGro);
    let newGrocery = new Groceries(newGro);
    console.log("Grocery to be saved: ", newGrocery);
    let fileData = fs.readFileSync(filePath, { encoding: "utf-8" });
    let newFileData = JSON.parse(fileData);
    newFileData.grocerries = [...newFileData.grocerries, { ...newGrocery }];
    fs.writeFileSync(filePath, JSON.stringify(newFileData));
    res.send({
      data: [],
      code: 200,
      message: "Successfully added Grocery!",
    });
  } catch (err) {
    res.send({
      data: [],
      code: 500,
      message: JSON.stringify(err),
    });
  }
});

app.post("/update", (req, res) => {
  try {
    let newGrocery = new Groceries(req.body.grocery);
    newGrocery.id = req.body.grocery.id;
    let fileData = fs.readFileSync(filePath, { encoding: "utf-8" });
    let newFileData = JSON.parse(fileData);
    newFileData.grocerries = newFileData.grocerries.map((grc) => {
      if (grc.id === req.body.grocery.id) {
        return newGrocery;
      }
      return grc;
    });
    fs.writeFileSync(filePath, JSON.stringify(newFileData));
    res.send({
      data: [],
      code: 200,
      message: "Successfully updated Grocery!",
    });
  } catch (err) {
    res.send({
      data: [],
      code: 500,
      message: JSON.stringify(err),
    });
  }
});

app.delete("/:id", (req, res) => {
  try {
    let fileData = fs.readFileSync(filePath, { encoding: "utf-8" });
    let newFileData = JSON.parse(fileData);
    newFileData.grocerries = newFileData.grocerries.filter(
      (grc) => grc.id != req.params.id
    );
    fs.writeFileSync(filePath, JSON.stringify(newFileData));
    res.send({
      data: [],
      code: 200,
      message: "Successfully deleted Grocery!",
    });
  } catch (err) {
    res.send({
      data: [],
      code: 500,
      message: JSON.stringify(err),
    });
  }
});

app.post("/store/add", (req, res) => {
  try {
    let { groceryId, store } = req.body;
    let fileData = fs.readFileSync(filePath, { encoding: "utf-8" });
    let parseFileData = JSON.parse(fileData);
    let newFileData = parseFileData.grocerries.map((grc) => {
      if (grc.id === groceryId) {
        return {
          ...grc,
          storesList: [
            ...grc.storesList,
            { storeId: uuid.v4(), store: store.store, price: store.price },
          ],
        };
      }
      return grc;
    });
    fs.writeFileSync(filePath, JSON.stringify(newFileData));
    res.send({
      data: [],
      code: 200,
      message: "Successfully Updated!",
    });
  } catch (err) {
    res.send({
      data: [],
      code: 500,
      message: JSON.stringify(err),
    });
  }
});

app.post("/store/update", (req, res) => {
  try {
    let { groceryId, store } = req.body;
    let fileData = fs.readFileSync(filePath, { encoding: "utf-8" });
    let parseFileData = JSON.parse(fileData);
    let newFileData = parseFileData.grocerries.map((grc) => {
      if (grc.id === groceryId) {
        return {
          ...grc,
          storesList: [
            ...grc.storesList,
            { storeId: store.storeId, store: store.store, price: store.price },
          ],
        };
      }
      return grc;
    });
    fs.writeFileSync(filePath, JSON.stringify(newFileData));
    res.send({
      data: [],
      code: 200,
      message: "Successfully Updated!",
    });
  } catch (err) {
    res.send({
      data: [],
      code: 500,
      message: JSON.stringify(err),
    });
  }
});

app.delete("/store/delete", (req, res) => {
  try {
    let { groceryId, storeId } = req.body;
    console.log("ids: ", groceryId, storeId);
    let fileData = fs.readFileSync(filePath, { encoding: "utf-8" });
    let parseFileData = JSON.parse(fileData);
    newFileData = JSON.parse(fileData);
    newFileData.grocerries = parseFileData.grocerries.map((grc) => {
      if (grc.id === groceryId) {
        return {
          ...grc,
          storesList: grc.storesList.filter((st) => st.storeId !== storeId),
        };
      }
      return grc;
    });
    fs.writeFileSync(filePath, JSON.stringify(newFileData));
    res.send({
      data: [],
      code: 200,
      message: "Successfully Updated!",
    });
  } catch (err) {
    res.send({
      data: [],
      code: 500,
      message: JSON.stringify(err),
    });
  }
});

module.exports = app;
