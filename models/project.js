const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* declaramos el esquema o estructura*/
const projectSchema = new Schema(
    {
        /* declaramos la estructura de cada documento, clave, valor  */
        name: String,
        slogan: String,
        technologies: String,
        demo: String,
        repo: String,
        desc: String,
        image: String,
        createdAt: String,
    },
    { collection: 'project' }
);

/*("nombre de la coleccion", nombre del esquema)*/
const Project = mongoose.model('project', projectSchema);
module.exports = Project;