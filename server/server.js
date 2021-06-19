require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express()
 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/', function (req, res) {
  res.json('Hello World');
})
 

app.get('/usuarios', function (req, res) {
    res.json('Get Usuarios Local');
  });

app.post('/usuarios', function (req, res) {

    let body = req.body;
    if(body.nombre === undefined){
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    }else{
        res.json({
            persona: body
        });
    }

   
  });

app.put('/usuarios/:id', function (req, res) {

    let id = req.params.id;
    res.json({
        id
    });
  });

app.delete('/usuarios', function (req, res) {
    res.json('Delete Usuarios');
  });

 
  mongoose.connect('mongodb://localhost:27017/my_banco',  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }, (err, res) => {
    if (err) throw err;

    console.log('Base de datos ONLINE');
  });  
 
  
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});

