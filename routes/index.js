var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var userController = require('../controllers/user_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' , errors: []});
});

/* GET home page. */
router.get('/author', function(req, res) {
  res.render('author', { autor: 'Cristina Lopez' , errors: []});
});

// Autoload de comandos con :quizId
// Si el parametro quizId está en la ruta ejecuta el quizController.load
router.param('quizId',quizController.load);

// Definición de rutas de sesión
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);


router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/quizes/search', quizController.search);

router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);

router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)',  quizController.update);
router.delete('/quizes/:quizId(\\d+)',  quizController.destroy);

// Definición de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',    commentController.create);


module.exports = router;
