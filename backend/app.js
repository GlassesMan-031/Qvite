const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static("public"));

const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

app.use(userRoutes);
app.use(accountRoutes);
app.use(budgetRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
