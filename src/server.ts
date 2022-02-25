// Permet d'importer les différents modules
import session from "express-session";
import express from "express";
import dotenv from "dotenv";
import path from "path";
 
// Permet d'ajouter les éléments du fichier .env à process
dotenv.config();

// Déclaration de Express
const app = express();

// Middlewares
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(express.json());

// Middleware session
app.use(session({ secret: 'secretSession', resave: true, saveUninitialized: true }));

// Routeur personnalisé => Accueil
app.use("/", require('../src/routes/home'));

// Routeur personnalisé => Auth
app.use("/auth", require('../src/routes/auth'));

// Écoute sur un port (3000 par défault)
app.listen(process.env.port || "3000", () => console.log(`[System] App listen on port ${process.env.port || "3000"}`));