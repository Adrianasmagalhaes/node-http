const mongoose = require('mongoose');
//Com a importação do módulo externo mongoose, podemos chamar a partir da variável mongoose ,
// o método connect() que recebe como parâmetro a string de conexão do banco, neste caso, o Mongo Atlas

// mongoose.connect('mongodb+srv://Adriana:dcfs01@cluster0.t10g6vn.mongodb.net/mongodb');
mongoose.connect('mongodb://localhost:27017/mongodb');
// A variável db recebe a conexão do banco e vamos exportá-la
let db = mongoose.connection

//Exporta a conexão com o mongo(Atlas ou local, dependendo da string de conexão)
module.exports = db