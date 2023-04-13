const mongoose = require('mongoose');

const dbConnect = () => {
    const user = 'adalab';
    const pass = 'adalab*2023';
    const dbName = 'project';

    const uri = `mongodb+srv://${user}:${pass}@cluster0.3fxg1f3.mongodb.net/${dbName}?retryWrites=true&w=majority`;

    mongoose
        .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('conectado a mongodb'))
        .catch((e) => console.log('error de conexión', e));
};
module.exports = dbConnect;