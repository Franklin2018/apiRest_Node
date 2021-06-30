const { response } = require('express');

const Cuenta = require('../models/cuenta');
const Retiro = require('../models/retiro');


const crearRetiro = async( req, res = response ) =>{
    const nrocuenta = req.body.nrocuenta;
    const monto = req.body.monto
      let nroretiro;

    const cuentaDB =  await Cuenta.findOne( {nro: nrocuenta})

    if(!cuentaDB){
        return res.status(400).json({
            ok: true,
            mjs: `la cuenta ${nrocuenta}, no existe`
        });
    }else{
        let saldo = cuentaDB.saldo;
       // console.log(saldo + '- actual');

        if(saldo >= monto && monto>0 ){
            let saldoupdate = saldo - monto;
            Cuenta.findByIdAndUpdate( cuentaDB._id, {saldo: saldoupdate}, (err) =>{
                if (err) {
                  return res.status(400).json({
                     ok:false,
                     err:err
                   });
                 }
              });

              const cuentaDB1 =  await Cuenta.findOne( {nro: nrocuenta});
              //console.log(cuentaDB1.saldo + '- despues del retiro');

            // return res.json({
            //     ok: true,
            //     msj: 'retiro realizado'
            // })
        }else{
            return res.json({
                ok: false,
                msj: 'saldo insuficiente en la cuenta o monto menor a 0 '
            })
        }
    }
    
      await Retiro.countDocuments({}, function (err, count) {
          if (err) {
            return res.json({
              ok: false,
              err
            });
          }
        nroretiro = count + 100000;
       // console.log(nroretiro);
      });

       //console.log(nroretiro);
     let data = {
         nro: nroretiro,
         monto: monto,
         cuenta: cuentaDB._id
     }

    const retiro = new Retiro(data);
    
    await retiro.save();

    res.status(201).json(retiro);
    console.log(retiro);

   
}


module.exports = {
    crearRetiro
}