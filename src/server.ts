// Permet d'importer les différents modules
import session from "express-session";
import store from "connect-mongo";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import path from "path";

// Importer les routes
import dashRoute from "./routes/dashboard";
import authRoute from "./routes/auth";

// Importation de redirectAuth
import { checkAuth } from "./utils";
 
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
app.use(
    session({
      secret: String(process.env.secretSession),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000 * 60 * 24
      },
      store: store.create({
        mongoUrl: String(process.env.mongoDBConnection),
        autoRemove: "interval",
        autoRemoveInterval: 1
      }),
    }),
  );
// Page d'Accueil
app.get('/', checkAuth, (req, res) => res.render('home'));

// Routeur personnalisé => Auth
app.use('/auth', authRoute);

// Routeur personnalisé => Auth
app.use('/dashboard', dashRoute);

// Page d'erreur
app.get('*', (req, res) => res.status(404).render('error/404'));

// Connection à mongoDB
mongoose.connect(String(process.env.mongoDBConnection)).then(() => console.log("[System] Database connected !"));

const port = process.env.port || "3000";

// Écoute sur un port (3000 par défault)
app.listen(port, () => console.log(`[System] App listen on port ${port}`));