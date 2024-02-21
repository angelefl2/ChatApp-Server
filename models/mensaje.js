const { Schema, model } = require('mongoose')

const MensajeSchema = Schema({
    de: {
        type: Schema.Types.ObjectId, // el id de la coleccion de usuarios
        ref: 'Usuario',
        required: true
    },
    para: {
        type: Schema.Types.ObjectId, // el id de la coleccion de usuarios
        ref: 'Usuario', // Referencia al esquema 
        required: true
    },
    mensaje: {
        type: String, // el id de la coleccion de usuarios
        required: true
    },


}, { timestamps: true }); // Para coger la fecha y hora de moongoose

// Sobrescritura del metodo toJson para que cuando se serialee un Usuario se mande todo  menos __v y password. _id, se modifica por uid
MensajeSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    return object;
})


module.exports = model('Mensaje', MensajeSchema);
