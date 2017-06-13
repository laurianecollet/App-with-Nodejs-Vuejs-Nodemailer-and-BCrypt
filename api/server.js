/**
 * Initiation de Express
 */

let express = require('express')
let app = express()


/**
 * Modules de Securité d'une API (logs, XSS securité etc...)
 */
let cors = require('cors');
let bodyParser = require('body-parser');
let logger = require('morgan');
let helmet = require('helmet');
let passport = require('passport');
let nodemailer = require('nodemailer')
let bcrypt = require('bcrypt'); // module pour crypter le mot de passe
app.use(logger('dev'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({ secret: 'hK34B23B4HJ', resave: false, saveUninitialized: false }));
app.use(bodyParser.json());
app.use(cors());
logger('tiny')
app.use(helmet());

/**
 * Nodemailer configuration
 */
var transporter = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "2e45841cd95d56",
		pass: "0e5b9a76556c21"
	}
});

/**
 * Module RethinkDb
 */
let r = require('rethinkdb');

app.use(function (error, request, response, next) {
	response.status(error.status || 500);
	response.json({ error: error.message });
});

let connection = r.connect({
	db: "test" //your database
}).then((connection) => { // une fois qu'il a effectuer une connexion
	app.get('/', (req, res) => {
		r.table('FAQ').orderBy(r.asc('question')).run(connection, (err, cursor) => {
			cursor.toArray((err, result) => {
				return res.json(result)
			})
		})
	});

	app.get('/delete/:id', function (req, res) {
		let id = req.params.id
		r.table('FAQ').get(id).delete().run(connection, (err, cursor) => {
			r.table('FAQ').orderBy(r.asc('question')).run(connection, (err, cursor) => {
				cursor.toArray((err, result) => {
					return res.json(result)
				})
			})
		})
	});

	app.post('/new', (req, res) => {

		//req.body pour récupérer un parametre en post 
		//req.params => parametre en GET (URL)
		let newfaq = req.body; // je recupere les données en post

		bcrypt.genSalt(10, function (err, salt) { // encrypter 
			bcrypt.hash(newfaq.reponse, salt, function (err, hash) {

				// Pour remplacer la réponse par le hash que l'on vient de créer
				newfaq.reponse = hash;

				r.table('FAQ').insert(newfaq).run(connection, (err, cursor) => { // lance la requete qui va inserer puis après ca lance moi la requete avec pluck , mais tout peut-être mis sur la meme ligne
					if (err) throw err;
					r.table('FAQ').orderBy(r.asc('question')).run(connection, (err, cursor) => {
						cursor.toArray((err, result) => {
							res.json(result);
						})
					})
				})
				let mailOptions = {
					from: '<lauriane.collet1@gmail.com>', // sender address
					to: 'hello@gmail.com, coucou@prout.com', // list of receivers
					subject: 'Hello 👻 ', // Subject line
					text: 'Hello world ?', // plain text body
					html: `<h1>Hello world</h1>
					<p>Votre question a bien été crée tout comme votre réponse</p>` // html body
				};
				// send mail with defined transport object
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						return console.log(error);
					}
					console.log('Message %s sent: %s', info.messageId, info.response);
				});
			});
		});
	});
});


app.listen(3000, function () {
	console.log('Port 3000')
});
