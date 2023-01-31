-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 31 jan. 2023 à 15:21
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `restaurant manager`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `nom` varchar(50) NOT NULL,
  PRIMARY KEY (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`nom`) VALUES
('Dessert'),
('Entrées'),
('Plats');

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `mailClient` varchar(100) NOT NULL,
  `nomClient` varchar(50) NOT NULL,
  `prenomClient` varchar(50) NOT NULL,
  `telephoneClient` varchar(50) NOT NULL,
  PRIMARY KEY (`telephoneClient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

DROP TABLE IF EXISTS `commandes`;
CREATE TABLE IF NOT EXISTS `commandes` (
  `numeroCommande` int(10) NOT NULL,
  `client` varchar(100) NOT NULL,
  `plat` varchar(100) NOT NULL,
  PRIMARY KEY (`numeroCommande`),
  KEY `client` (`client`),
  KEY `plat` (`plat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `contenirmenu`
--

DROP TABLE IF EXISTS `contenirmenu`;
CREATE TABLE IF NOT EXISTS `contenirmenu` (
  `menu` varchar(50) NOT NULL,
  `plat` varchar(100) NOT NULL,
  KEY `menu` (`menu`),
  KEY `plat` (`plat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `contenirplat`
--

DROP TABLE IF EXISTS `contenirplat`;
CREATE TABLE IF NOT EXISTS `contenirplat` (
  `ingredient` varchar(50) NOT NULL,
  `plat` varchar(50) NOT NULL,
  `quantite` int(10) NOT NULL,
  PRIMARY KEY (`ingredient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `fournisseurs`
--

DROP TABLE IF EXISTS `fournisseurs`;
CREATE TABLE IF NOT EXISTS `fournisseurs` (
  `nomFournisseur` varchar(100) NOT NULL,
  PRIMARY KEY (`nomFournisseur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
CREATE TABLE IF NOT EXISTS `ingredients` (
  `nomIngredient` varchar(50) NOT NULL,
  `datePeremption` date NOT NULL,
  `coutIngredient` int(10) NOT NULL,
  `fournisseur` varchar(50) NOT NULL,
  `stock` int(10) NOT NULL,
  PRIMARY KEY (`nomIngredient`),
  KEY `stock` (`stock`),
  KEY `fournisseur` (`fournisseur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `menus`
--

DROP TABLE IF EXISTS `menus`;
CREATE TABLE IF NOT EXISTS `menus` (
  `carteRestaurant` varchar(100) NOT NULL,
  `menuDuJour` varchar(100) NOT NULL,
  `plat` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `plats`
--

DROP TABLE IF EXISTS `plats`;
CREATE TABLE IF NOT EXISTS `plats` (
  `nomPlat` varchar(50) NOT NULL,
  `descriptionPlat` varchar(100) NOT NULL,
  `prixPlat` int(10) NOT NULL,
  `categorie` varchar(50) NOT NULL,
  PRIMARY KEY (`nomPlat`),
  KEY `categorie` (`categorie`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
CREATE TABLE IF NOT EXISTS `reservation` (
  `idReservation` int(11) NOT NULL AUTO_INCREMENT,
  `nbPersonnes` int(11) NOT NULL,
  `tableReserve` int(11) NOT NULL,
  `dateReserve` date NOT NULL,
  `client` varchar(50) NOT NULL,
  PRIMARY KEY (`idReservation`),
  UNIQUE KEY `nomClient` (`client`),
  KEY `tableReserve` (`tableReserve`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `salaries`
--

DROP TABLE IF EXISTS `salaries`;
CREATE TABLE IF NOT EXISTS `salaries` (
  `mailSalarie` varchar(80) NOT NULL,
  `nomSalarie` varchar(50) NOT NULL,
  `prenomSalarie` varchar(30) NOT NULL,
  `naissanceSalarie` date NOT NULL,
  `telephoneSalarie` varchar(10) NOT NULL,
  `adresseSalarie` varchar(100) NOT NULL,
  `salaireSalarie` int(10) NOT NULL,
  `posteSalaire` varchar(20) NOT NULL,
  PRIMARY KEY (`mailSalarie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `salles`
--

DROP TABLE IF EXISTS `salles`;
CREATE TABLE IF NOT EXISTS `salles` (
  `nomSalle` varchar(30) NOT NULL,
  `nombreCouvertTotal` int(20) NOT NULL,
  `zone` varchar(30) NOT NULL,
  `statutSalle` varchar(20) NOT NULL,
  `salarie` varchar(100) NOT NULL,
  `tableRestaurant` int(10) NOT NULL,
  PRIMARY KEY (`nomSalle`),
  KEY `salarie` (`salarie`),
  KEY `table` (`tableRestaurant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `stocks`
--

DROP TABLE IF EXISTS `stocks`;
CREATE TABLE IF NOT EXISTS `stocks` (
  `ingredient` varchar(50) NOT NULL,
  `quantiteIngredient` int(10) NOT NULL,
  `statut` varchar(20) NOT NULL,
  PRIMARY KEY (`ingredient`),
  KEY `ingredient` (`ingredient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `tables`
--

DROP TABLE IF EXISTS `tables`;
CREATE TABLE IF NOT EXISTS `tables` (
  `numeroTable` int(10) NOT NULL,
  `nombreCouvert` int(2) NOT NULL,
  `placeTable` int(1) NOT NULL,
  `client` varchar(100) NOT NULL,
  `reservation` int(11) NOT NULL,
  PRIMARY KEY (`numeroTable`),
  KEY `client` (`client`),
  KEY `reservation` (`reservation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD CONSTRAINT `commande_client` FOREIGN KEY (`client`) REFERENCES `clients` (`telephoneClient`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_table` FOREIGN KEY (`idReservation`) REFERENCES `tables` (`reservation`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `salles`
--
ALTER TABLE `salles`
  ADD CONSTRAINT `salles_salaries` FOREIGN KEY (`salarie`) REFERENCES `salaries` (`mailSalarie`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `tables`
--
ALTER TABLE `tables`
  ADD CONSTRAINT `tables_salles` FOREIGN KEY (`numeroTable`) REFERENCES `salles` (`tableRestaurant`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
