const express = require('express');
const app = express();
const port = 3000;

const mysql = require('mysql2');
const dbConnection = mysql.createConnection(
    {
        host: 'db',
        user: 'root',
        password: 'root',
        database: 'nodedb'
    }
);

dbConnection.connect((error) => {
    if(error) throw error;
    console.log('Connected.')
});


app.get("/", (req, res) => {

    const sql = `INSERT INTO nomes(nome) values('Camila'), ('Tiago'), ('Julia');`;
    dbConnection.query(sql, (error) => {
        if(error) throw error;
    });   

    const selectSql = 'SELECT nome FROM nodedb.nomes;';

    dbConnection.query(selectSql, (error, response) => {
        if(error) throw error;

        const names = response.map(r => `<li>${r.nome}</li>`).join('');

        res.send(`
            <h1> Full Cycle Rocks! </h1>
            <h2> Lista de nomes cadastrada no banco de dados. </h2>
            <ul>${names}</ul>
        `);
    })

});

app.listen(port, () => console.log(`Rodando na porta ${port}`));