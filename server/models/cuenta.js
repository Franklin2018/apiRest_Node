const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let tiposValidos = {
    values: ['CORRIENTE', 'AHORRO'],
    message: '{VALUE} no es un nombre de cuenta valido'
};


let Schema = mongoose.Schema;

let cuentaSchema = new Schema({
    nro:{
        type: String,
        required:[true, 'El nro es obligatorio'],
        unique: true,
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    tipo: {
        type:String,
        default: 'CORRIENTE',
        enum: tiposValidos
        
    },
    saldo:{
        type: Number,
        default: 100,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'el usuario es obligatorio']
    }

});
cuentaSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}


cuentaSchema.plugin( uniqueValidator, {
    message:  '{PATH} debe de ser unico'
});

module.exports = mongoose.model('Cuenta', cuentaSchema);