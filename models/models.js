var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null,
    {
        dialect: "sqlite", storage: "quiz.sqlite"
    }
);

// Importar definicion de la tabla Quiz
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

// exportar tabla
exports.Quiz = Quiz;


// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function () {
    //ejecuta el manejador una vez creada la tabla

    Quiz.count().success(function (count) {
        if (count === 0) {   // la tabla se inicializa solo si está vacía
            Quiz.bulkCreate(
                [{pregunta: '¿Cuál es la capital de Italia?', respuesta: 'Roma'},
                    {pregunta: '¿Cuál es la capital de Portugal?', respuesta: 'Lisboa'},
                    {pregunta: '¿Quién descubrió América?', respuesta: 'Cristóbal Colón'}
                ]
            ).then(function () {
                    console.log('Base de datos (tabla quiz) inicializada')
                });
        }
        ;
    });
});

