const db = require ("./db"); //importando as configurações do arquivo db.js

const Usuarios = db.sequelize.define("usuarios",{ //criação da tabela de usuários
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
});

Usuarios.sync({force: false}) //cria a tabela no banco de dados MySQL
    .then(() => {
        console.log("Tabela de usuários criada com sucesso no MySQL!");
    })
    .catch((erro) => {
        console.log("Erro ao criar a tabela: " + erro);
    });

//exportando 'Usuarios' para ser usado em qualquer lugar
module.exports = Usuarios;