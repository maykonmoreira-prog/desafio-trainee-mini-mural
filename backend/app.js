const express = require("express"); //importando a biblioteca express
const app = express();
const bodyParser = require ("body-parser");
const Usuarios = require("./models/Usuarios"); //importando usuarios

//Configurar body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//definição do método POST
app.post("/cadastro", function(req,res){
    Usuarios.create({
        nome: req.body.nome,
        email: req.body.email
    }).then(function(){
        res.send("Usuário cadastrado com sucesso.");
    }).catch(function(erro){
        res.send("Erro ao cadastrar usuário. Erro: " + erro);
    })
});

app.listen(8081, function(){
    console.log("Servidor rodando...");
});
