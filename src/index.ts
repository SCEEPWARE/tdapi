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

// On utilise MariaDB
mariadb.createConnection({host: "localhost", user: "root", password: "1234"})
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