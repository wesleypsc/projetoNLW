//importar depend. sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar objeto de bd
const db = new sqlite3.Database("./src/database/database.db") 


//exportar o objeto db para ser utilizado em outros lugares
module.exports = db


//utilizar o objeto de bd para as operações
db.serialize(() => {
    
    //DROPAR TABELAS
    // db.run(`
    //     DROP TABLE IF EXISTS places;    
    // `) 

    //CRIAR TABELAS
    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT, 
            image TEXT, 
            address TEXT, 
            address2 TEXT, 
            state TEXT, 
            city TEXT, 
            items TEXT
        );    
    `) 



    //INSERIR DADOS NA TABELA ====== NÃO FUNCIONOU AO CRIAR FUNCTION PARA ENCURTAR O CÓDIGO (DESCOBRIR DEPOIS!!!!)
    const queryInsert = `
        INSERT INTO places (name, image, address, address2, state, city, items) 
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `

    // const values = ["Colectoria", 
    //"https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&auto=format&fit=crop&w=801&q=80", 
    //"Guilherme Gemballa", "Nº 260", "Santa Catarina", "Rio do Sul", "Resíduos Eletrônicos, Lâmpadas"]

    // const values = ["Papersider", "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80", "Guilherme Gemballa", "Nº 260", "Santa Catarina", "Rio do Sul", "Papéis e Papelão"]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
    
        console.log("CADASTRADO COM SUCESSO!")
        console.log(this)
        
    }

    // db.run(queryInsert, values, afterInsertData)


    //CONSULTAR DADOS NA TABELA
    let querySelect = `
        SELECT * FROM places
    `

    // db.all(querySelect, function(err, rows){
    //     if(err){
    //         return console.log(err+"-----"+querySelect)
    //     }

    //     console.log("SEUS REGISTROS: ")
    //     console.log(rows)
    // })



    //DELETAR UM DADO NA TABELA
    // const queryDelete = `
    //     DELETE FROM places
    // `
    // db.run(queryDelete, function(err){
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log("REGISTRO DELETADO COM SUCESSO!")
    // })

    
})