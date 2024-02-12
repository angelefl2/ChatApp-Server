const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            //useNewUrlParser : true,
            //useUnifiedTopology : true, 
            //useCreateIndex : true
        })
        console.log('Database Online')


    } catch (error) {
        throw new Error('Error al conectar con la base de datos.');
    }
}

module.exports = { dbConnection };