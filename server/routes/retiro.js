const express = require('express');

const _ = require('underscore');
let app = express();

const {crearRetiro} = require('../controller/retiroController');

const Cuenta = require('../models/cuenta');
const Retiro = require('../models/retiro');


//obtener retiros
app.get('/getretiro', (req,res) =>{

        Retiro.find({}).exec( (err, retirosDB)=>{
            if (err) {
                return res.status(400).json({
                   ok:false,
                   err:err
                 });
            }

            res.json({
                ok: true,
                retirosDB
            })

        });
});

//crear retiro
app.post('/crearretiro', crearRetiro)


module.exports = app;