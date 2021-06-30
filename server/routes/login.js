const express = require('express');
const bcrypt = require('bcrypt');


const Usuario = require('../models/usuario');

 
const app = express();


app.post('/login', (req, res)=>{

    let body =  req.body;
    Usuario.findOne({ correo: body.correo}, (err, usuarioDB)=>{
        if (err) {
            return res.status(500).json({
               ok:false,
               err:err
             });
        }
        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message: '(Usuario) o contraseña incorrectos'
                }
              });
        }

        if( !bcrypt.compareSync( body.contrasena, usuarioDB.contrasena) ){
            return res.status(400).json({
                ok:false,
                err:{
                    message: 'Usuario o (contraseña) incorrectos'
                }
              });
        }
        res.json({
            ok: true,
            usuario: usuarioDB,
            token: '1234'
        })

    });
});






module.exports = app;