require('./config/config');

const express = require('express')
const app = express()
 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/', function (req, res) {
  res.json('Hello World');
})
 

app.get('/usuarios', function (req, res) {
    res.json('Get Usuarios');
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

 
  
app.listen(3000, () => {
    console.log('Escuchando puerto: ', 3000);
});

