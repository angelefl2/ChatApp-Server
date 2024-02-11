const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        unique: true,
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    },

});

// Sobrescritura del metodo toJson para que cuando se serialee un Usuario se mande todo  menos __v y password. _id, se modifica por uid
UsuarioSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})


module.exports = model('Usuario', UsuarioSchema);
