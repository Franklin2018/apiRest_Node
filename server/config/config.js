//configuracion del puerto

process.env.PORT = process.env.PORT || 3000;


// entorno, despues de configurar una variable de entorno en heroku
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// vencimiento del token
//60SEG
//60MIN
//24HORAS
//30DIAS
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


// SEED del token, tiene que ser una var de entorno de heroku
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';
//