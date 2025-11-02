// importation modules
import express, {Request, Response} from "express";
import * as dotenv from 'dotenv'; // Permet de charger les variables d’environnement
import userRoutes from './routes/user.routes'; // Importe les routes utilisateurs
import mariadb from "mariadb";

// Charge les variables d'environnement depuis le fichier .env
dotenv.config();

// Création de l'application Express
const app = express();

// Définition du port du serveur (utilise celui de l'environnement ou 3000 par défaut)
const PORT = process.env.PORT || 3000;

// Identifiant et adresse de la base de données
const DB_HOST = process.env.DB_HOST || 'localhost'; // on utilise localhost en fallback
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

// Vérification identifiant/mot de passe de la base de données
if(!DB_PASSWORD){
    throw new Error("DB_PASSWORD non défini");
}
if(!DB_USERNAME){
    throw new Error("DB_USERNAME non défini");
}

// On accède à la base de données MariaDB
mariadb.createConnection({host: DB_HOST, user: DB_USERNAME, password: DB_PASSWORD})
    .then((connection) => {
        return connection.query(`CREATE DATABASE IF NOT EXISTS tdapi;`)
            .then(() => connection.query(`USE tdapi;`))
            .then(() => connection.query(`CREATE TABLE IF NOT EXISTS users
            (
                id
                INT
                not
                null,
                nom
                VARCHAR
                                          (
                64
                                          ) not null, email VARCHAR
                                          (
                                              64
                                          ) not null, PRIMARY KEY
                                          (
                                              ID
                                          ));`))
            .catch(err => console.log(err))
            .finally(() => connection.end());
    });

// Middleware pour parser le JSON dans les requêtes entrantes
app.use(express.json());

// Route de test pour vérifier si le serveur fonctionne
app.get('/', (req: Request, res: Response) => {
    res.send('🚀 API Node.js avec TypeScript fonctionne !'); // Réponse envoyée au client
});

// Utilisation des routes utilisateurs définies dans "user.routes.ts"
app.use('/users', userRoutes);

// Démarrage du serveur sur le port défini
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`); // Message de confirmationdans la console
});