const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');

 
const app = express();

app.get('/', function (req, res) {
    res.json('Hello World');
  })
   
  
  app.get('/usuarios', function (req, res) {
      
      Usuario.find({}, 'nombre ci correo').exec( (err, usuarios) =>{
        if (err) {
          return res.status(400).json({
             ok:false,
             err:err
           });
         }
         res.json({
           ok: true,
           usuarios
         })
      })
  });
  
  app.post('/usuarios', function (req, res) {
  
      let body = req.body;

      let usuario = new Usuario({
        nombre: body.nombre,
        ci: body.ci,
        correo: body.correo,
        contrasena: bcrypt.hashSync( body.contrasena, 10),
      });

      usuario.save( (err, usuarioDB) =>{
        if (err) {
         return res.status(400).json({
            ok:false,
            err:err
          });
        }

        res.json({
          ok:true,
          usuario:usuarioDB
        });
      })
     
    });
  
  app.put('/usuarios/:id', function (req, res) {
  
      let id = req.params.id;

      let body = _.pick(req.body, ['nombre', 'ci', 'correo']);

      Usuario.findByIdAndUpdate( id, body, { new: true}, (err, usuarioDB) =>{
        if (err) {
          return res.status(400).json({
             ok:false,
             err:err
           });
         }


        res.json({
            ok: true,
            usuario: usuarioDB
        });
      });

    });
  
  app.delete('/usuarios', function (req, res) {
      res.json('Delete Usuarios');
    });

module.exports = app;