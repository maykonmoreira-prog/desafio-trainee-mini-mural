const express = require("express"); //importando a biblioteca express
const app = express();

//rota principal do servidor
app.get("/", function(req, res){
    res.send("Bem vindo ao meu Site");
});

app.listen(8081, function(){
    console.log("Servidor rodando...");
});
