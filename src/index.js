//crear y configurar el servidor

//importamos todos los módulos que necesitamos
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');


//variable guardar la conexión 
let connection;

//crear la conexión
mysql
    .createConnection({
        host: 'sql.freedb.tech',
        database: 'freedb_projects-adalab',
        user: 'freedb_root-adalab',
        password: 'Kc8vbqDh74#*uBz',
    })
    .then(conn => {
        connection = conn;
        connection
            .connect()
            .then(() => {
                console.log(`Conexión establecida con la base de datos (identificador=${connection.threadId})`);
            })
            .catch((err) => {
                console.error('Error de conexion: ' + err.stack);
            });
    })
    .catch((err) => {
        console.error('Error de configuración: ' + err.stack);
    });

//Configurar el servidor
const app = express();
app.use(cors());
//para especificar el tamaño del servidor
app.use(express.json({ limit: "10mb" }));

//configurar el motor de plantillas
app.set("view engine", "ejs");

//arrancamos el servidor
const serverPort = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App listening on port ${serverPort}`);
});


//Enpoints 
// metodo: get, post, put, delete, patch
//server.metodo(ruta, (req, res)=>{}))
//req: información de la petición
//res: enviar una respuest

//Listar proyectos
app.get("/api/projects/all", (req, res) => {
    let sql = 'SELECT * FROM projects, autors WHERE projects.idautor_fk = autors.idautors;';
    connection
        .query(sql)
        .then(([results, fields]) => {
            console.log('Información recuperada:');
            results.forEach((result) => {
                console.log(result);
            });

            res.json(results);
        })
        .catch((err) => {
            throw err;
        });
});

//Insertar un proyecto Endpoint /projects/add
app.post("/api/projects/add", (req, res) => {
    //1. ¿de donde vienen y por donde viene los datos?
    const data = req.body;
    console.log(data);

    let createdAt = Date.now();

    //3. validar que todos los datos existen 

    // 2. Insertar en la bd
    //2.1  Consulta sql projectos y autoras

    //insertando la autora
    let sqlAutor = "INSERT INTO autors (autor, job, photo, createdAt) VALUES (?, ?, ?, ?) ";
    let valuesAutor = [data.autor, data.job, data.photo, createdAt];

    connection
        .query(sqlAutor, valuesAutor)
        .then(([results, fields]) => {
            console.log(results);
            let sqlProject = "INSERT INTO projects (name, slogan, technologies,demo, repo, `desc`, image, createdAT, idautor_fk ) VALUES (?, ?, ?, ?,?,?,?,?,?) ";
            let valuesProject = [
                data.name,
                data.slogan,
                data.technologies,
                data.demo,
                data.repo,
                data.desc,
                data.image,
                createdAt,
                results.insertId];

            connection
                .query(sqlProject, valuesProject)
                .then(([results, fields]) => {
                    let response = {
                        success: true,
                        cardURL: `http://localhost:4001/api/projects/${results.insertId}`
                    }
                    res.json(response);
                })
                .catch((err) => {
                    throw err;
                });
        }).catch((err) => {
            throw err;
        });
});


//Servidor de dinámicos
//detalle de una tarjeta
/**
 * 1. Instalr ejs
 * 2. Configurar el ejs: app.set("view engine", "ejs");
 * 3. Crear la carpeta de views y dentro la vista con un nombre desc
 * 4. Dentro del endpoint donde voy apintr la vista dinamica hago un res.render (nombre de la vista, datos que le voy pasar):    res.render("project_detail", results[0]);
 * 5. Crear el contenido de la vista: creo un html con el inspector y el OUTERHTML
 * 6. Creo un servidor de ficheros estaticos de css
 * 7. Creo un servidor de ficheros estaticos de imagenes
 * 8. Linkeo el css en la vista 
 * 9. Relleno los datos en HTML en la vista donde corresponde
 */


app.get("/api/projects/detail/:projectID", (req, res) => {
    const projectId = req.params.projectID;

    const sql = "SELECT * FROM projects, autors WHERE projects.idautor_fk=autors.idautors and idprojects = ?"

    connection
        .query(sql, [projectId])
        .then(([results, fields]) => {
            res.render("project_detail", results[0]);
        })
        .catch((err) => {
            throw err;
        });
});



//Servidor de estáticos
/*
1. Copiar el scrip de publish-react en el package.json
2. Ejecutar en la terminal del servidor: npm run publish-react
3. Comprobar creado correctamente la carpeta
4. Confu¡igurar en el servidor los ficheros estáticos
*/
app.use(express.static('./src/public-react'));

app.use(express.static('./src/public-css/'));


