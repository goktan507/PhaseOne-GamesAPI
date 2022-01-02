const express = require('express')
const gamesRoutes = require("./routes/games.routes");
const app = express()
const port = 3000

app.use('/', gamesRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})