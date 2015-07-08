
exports.question = function(req, res) {
    res.render('quizes/question', { pregunta : "Capital de Italia"});
};


exports.answer = function(req, res) {
    var resultado = 'Incorrecto';
    if (req.query.respuesta === "Roma") {
        resultado = 'Correcto';
    }
    res.render('quizes/answer', { respuesta: resultado }
    );
};

