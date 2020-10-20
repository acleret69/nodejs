
# NodeJS

Le projet consiste avec 3 boutons et une modals a faire diverse choses en utilisant du java , html , css , nodejs , npm , ajax et jquery .

# Installation

Installé tout les fichiers de gitHub 
    - faire npm install pour installé tout les modules néccésaires 

    - Installé nodejs

    - créér une base de donnée User 
    
    - crée une table [id Primary Key , Name , Age , Prénom]

    CREATE TABLE `user` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `Name` varchar(11) DEFAULT '',
    `Age` int(11) DEFAULT NULL,
    `Prénom` varchar(11) DEFAULT '',
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

    CREATE USER 'Name'@'localhost' IDENTIFIED BY 'secret23.';

    GRANT LOCK TABLES, INSERT, INDEX, ALTER, GRANT OPTION, DELETE, CREATE
    ROUTINE, EVENT, TRIGGER, EXECUTE, CREATE TEMPORARY TABLES, ALTER
    ROUTINE, CREATE VIEW, CREATE, DROP, REFERENCES, SELECT, SHOW VIEW,
    UPDATE ON `Name`.* TO 'Name'@'localhost';

    FLUSH PRIVILEGES;



    - variable d'environnement à modifier : APP_HOST ,APP_USER, 
    APP_PASSWORD, APP_DATABASE 
    Exemple : export APP_HOST="localhost"

    
