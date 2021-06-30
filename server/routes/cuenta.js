const express = require('express');

const _ = require('underscore');
let app = express();

const Usuario = require('../models/usuario');
const Cuenta = require('../models/cuenta');



app.get('/cuentas' , (req, res)=>{
  Cuenta.find({}).exec( (err, cuentas) =>{
    if (err) {
      return res.status(400).json({
         ok:false,
         err:err
       });
     }
     res.json({
       ok: true,
       cuentas
     })
  })
})
// ============================
// regresa las cuentas de un usuario por su id
// ============================
app.get('/cuenta/:id', (req, res) => {
    // Categoria.findById(....);

    let id = req.params.id;
    //console.log(id);

   Cuenta.find({usuario:id })
   .populate({
        path: 'usuario', 
        match:{ci: "7669204"},
        select: 'nombre ci'
   })
   .exec( (err, cuentas) =>{
    if (err) {
      return res.status(400).json({
         ok:false,
         err:err
       });
     }
     res.json({
       ok: true,
       cuentas
     })
  })
    

});
app.get('/cuenta-por-ci', (req, res) => {
    // Categoria.findById(....);

    let id = req.query.id;
    let ci = req.query.ci;
    //console.log(id);

   Cuenta.find({usuario:id })
   .populate({
        path: 'usuario', 
        match:{ci: ci},
        select: 'nombre ci'
   })
   .exec( (err, cuentas) =>{
    if (err) {
      return res.status(400).json({
         ok:false,
         err:err
       });
     }
     res.json({ 
       ok: true,
       cuentas
     })
  })

});



// ============================
// Crear nueva categoria
// ============================
app.post('/cuenta', (req, res) => {
    // regresa la nueva categoria
    // req.usuario._id
     let body = req.body;
    let cuenta = new Cuenta({
        nro: body.nro,
        nombre: body.nombre,
        tipo: body.tipo,
        saldo: body.saldo,
        usuario: body.usuario
    });

    cuenta.save((err, cuentaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!cuentaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            cuenta: cuentaDB
        });
    });
});
//==================================
//Leer Saldo de una cuenta por su nro de cuenta
//=================================
app.get('/getsaldo/:nro', function (req, res) {
  
    let nro = req.params.nro;

    Cuenta.find({ nro: nro },'nro saldo').exec((err, cuentaDB) =>{
        if (err) {
          return res.status(400).json({
             ok:false,
             err:err
           });
         }
         res.json({
           ok: true,
           cuenta: cuentaDB
         })
      } )

  });



//==================================
//actualizar Saldo de una cuenta por su nro de cuenta
//=================================
app.put('/actualizarsaldo', function (req, res) {
  
    let nro = req.query.nro;
    let monto = req.query.monto;
    let saldocuenta;

    // let body = _.pick(req.body, ['nombre', 'ci', 'correo']);

    const mycuenta = Cuenta.find({ nro: nro },'nro saldo').exec((err, cuentaDB) =>{
        if (err) {
          return res.status(400).json({
             ok:false,
             err:err
           });
         }
         //console.log('saldo ', cuentaDB[0].saldo);
         saldocuenta = cuentaDB[0].saldo;
         res.json({
           ok: true,
           saldo: cuentaDB[0].saldo,
           msj:'mensaje'
         })
      } );

  });





module.exports = app;