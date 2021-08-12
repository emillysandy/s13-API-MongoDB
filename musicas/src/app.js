const express = require("express")
const app = express()
const mongoose = require("mongoose")

// string de conexao
mongoose.connect("mongodb://localhost:27017/reprograma-musics", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// Conexao com o mongo
let db = mongoose.connection

// Captura de erro ou sucesso na conexao
db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function () {
    console.log("conexão feita com sucesso.")
})

//rotas
const index = require("./routes/index")
const musics = require("./routes/musics")

app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

app.use("/", index)
app.use("/musics", musics)

module.exports = app