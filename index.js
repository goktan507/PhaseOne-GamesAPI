const express = require('express')
const gamesRoutes = require("./routes/games.routes");
const app = express();
const port = process.env.PORT || 3000;

app.use('/', gamesRoutes);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})