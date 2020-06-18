const express     = require("express");
const serverless  = require("serverless-http");
const server      = express()

const router = express.Router()


//pegar o banco de dados
const db = require("./database/db") //não é necessário colocar a extensão .js

//configurar pasta publica
server.use(express.static("/public"))

//habilitart o uso do req.body
server.use(express.urlencoded({extended: true}))

//utilizando template engine
const nunjucks = require("nunjucks")
const { query } = require("express")
nunjucks.configure("src/views", {
    express: server,
    noCache: true 
})

//configurar caminhos
//página inicial
//req = requisição
//res = resposta
router.get("/", (req, res) => {
    return res.render("index.html")
})

router.get("/create-point", (req, res) => {

    console.log(req.query)

    return res.render("create-point.html")
})

router.post("/save-point", (req, res) => {

    // console.log(req.body)

    //INSERIR DADOS NA TABELA
    const queryInsert = `
        INSERT INTO places (name, image, address, address2, state, city, items) 
        VALUES (?, ?, ?, ?, ?, ?, ?);    `

    const values = [req.body.name, 
        req.body.image, 
        req.body.address, 
        req.body.address2, 
        req.body.descState, 
        req.body.descCity, 
        req.body.items]

    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Erro no cadastro!")
        }
    
        console.log("CADASTRADO COM SUCESSO!")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(queryInsert, values, afterInsertData)
})

router.get("/search", (req, res) => {
    //pegar os dados do banco de dados

    const cidade = req.query.search
    let querySelect = `SELECT * FROM places WHERE city LIKE "%${cidade}%"`

    db.all(querySelect, function(err, rows){
        if(err){
            console.log(err)
        }

        console.log(rows)
        console.log(querySelect)
        return res.render("search-results.html", { places: rows })
    })


    
    // return res.render("search-results.html")
})

router.get("/list-points", (req, res) => {
    //pegar os dados do banco de dados

    const idDelete = req.query.del
    let querySelect = `SELECT * FROM places ORDER BY name ASC`

    db.all(querySelect, function(err, rows){
        if(err){
            console.log(err)
        }

        console.log(rows)
        console.log(querySelect)
        return res.render("list-points.html", { places: rows })
    })


    
    // return res.render("search-results.html")
})


//ligar o servidor
//server.listen(8080)

//exportar app para netlify
app.use('/.netlify/functions/server', router)
module.exports.handler = serverless(server)