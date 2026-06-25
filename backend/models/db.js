const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "usuarios",
    "root",
    "PwI5yUrx7vP6QPU58Rlqhslk7vdKPL",
    {
        host: "localhost",
        dialect: "mysql",
    }
);

sequelize.authenticate().then((function(){
    console.log("Banco de dados conectado com sucesso!");
})).catch(function(erro){
    console.log("Não foi possível se conectar ao banco de dados. \nErro: " + erro);
});

//Exportando o sequelize para ser usado nas tabelas
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}