/* Acciones relacionadas con pregunta/respuesta */

var models = require('../models/models.js');


// Autoload :id. Se dispara automaticamente cuando viene un path con un id (recupera de base de datos el objeto)
// así me evito tener que hacer la misma llamada desde le show y desde el answer
exports.load = function(req, res, next, quizId) {
    models.Quiz.find({where: {id: Number(quizId)},include:[{model: models.Comment}]}).then(function(quiz) {
            if (quiz) {
                req.quiz = quiz;
                next();
            } else{next(new Error('No existe quizId=' + quizId))}
        }
    ).catch(function(error){next(error)});
};

// GET /quizes
exports.index = function(req, res) {
    models.Quiz.findAll().then(
        function(quizes) {
            res.render('quizes/index', {quizes: quizes, errors: []});
        }
    ).catch(function(error){next(error);})
};

// GET /quizes/:id
exports.show = function(req, res) {
        res.render('quizes/show', {quiz: req.quiz, errors: []});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
    var resultado = 'Incorrecto';
    if (req.query.respuesta.toLowerCase() === req.quiz.respuesta.toLowerCase()) {
        resultado = 'Correcto';
    }
    res.render(
        'quizes/answer',
        { quiz: req.quiz,
            respuesta: resultado,
            errors: []
        }
    )};

// GET /quizes/search
exports.search = function(req, res) {
    var cadenaABuscar = '%'+req.param("search").trim()+'%';
    cadenaABuscar = cadenaABuscar.replace(" ","%");
    models.Quiz.findAll({where: ["pregunta like ?", cadenaABuscar], order: ["pregunta"]}).then(
        function(quizes) {
            res.render('quizes/search', {quizes: quizes, errors: []});
        }
    ).catch(function(error){next(error);})
};


// GET /quizes/new
exports.new = function(req, res) {
    var quiz = models.Quiz.build( // crea objeto quiz
        {pregunta: "Pregunta", respuesta: "Respuesta", tema: "Tema"}
    );
    res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res) {

    var quiz = models.Quiz.build( req.body.quiz );

    quiz
        .validate()
        .then(
        function(err){
            if (err) {
                res.render('quizes/new', {quiz: quiz, errors: err.errors});
            } else {
                quiz // save: guarda en DB campos pregunta y respuesta de quiz
                    .save({fields: ["pregunta", "respuesta", "tema"]})
                    .then( function(){ res.redirect('/quizes')})
            }      // res.redirect: Redirección HTTP a lista de preguntas
        }
    );
};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
    var quiz = req.quiz; // autoload de instancia de quiz
    res.render('quizes/edit', {quiz: quiz, errors: []});
};


// PUT /quizes/:id
exports.update = function(req, res) {
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;
    req.quiz.tema = req.body.quiz.tema;

    req.quiz
        .validate()
        .then(
        function(err){
            if (err) {
                res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
            } else {
                req.quiz // save: guarda en DB campos pregunta y respuesta de quiz
                    .save({fields: ["pregunta", "respuesta", "tema"]})
                    .then( function(){ res.redirect('/quizes')})
            }      // res.redirect: Redirección HTTP a lista de preguntas
        }
    );
};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
    req.quiz.destroy().then(function() {
        res.redirect("/quizes");
    }).catch(function(error){next(error)})
};