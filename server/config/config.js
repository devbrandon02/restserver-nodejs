//=======================
// PUERTO
//=======================
process.env.PORT = process.env.PORT || 3000;

//=======================
// ENTORNO
//=======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=======================
// Vencimiento del token
//=======================
// 60 segundos
// 60 minutos
//24 Horas
//30 dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 *30;


//=======================
// Semilla del Token
//=======================

process.env.SEED = process.env || 'secret';



//=======================
// base de datos
//=======================

let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe'
 } else{

    urlDB = process.env.MONGO_URI;

}

process.env.URLDB = urlDB;


//=======================
// Google client ID
//=======================
process.env.CLIENT_ID = process.env.CLIENT_ID || '554626110573-1e0pmu8d4fsihquj6umv4o5fvin0etm2.apps.googleusercontent.com'

