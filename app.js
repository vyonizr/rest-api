require("dotenv").config()
const express = require("express")
const app = express()
const route = require("./routes")

const port = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", route)

app.listen(port, function() {
  console.log(`server starts on port ${port}`);
})
