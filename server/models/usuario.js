
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    ci: {
        type:String,
        required:[true, 'El c.i. es requerido']
    },
    correo: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    contrasena: {
        type: String,
        required: [ true, 'La contraseña es necesaria']
    }

});

usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject =  user.toObject();
    delete userObject.contrasena;

    return userObject;
}

usuarioSchema.plugin( uniqueValidator, {
    message:  '{PATH} debe de ser unico'
});

module.exports = mongoose.model('Usuario', usuarioSchema);
