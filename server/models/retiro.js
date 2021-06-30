const mongoose = require('mongoose');


let Schema = mongoose.Schema;

let retiroSchema = new Schema({
    nro:{
        type: Number,
        required:[true, 'El nro es obligatorio'],
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    monto:{
        type: Number,
        required:[ true]
    },
    cuenta: {
        type: Schema.Types.ObjectId,
        ref: 'Cuenta',
        required: [true, 'el nro. de cuenta es obligatorio']
    }
});

retiroSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}

module.exports = mongoose.model('Retiro', retiroSchema);