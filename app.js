const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const usersRouter = require("./routes/usersRouter");
app.use("/usersRouter", usersRouter);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
