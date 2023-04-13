const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* declaramos el esquema o estructura*/
const autorSchema = new Schema(
    {
        /* declaramos la estructura de cada documento, clave, valor  */
        autor: String,
        job: String,
        photo: String,
        createdAt: String,
    },
    { collection: 'autor' }
);

/*("nombre de la coleccion", nombre del esquema)*/
const Autor = mongoose.model('autor', autorSchema);
module.exports = Autor;