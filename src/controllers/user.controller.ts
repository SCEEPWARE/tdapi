// Importation des types Request et Response depuis Express
// Request : représente la requête HTTP reçue
// Response : représente la réponse HTTP envoyée au client
import {Request, Response} from 'express';
import mariadb from "mariadb";

/**
 * Contrôleur pour la route GET /users
 * Description : Renvoie un message avec la liste des utilisateurs (simulation)
 * @param req - Objet représentant la requête HTTP (non utilisé ici)
 * @param res - Objet permettant d'envoyer une réponse HTTP
 */

// const users : {name: string; email: string}[] = [];

export const getUsers = (req: Request, res: Response) => {
    mariadb.createConnection({host: "localhost", user: "root", password: "1234", database: "tdapi"})
    .then(connection => connection.query(`SELECT ID,nom,email FROM users;`)
        .then(result => {res.json({users: result});
        })
        .catch(err => {res.status(500).json({error: err});
        })
        .finally(() => {connection.end();
        })
    ).catch(err => {res.status(500).json({error: err});})
};

export const getUserById = (req: Request, res: Response) => {
    const id = req.params.id;
    mariadb.createConnection({host: "localhost", user: "root", password: "1234", database: "tdapi"})
        .then(connection => connection.query(`SELECT ID,nom,email FROM users WHERE ID=?;`, [id])
            .then(result => {res.json(result[0]);
            })
            .catch(err => {res.status(500).json({error: err});
            })
            .finally(() => {connection.end();
            })
        ).catch(err => {res.status(500).json({error: err});})
}

/**
 * Contrôleur pour la route POST /users
 * Description : Ajoute un nouvel utilisateur en récupérant les données du corps de la requête
 * @param req - Objet représentant la requête HTTP contenant les données utilisateur
 * @param res - Objet permettant d'envoyer une réponse HTTP
 */
export const addUser = (req: Request, res: Response) => {
    const {name, email} = req.body; // Récupération des données envoyées dans le corps de la requête
// Envoie une réponse JSON confirmant l'ajout de l'utilisateur
    if (!name || !email) {
        return res.status(400).json({error: 'nom et email requis!'});
    }
    mariadb.createConnection({host: "localhost", user: "root", password: "1234", database: "tdapi"})
        .then(connection => connection.query(`INSERT INTO users (nom, email) VALUES (?, ?);`, [name, email])
            .then(() => {res.json({ message: `Utilisateur ${name} ajouté avec succès !`, email });
            })
            .catch(err => {res.status(500).json({error: err});
            })
            .finally(() => {connection.end();
            })
        ).catch(err => {res.status(500).json({error: err});})
};

export const editUser = (req: Request, res: Response) => {
    const id = req.params.id;
    const {name, email} = req.body;
    mariadb.createConnection({host: "localhost", user: "root", password: "1234", database: "tdapi"})
        .then(connection => connection.query(`UPDATE users SET nom=?, email=? WHERE ID = ?;`, [name, email, id])
            .then(() => {res.json({ message: `Utilisateur ${name} modifié avec succès !`, email });
            })
            .catch(err => {res.status(500).json({error: err});
            })
            .finally(() => {connection.end();
            })
        ).catch(err => {res.status(500).json({error: err});})
}

export const deleteUser = (req: Request, res: Response) => {
    const id = req.params.id;
    mariadb.createConnection({host: "localhost", user: "root", password: "1234", database: "tdapi"})
        .then(connection => connection.query(`DELETE FROM users WHERE id = ?;`, [id])
            .then(() => {res.json({ message: `Utilisateur ${id} supprimé avec succès !`});
            })
            .catch(err => {res.status(500).json({error: err});
            })
            .finally(() => {connection.end();
            })
        ).catch(err => {res.status(500).json({error: err});})
}