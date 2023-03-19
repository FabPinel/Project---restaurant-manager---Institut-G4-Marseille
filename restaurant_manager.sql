-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : Dim 19 mars 2023 à 09:57
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `restaurant_manager`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `nom` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `nom`) VALUES
(1, 'Boissons'),
(2, 'DessertGlace'),
(3, 'DessertGourmant'),
(4, 'Pâtes '),
(5, 'Pizzas - Crème'),
(6, 'Pizzas - Tomate'),
(8, 'Salade');

-- --------------------------------------------------------

--
-- Structure de la table `categoriestock`
--

DROP TABLE IF EXISTS `categoriestock`;
CREATE TABLE IF NOT EXISTS `categoriestock` (
  `nom` varchar(20) NOT NULL,
  PRIMARY KEY (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categoriestock`
--

INSERT INTO `categoriestock` (`nom`) VALUES
('Boisson'),
('Consommable'),
('Ingredient');

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nomClient` varchar(50) NOT NULL,
  `prenomClient` varchar(50) NOT NULL,
  `telephoneClient` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `telephoneClient` (`telephoneClient`),
  KEY `nomClient` (`nomClient`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`id`, `nomClient`, `prenomClient`, `telephoneClient`) VALUES
(1, 'PINEL', 'Fabien', '0612345678'),
(3, 'BRIKI', 'Aniss', '0787352767'),
(4, 'GAYRAUD', 'Cédric', '0687392873'),
(5, 'MOHAMDI', 'Jabir', '0738920474');

-- --------------------------------------------------------

--
-- Structure de la table `commandesfournisseur`
--

DROP TABLE IF EXISTS `commandesfournisseur`;
CREATE TABLE IF NOT EXISTS `commandesfournisseur` (
  `idCommande` int(10) NOT NULL AUTO_INCREMENT,
  `fournisseur` varchar(100) NOT NULL,
  `dateCommande` datetime NOT NULL,
  `dateLivraison` date NOT NULL,
  `statutCommandeFournisseur` varchar(50) NOT NULL DEFAULT 'En cours',
  PRIMARY KEY (`idCommande`),
  KEY `fournisseur` (`fournisseur`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commandesfournisseur`
--

INSERT INTO `commandesfournisseur` (`idCommande`, `fournisseur`, `dateCommande`, `dateLivraison`, `statutCommandeFournisseur`) VALUES
(6, 'Metro', '2023-03-05 11:33:55', '2023-03-08', 'Terminé'),
(7, 'Metro', '2023-03-05 11:36:48', '2023-03-08', 'Terminé'),
(10, 'Fromager', '2023-03-05 11:52:54', '2023-03-08', 'Terminé'),
(11, 'Fromager', '2023-03-05 11:56:44', '2023-03-08', 'Terminé'),
(12, 'Fromager', '2023-03-12 17:25:44', '2023-03-15', 'Terminé'),
(13, 'Fromager', '2023-03-12 17:34:32', '2023-03-15', 'Terminé'),
(14, 'Fromager', '2023-03-13 12:59:56', '2023-03-16', 'Terminé'),
(15, 'Fromager', '2023-03-13 13:02:10', '2023-03-16', 'Terminé'),
(16, 'Fromager', '2023-03-14 08:50:06', '2023-03-17', 'Terminé'),
(18, 'Metro', '2023-03-17 07:34:57', '2023-03-20', 'A valider'),
(19, 'Fromager', '2023-03-17 10:02:08', '2023-03-20', 'Terminé');

-- --------------------------------------------------------

--
-- Structure de la table `commandestables`
--

DROP TABLE IF EXISTS `commandestables`;
CREATE TABLE IF NOT EXISTS `commandestables` (
  `numeroCommande` int(10) NOT NULL AUTO_INCREMENT,
  `table` int(10) NOT NULL,
  `dateCommande` datetime(6) NOT NULL,
  `statutCommande` varchar(50) NOT NULL,
  PRIMARY KEY (`numeroCommande`),
  KEY `client` (`table`),
  KEY `statutCommande` (`statutCommande`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commandestables`
--

INSERT INTO `commandestables` (`numeroCommande`, `table`, `dateCommande`, `statutCommande`) VALUES
(18, 1, '2023-02-27 20:44:02.000000', 'Sur place'),
(29, 1, '2023-03-02 17:21:05.000000', 'A emporter'),
(31, 1, '2023-03-13 14:45:03.000000', 'Sur place'),
(32, 1, '2023-03-13 15:19:46.000000', 'Sur place'),
(33, 2, '2023-03-17 10:06:03.000000', 'Sur place'),
(34, 3, '2023-03-19 10:47:31.000000', 'Sur place'),
(35, 4, '2023-03-19 10:48:43.000000', 'A emporter'),
(36, 5, '2023-03-19 10:48:59.000000', 'Sur place'),
(37, 7, '2023-03-19 10:49:49.000000', 'A emporter'),
(38, 11, '2023-04-19 10:50:07.000000', 'Sur place'),
(39, 14, '2023-04-19 10:51:34.000000', 'A emporter'),
(40, 17, '2023-04-19 10:51:49.000000', 'Sur place');

-- --------------------------------------------------------

--
-- Structure de la table `contenircommandes`
--

DROP TABLE IF EXISTS `contenircommandes`;
CREATE TABLE IF NOT EXISTS `contenircommandes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commande` int(10) NOT NULL,
  `platCommande` varchar(50) NOT NULL,
  `quantitePlat` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `platCommande` (`platCommande`),
  KEY `commande` (`commande`)
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `contenircommandes`
--

INSERT INTO `contenircommandes` (`id`, `commande`, `platCommande`, `quantitePlat`) VALUES
(105, 18, 'Salade croquante​', 1),
(106, 18, 'Niçoise', 1),
(107, 18, 'César scampi', 1),
(108, 18, 'César pollo', 1),
(109, 29, '4 fromages', 14),
(110, 29, 'Tiramisu', 1),
(111, 31, '4 fromages', 1),
(112, 31, 'Diavola', 1),
(113, 31, 'Jambon', 1),
(114, 32, 'Saumon', 1),
(115, 32, 'Choco pizz\'', 1),
(116, 32, 'Reine', 1),
(121, 18, '4 fromages', 7),
(122, 29, 'Bolognese', 1),
(123, 33, '4 fromages', 1),
(124, 33, 'César pollo', 1),
(125, 33, 'Coca-cola', 1),
(126, 33, 'Tiramisu', 1),
(127, 34, 'Diavola', 1),
(128, 34, 'Chèvre miel', 1),
(129, 34, 'Carbonara', 1),
(130, 34, 'Crema Di Funghi', 1),
(131, 34, 'Quattro Formaggi', 1),
(132, 34, 'Pesto Roso', 1),
(133, 34, 'Tiramisu', 1),
(134, 34, 'Glace - 2 boules', 1),
(135, 34, 'Moelleux au chocolat', 1),
(136, 34, 'César scampi', 1),
(137, 34, 'César pollo', 1),
(138, 34, 'Coca-cola', 1),
(139, 34, 'Badoit', 1),
(140, 34, 'Eau minérale', 1),
(141, 34, 'Schweppes agrumes', 1),
(142, 34, 'Sprite', 1),
(143, 35, 'Pepperoni', 1),
(144, 35, 'Reine', 1),
(145, 35, 'Margherita', 1),
(146, 35, 'Jambon', 1),
(147, 36, '4 fromages', 1),
(148, 36, 'Pomodoro', 1),
(149, 36, 'César scampi', 1),
(150, 36, 'Tiramisu', 1),
(151, 36, 'Coca-cola cherry', 1),
(152, 36, 'Coca-cola', 1),
(153, 37, 'Pepperoni', 1),
(154, 37, 'Diavola', 1),
(155, 38, 'Pepperoni', 1),
(156, 38, 'Jambon', 1),
(157, 38, '4 fromages', 1),
(158, 38, 'Chèvre miel', 1),
(159, 38, 'Saumon', 1),
(160, 38, 'Reine', 1),
(161, 38, 'Margherita', 1),
(162, 38, 'Savoyarde', 1),
(163, 38, 'Tiramisu', 1),
(164, 38, 'Moelleux au chocolat', 1),
(165, 38, 'Mini beignets choco', 1),
(166, 38, 'Glace - 2 boules', 2),
(167, 38, 'Coca-cola', 2),
(168, 38, 'Badoit', 2),
(169, 38, 'Sprite', 1),
(170, 38, 'Coca-cola sans sucre', 1),
(171, 38, 'Fanta', 1),
(172, 38, 'Eau minérale', 1),
(173, 39, 'Pepperoni', 1),
(174, 39, 'Chèvre miel', 1),
(175, 40, 'Pepperoni', 1),
(176, 40, 'Jambon', 1),
(177, 40, 'Bolognese', 1),
(178, 40, 'Pomodoro', 1),
(179, 40, 'Choco pizz\'', 1),
(180, 40, 'Tiramisu', 1),
(181, 40, 'César pollo', 1),
(182, 40, 'Coca-cola', 1),
(183, 40, 'Eau minérale', 1),
(184, 40, 'Badoit', 1),
(185, 40, 'Coca-cola cherry', 1);

-- --------------------------------------------------------

--
-- Structure de la table `contenircommandesfournisseur`
--

DROP TABLE IF EXISTS `contenircommandesfournisseur`;
CREATE TABLE IF NOT EXISTS `contenircommandesfournisseur` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `nCommandeFournisseur` int(10) NOT NULL,
  `ingredient` varchar(50) NOT NULL,
  `quantite` int(10) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `nCommandeFournisseur` (`nCommandeFournisseur`),
  KEY `ingredient` (`ingredient`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `contenircommandesfournisseur`
--

INSERT INTO `contenircommandesfournisseur` (`id`, `nCommandeFournisseur`, `ingredient`, `quantite`) VALUES
(1, 6, 'Ails', 10),
(2, 6, 'Aubergine', 10),
(4, 7, 'Ails', 10),
(5, 10, 'Ails', 1),
(6, 7, 'Anchois', 10),
(7, 11, 'Aubergine', 10),
(8, 12, 'Chèvre', 4),
(9, 13, 'Pesto', 5),
(10, 14, 'Chèvre', 4),
(11, 15, 'Chorizo', 6),
(12, 10, 'Aubergine', 10),
(13, 16, 'Chèvre', 10),
(19, 18, 'Aubergine', 5),
(20, 19, 'Mozzarela', 5);

-- --------------------------------------------------------

--
-- Structure de la table `contenirmenu`
--

DROP TABLE IF EXISTS `contenirmenu`;
CREATE TABLE IF NOT EXISTS `contenirmenu` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `menu` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `platMenu` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `menu` (`menu`),
  KEY `plat` (`platMenu`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `contenirmenu`
--

INSERT INTO `contenirmenu` (`id`, `menu`, `platMenu`) VALUES
(1, 'Carte du restaurant', '4 fromages'),
(3, 'Menu du jour', 'Bolognese'),
(5, 'Carte du restaurant', 'Bolognese'),
(6, 'Menu du jour', 'César pollo'),
(7, 'Menu du jour', 'Tiramisu'),
(8, 'Carte du restaurant', 'Diavola'),
(9, 'Carte du restaurant', 'Jambon'),
(10, 'Carte du restaurant', 'Margherita'),
(11, 'Carte du restaurant', 'Pepperoni'),
(12, 'Carte du restaurant', 'Reine'),
(13, 'Carte du restaurant', 'Chèvre miel'),
(14, 'Carte du restaurant', 'Saumon'),
(15, 'Carte du restaurant', 'Savoyarde'),
(16, 'Carte du restaurant', 'Bolognese'),
(18, 'Carte du restaurant', 'Carbonara'),
(19, 'Carte du restaurant', 'Crema Di Funghi'),
(20, 'Carte du restaurant', 'Gnocchi Pomodoro'),
(21, 'Carte du restaurant', 'Pesto Roso'),
(22, 'Carte du restaurant', 'Pomodoro'),
(23, 'Carte du restaurant', 'Quattro Formaggi'),
(24, 'Carte du restaurant', 'Tartufo'),
(25, 'Carte du restaurant', 'Cal\'z banane choco'),
(26, 'Carte du restaurant', 'Choco pizz\''),
(27, 'Carte du restaurant', 'Mini beignets choco'),
(28, 'Carte du restaurant', 'Moelleux au chocolat'),
(29, 'Carte du restaurant', 'Tiramisu'),
(30, 'Carte du restaurant', 'Glace - 1 boule'),
(31, 'Carte du restaurant', 'Glace - 2 boules'),
(32, 'Carte du restaurant', 'Glace - 3 boules'),
(33, 'Carte du restaurant', 'César pollo'),
(34, 'Carte du restaurant', 'César scampi'),
(35, 'Carte du restaurant', 'Niçoise'),
(36, 'Carte du restaurant', 'Salade croquante​'),
(37, 'Carte du restaurant', 'Badoit'),
(38, 'Carte du restaurant', 'Eau minérale'),
(39, 'Carte du restaurant', 'Coca-cola'),
(40, 'Carte du restaurant', 'Coca-cola cherry'),
(41, 'Carte du restaurant', 'Coca-cola sans sucre'),
(42, 'Carte du restaurant', 'Fanta'),
(43, 'Carte du restaurant', 'Fuze tea'),
(44, 'Carte du restaurant', 'Oasis tropical'),
(45, 'Carte du restaurant', 'Schweppes agrumes'),
(46, 'Carte du restaurant', 'Sprite'),
(47, 'Menu du jour', 'Schweppes agrumes');

-- --------------------------------------------------------

--
-- Structure de la table `contenirplat`
--

DROP TABLE IF EXISTS `contenirplat`;
CREATE TABLE IF NOT EXISTS `contenirplat` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `ingredient` varchar(50) NOT NULL,
  `plat` varchar(50) NOT NULL,
  `quantite` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `plat` (`plat`),
  KEY `ingredient` (`ingredient`)
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `contenirplat`
--

INSERT INTO `contenirplat` (`id`, `ingredient`, `plat`, `quantite`) VALUES
(7, 'Pate a pizza', '4 fromages', 1),
(8, 'Sauce tomate', '4 fromages', 1),
(9, 'Mozzarela', '4 fromages', 2),
(10, 'Fourme d’Ambert ', '4 fromages', 1),
(11, 'Emmental', '4 fromages', 1),
(12, 'Chèvre', '4 fromages', 1),
(13, 'Pate a pizza', 'Chèvre miel', 1),
(15, 'Crème fraiche', 'Chèvre miel', 1),
(16, 'Chèvre', 'Chèvre miel', 1),
(17, 'Miel', 'Chèvre miel', 1),
(18, 'Badoit', 'Badoit', 1),
(19, 'Coca-cola', 'Coca-cola', 1),
(22, 'Fanta', 'Fanta', 1),
(23, 'Fuze tea', 'Fuze tea', 1),
(24, 'Oasis ', 'Oasis tropical', 1),
(25, 'Schweppes', 'Schweppes agrumes', 1),
(26, 'Tiramisu', 'Tiramisu', 1),
(27, 'Salade', 'César pollo', 1),
(28, 'Crouton', 'César pollo', 1),
(29, 'Mozzarela', 'César pollo', 1),
(30, 'Poulet', 'César pollo', 1),
(31, 'Pate a pizza', 'Diavola', 1),
(32, 'Sauce tomate', 'Diavola', 1),
(33, 'Bœuf ', 'Diavola', 1),
(34, 'Poivron', 'Diavola', 1),
(35, 'Oignon', 'Diavola', 1),
(36, 'Piment jalapeños', 'Diavola', 1),
(37, 'Pate a pizza', 'Jambon', 1),
(38, 'Sauce tomate', 'Jambon', 1),
(39, 'Mozzarela', 'Jambon', 1),
(40, 'Jambon de parme', 'Jambon', 1),
(41, 'Pate a pizza', 'Margherita', 1),
(42, 'Sauce tomate', 'Margherita', 1),
(43, 'Mozzarela', 'Margherita', 1),
(44, 'Pate a pizza', 'Pepperoni', 1),
(45, 'Sauce tomate', 'Pepperoni', 1),
(46, 'Mozzarela', 'Pepperoni', 1),
(47, 'Pepperoni', 'Pepperoni', 1),
(48, 'Pate a pizza', 'Reine', 1),
(49, 'Sauce tomate', 'Reine', 1),
(50, 'Mozzarela', 'Reine', 1),
(51, 'Jambon de parme', 'Reine', 1),
(52, 'Champignons', 'Reine', 1),
(53, 'Pate a pizza', 'Saumon', 1),
(54, 'Crème fraiche', 'Saumon', 1),
(55, 'Mozzarela', 'Saumon', 1),
(56, 'Saumon', 'Saumon', 1),
(57, 'Oignon', 'Saumon', 1),
(58, 'Pomme de terre', 'Saumon', 1),
(59, 'Pate a pizza', 'Savoyarde', 1),
(60, 'Crème fraiche', 'Savoyarde', 1),
(61, 'Mozzarela', 'Savoyarde', 1),
(62, 'Lardon', 'Savoyarde', 1),
(63, 'Pomme de terre', 'Savoyarde', 1),
(64, 'Reblochon', 'Savoyarde', 1),
(65, 'Origan', 'Savoyarde', 1),
(66, 'Bœuf ', 'Bolognese', 1),
(67, 'Oignon', 'Bolognese', 1),
(68, 'Célerie', 'Bolognese', 1),
(69, 'Sauce italienne', 'Bolognese', 1),
(70, 'Fusilli', 'Bolognese', 1),
(71, 'Spaghetti', 'Carbonara', 1),
(72, 'Lardon', 'Carbonara', 1),
(73, 'Crème fraiche', 'Carbonara', 1),
(74, 'Oeuf', 'Carbonara', 1),
(75, 'Mozzarela', 'Carbonara', 1),
(76, 'Basilic', 'Carbonara', 1),
(77, 'Fusilli', 'Crema Di Funghi', 1),
(78, 'Champignons', 'Crema Di Funghi', 1),
(79, 'Oignon', 'Crema Di Funghi', 1),
(80, 'Muscade', 'Crema Di Funghi', 1),
(81, 'Vin blanc', 'Crema Di Funghi', 1),
(82, 'Crème fraiche', 'Crema Di Funghi', 1),
(83, 'Basilic', 'Crema Di Funghi', 1),
(84, 'Farfalle', 'Gnocchi Pomodoro', 1),
(85, 'Sauce tomate', 'Gnocchi Pomodoro', 1),
(86, 'Oignon', 'Gnocchi Pomodoro', 1),
(87, 'Tomate cerise', 'Gnocchi Pomodoro', 1),
(88, 'Fusilli', 'Pesto Roso', 1),
(89, 'Emmental', 'Pesto Roso', 1),
(90, 'Pignon de pain', 'Pesto Roso', 1),
(91, 'Tomate', 'Pesto Roso', 1),
(92, 'Piment jalapeños', 'Pesto Roso', 1),
(93, 'Spaghetti', 'Pomodoro', 1),
(94, 'Sauce tomate', 'Pomodoro', 1),
(95, 'Oignon', 'Pomodoro', 1),
(96, 'Crème fraiche', 'Quattro Formaggi', 1),
(97, 'Gorgonzola', 'Quattro Formaggi', 1),
(98, 'Emmental', 'Quattro Formaggi', 1),
(99, 'Burrata', 'Quattro Formaggi', 1),
(100, 'Chèvre', 'Quattro Formaggi', 1),
(101, 'Salade', 'Quattro Formaggi', 1),
(102, 'Noisettes', 'Quattro Formaggi', 1),
(103, 'Crème de truffe', 'Tartufo', 1),
(104, 'Spaghetti', 'Tartufo', 1),
(105, 'Huile d\'olive', 'Tartufo', 1),
(106, 'Ails', 'Tartufo', 1),
(107, 'Vin blanc', 'Tartufo', 1),
(108, 'Marrons', 'Tartufo', 1),
(109, 'Basilic', 'Tartufo', 1),
(110, 'Citron vert', 'Tartufo', 1),
(111, 'Pate a pizza', 'Choco pizz\'', 1),
(112, 'Chocolat', 'Choco pizz\'', 1),
(113, 'Glace', 'Glace - 1 boule', 1),
(114, 'Glace', 'Glace - 2 boules', 2),
(115, 'Glace', 'Glace - 3 boules', 3),
(116, 'Mini beignet', 'Mini beignets choco', 4),
(117, 'Moelleux au chocolat', 'Moelleux au chocolat', 1),
(118, 'Salade', 'César scampi', 1),
(119, 'Crouton', 'César scampi', 1),
(120, 'Gorgonzola', 'César scampi', 1),
(121, 'Crevette', 'César scampi', 1),
(122, 'Salade', 'Niçoise', 1),
(123, 'Thon', 'Niçoise', 1),
(124, 'Olive', 'Niçoise', 1),
(125, 'Tomate cerise', 'Niçoise', 1),
(126, 'Pois gourmant', 'Niçoise', 1),
(127, 'Pomme de terre', 'Niçoise', 1),
(128, 'Oeuf', 'Niçoise', 1),
(129, 'Salade', 'Salade croquante​', 1),
(130, 'Carotte', 'Salade croquante​', 1),
(131, 'Tomate cerise', 'Salade croquante​', 1),
(132, 'Vinaigre', 'Salade croquante​', 1),
(133, 'Coca-cola cherry', 'Coca-cola cherry', 1),
(134, 'Coca-cola sans sucre', 'Coca-cola sans sucre', 1),
(135, 'Eau minérale', 'Eau minérale', 1),
(136, 'Sprites', 'Sprite', 1);

-- --------------------------------------------------------

--
-- Structure de la table `fournisseurs`
--

DROP TABLE IF EXISTS `fournisseurs`;
CREATE TABLE IF NOT EXISTS `fournisseurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nomFournisseur` varchar(100) NOT NULL,
  `type` varchar(20) NOT NULL,
  PRIMARY KEY (`nomFournisseur`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `fournisseurs`
--

INSERT INTO `fournisseurs` (`id`, `nomFournisseur`, `type`) VALUES
(13, 'Fromager', 'Fromages'),
(1, 'Metro', 'Consommable'),
(16, 'Primeur', 'Fruits/Légumes');

-- --------------------------------------------------------

--
-- Structure de la table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
CREATE TABLE IF NOT EXISTS `ingredients` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nomIngredient` varchar(50) NOT NULL,
  `datePeremption` date DEFAULT NULL,
  `coutIngredient` int(10) NOT NULL,
  `fournisseur` varchar(50) NOT NULL,
  `stock` int(10) NOT NULL,
  `iconeUrl` longtext NOT NULL,
  `categorieIngredient` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `stock` (`stock`),
  KEY `fournisseur` (`fournisseur`),
  KEY `categorieIngredient` (`categorieIngredient`),
  KEY `nomIngredient` (`nomIngredient`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `ingredients`
--

INSERT INTO `ingredients` (`id`, `nomIngredient`, `datePeremption`, `coutIngredient`, `fournisseur`, `stock`, `iconeUrl`, `categorieIngredient`) VALUES
(1, 'Ails', '2025-02-08', 8, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/6410/6410019.png', 'Ingredient'),
(2, 'Anchois', '2023-03-17', 8, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/2055/2055575.png', 'Ingredient'),
(3, 'Aubergine', '2023-03-10', 4, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/433/433725.png', 'Ingredient'),
(4, 'Basilic', '2023-02-20', 2, 'Metro', 198, 'https://cdn-icons-png.flaticon.com/512/3944/3944322.png', 'Ingredient'),
(5, 'Beurre', '2023-04-29', 8, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/2269/2269302.png', 'Ingredient'),
(6, 'Champignons', '2023-03-29', 15, 'Metro', 197, 'https://cdn-icons-png.flaticon.com/512/782/782225.png', 'Ingredient'),
(7, 'Chèvre', '2023-04-11', 7, 'Metro', 193, 'https://cdn-icons-png.flaticon.com/512/94/94257.png', 'Ingredient'),
(8, 'Chorizo', '2023-04-22', 6, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/6938/6938452.png', 'Ingredient'),
(9, 'Courgette', '2023-03-16', 4, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/6108/6108654.png', 'Ingredient'),
(10, 'Crème fraiche', '2023-03-23', 8, 'Metro', 192, 'https://cdn-icons-png.flaticon.com/512/4034/4034041.png', 'Ingredient'),
(11, 'Farfalle', '2024-02-08', 2, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/5222/5222220.png', 'Ingredient'),
(12, 'Farine', '2024-08-02', 5, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/2098/2098457.png', 'Ingredient'),
(13, 'Fusilli', '2024-02-08', 2, 'Metro', 197, 'https://cdn-icons-png.flaticon.com/512/5222/5222290.png', 'Ingredient'),
(14, 'Huile d\'olive', '2023-04-14', 40, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/4264/4264633.png', 'Ingredient'),
(15, 'Jambon de parme', '2023-03-21', 12, 'Metro', 195, 'https://cdn-icons-png.flaticon.com/512/5409/5409380.png', 'Ingredient'),
(16, 'Mascarpone', '2023-03-17', 6, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/4465/4465472.png', 'Ingredient'),
(17, 'Miel', '2025-12-31', 11, 'Metro', 197, 'https://cdn-icons-png.flaticon.com/512/4264/4264569.png', 'Ingredient'),
(18, 'Mortadelle', '2023-03-11', 6, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/4605/4605725.png', 'Ingredient'),
(19, 'Mozzarela', '2023-02-16', 3, 'Metro', 181, 'https://cdn-icons-png.flaticon.com/512/4713/4713854.png', 'Ingredient'),
(20, 'Oignon', '2024-09-11', 2, 'Metro', 193, 'https://cdn-icons-png.flaticon.com/512/681/681032.png', 'Ingredient'),
(21, 'Olive', '2023-03-14', 8, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/1744/1744082.png', 'Ingredient'),
(22, 'Parmesan', '2024-02-15', 4, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/4076/4076791.png', 'Ingredient'),
(23, 'Penne', '2024-02-08', 50, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/5222/5222638.png', 'Ingredient'),
(24, 'Pepperoni', '2023-03-09', 10, 'Metro', 195, 'https://cdn-icons-png.flaticon.com/512/2720/2720260.png\r\n', 'Ingredient'),
(25, 'Pesto', '2023-05-18', 12, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/9659/9659900.png', 'Ingredient'),
(26, 'Poivron', '2023-03-20', 4, 'Metro', 198, 'https://cdn-icons-png.flaticon.com/512/2909/2909765.png', 'Ingredient'),
(27, 'Pomme de terre', '2023-05-02', 4, 'Metro', 198, 'https://cdn-icons-png.flaticon.com/512/6128/6128141.png', 'Ingredient'),
(28, 'Poulet', '2023-03-17', 10, 'Metro', 197, 'https://cdn-icons-png.flaticon.com/512/35/35625.png', 'Ingredient'),
(29, 'Riz', '2024-05-14', 4, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/3363/3363571.png', 'Ingredient'),
(30, 'Salade', '2023-03-16', 3, 'Metro', 194, 'https://cdn-icons-png.flaticon.com/512/3823/3823349.png', 'Ingredient'),
(31, 'Sauce tomate', '2023-03-09', 10, 'Metro', 181, 'https://cdn-icons-png.flaticon.com/512/4437/4437613.png', 'Ingredient'),
(32, 'Saumon', '2023-03-30', 18, 'Metro', 199, 'https://cdn-icons-png.flaticon.com/512/7590/7590755.png', 'Ingredient'),
(33, 'Spaghetti', '2024-02-08', 2, 'Metro', 197, 'https://cdn-icons-png.flaticon.com/512/3950/3950266.png', 'Ingredient'),
(34, 'Tomate', '2023-02-15', 10, 'Metro', 199, 'https://cdn-icons-png.flaticon.com/512/1413/1413626.png', 'Ingredient'),
(35, 'Tomate cerise', '2023-03-14', 7, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/7697/7697018.png', 'Ingredient'),
(36, 'Emmental', '2023-03-17', 10, 'Fromager', 195, 'https://cdn-icons-png.flaticon.com/512/5716/5716964.png', 'Ingredient'),
(37, 'Fourme d’Ambert ', '2023-03-17', 10, 'Fromager', 197, 'https://cdn-icons-png.flaticon.com/512/2816/2816842.png', 'Ingredient'),
(38, 'Bœuf ', '2023-03-17', 15, 'Metro', 197, 'https://cdn-icons-png.flaticon.com/512/5564/5564874.png', 'Ingredient'),
(39, 'Piment jalapeños', '2023-03-17', 4, 'Metro', 197, 'https://cdn-icons-png.flaticon.com/512/3617/3617693.png', 'Ingredient'),
(41, 'Lardon', '2023-03-17', 4, 'Metro', 198, 'https://cdn-icons-png.flaticon.com/512/8616/8616601.png', 'Ingredient'),
(42, 'Reblochon', '2023-03-17', 5, 'Fromager', 199, 'https://cdn-icons-png.flaticon.com/512/1071/1071231.png', 'Ingredient'),
(43, 'Origan', '2023-03-17', 10, 'Primeur', 199, 'https://cdn-icons-png.flaticon.com/512/1398/1398381.png', 'Ingredient'),
(44, 'Célerie', '2023-03-17', 10, 'Primeur', 199, 'https://cdn-icons-png.flaticon.com/512/3944/3944118.png', 'Ingredient'),
(45, 'Sauce italienne', '2023-03-17', 4, 'Metro', 199, 'https://cdn-icons-png.flaticon.com/512/1208/1208425.png', 'Ingredient'),
(46, 'Oeuf', '2023-03-17', 4, 'Primeur', 199, 'https://cdn-icons-png.flaticon.com/512/3792/3792786.png', 'Ingredient'),
(47, 'Muscade', '2023-03-17', 4, 'Metro', 199, 'https://cdn-icons-png.flaticon.com/512/6619/6619719.png', 'Ingredient'),
(48, 'Vin blanc', '2023-03-17', 15, 'Metro', 199, 'https://cdn-icons-png.flaticon.com/512/5622/5622688.png', 'Ingredient'),
(49, 'Pignon de pain', '2023-03-17', 10, 'Metro', 199, 'https://cdn-icons-png.flaticon.com/512/6113/6113340.png', 'Ingredient'),
(50, 'Gorgonzola', '2023-03-17', 10, 'Fromager', 197, 'https://cdn-icons-png.flaticon.com/512/934/934334.png', 'Ingredient'),
(51, 'Burrata', '2023-03-17', 4, 'Fromager', 199, 'https://cdn-icons-png.flaticon.com/512/5621/5621948.png', 'Ingredient'),
(52, 'Noisettes', '2023-03-17', 4, 'Metro', 199, 'https://cdn-icons-png.flaticon.com/512/4366/4366348.png', 'Ingredient'),
(53, 'Crème de truffe', '2023-03-17', 15, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/4034/4034041.png', 'Ingredient'),
(54, 'Marrons', '2023-03-17', 4, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/5417/5417103.png', 'Ingredient'),
(55, 'Citron vert', '2023-03-17', 10, 'Primeur', 200, 'https://cdn-icons-png.flaticon.com/512/3613/3613028.png', 'Ingredient'),
(56, 'Glace', '2023-03-17', 4, 'Metro', 194, 'https://cdn-icons-png.flaticon.com/512/5764/5764116.png', 'Ingredient'),
(57, 'Mini beignet', '2023-03-17', 2, 'Metro', 196, 'https://cdn-icons-png.flaticon.com/512/2585/2585909.png', 'Ingredient'),
(58, 'Moelleux au chocolat', '2023-03-17', 1, 'Metro', 198, 'https://cdn-icons-png.flaticon.com/512/3008/3008735.png', 'Ingredient'),
(59, 'Tiramisu', '2023-03-17', 2, 'Metro', 195, 'https://cdn-icons-png.flaticon.com/512/3091/3091306.png', 'Ingredient'),
(60, 'Chocolat', '2023-03-17', 4, 'Metro', 199, 'https://cdn-icons-png.flaticon.com/512/6954/6954015.png', 'Ingredient'),
(61, 'Pate a pizza', '2023-03-17', 1, 'Metro', 177, 'https://cdn-icons-png.flaticon.com/512/1999/1999963.png', 'Ingredient'),
(62, 'Crouton', '2023-03-17', 1, 'Metro', 195, 'https://cdn-icons-png.flaticon.com/512/3348/3348084.png', 'Ingredient'),
(63, 'Crevette', '2023-03-17', 4, 'Metro', 198, 'https://cdn-icons-png.flaticon.com/512/3071/3071050.png', 'Ingredient'),
(64, 'Thon', '2023-03-17', 10, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/1728/1728841.png', 'Ingredient'),
(66, 'Pois gourmant', '2023-03-17', 1, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/5159/5159993.png', 'Ingredient'),
(68, 'Carotte', '2023-03-17', 4, 'Primeur', 200, 'https://cdn-icons-png.flaticon.com/512/4366/4366273.png', 'Ingredient'),
(69, 'Vinaigre', '2023-03-17', 4, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/80/80186.png', 'Ingredient'),
(70, 'Boite a pizza', '2023-03-17', 1, 'Metro', 192, 'https://cdn-icons-png.flaticon.com/512/3367/3367981.png', 'Consommable'),
(71, 'Schweppes', '2023-03-17', 1, 'Metro', 199, 'https://cdn-icons-png.flaticon.com/512/1349/1349787.png', 'Boisson'),
(72, 'Fuze tea', '2023-03-17', 1, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/1349/1349787.png', 'Boisson'),
(73, 'Oasis ', '2023-03-17', 1, 'Metro', 200, 'https://cdn-icons-png.flaticon.com/512/1349/1349787.png', 'Boisson'),
(74, 'Fanta', '2023-03-17', 1, 'Metro', 199, 'https://cdn-icons-png.flaticon.com/512/1349/1349787.png', 'Boisson'),
(75, 'Coca-cola', '2023-03-17', 1, 'Metro', 194, 'https://cdn-icons-png.flaticon.com/512/1349/1349787.png', 'Boisson'),
(76, 'Coca-cola cherry', '2023-03-17', 1, 'Metro', 198, 'https://cdn-icons-png.flaticon.com/512/1349/1349787.png', 'Boisson'),
(77, 'Badoit', '2023-03-17', 1, 'Metro', 196, 'https://cdn-icons-png.flaticon.com/512/1349/1349787.png', 'Boisson'),
(78, 'Coca-cola sans sucre', '2023-03-17', 1, 'Metro', 199, 'https://cdn-icons-png.flaticon.com/512/1349/1349787.png', 'Boisson'),
(79, 'Eau minérale', '2023-03-17', 1, 'Metro', 197, 'https://cdn-icons-png.flaticon.com/512/1349/1349787.png', 'Boisson'),
(80, 'Sprites', '2023-03-17', 1, 'Metro', 198, 'https://cdn-icons-png.flaticon.com/512/1349/1349787.png', 'Boisson');

-- --------------------------------------------------------

--
-- Structure de la table `menus`
--

DROP TABLE IF EXISTS `menus`;
CREATE TABLE IF NOT EXISTS `menus` (
  `typeMenu` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  PRIMARY KEY (`typeMenu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `menus`
--

INSERT INTO `menus` (`typeMenu`) VALUES
('Carte du restaurant'),
('Menu du jour');

-- --------------------------------------------------------

--
-- Structure de la table `plats`
--

DROP TABLE IF EXISTS `plats`;
CREATE TABLE IF NOT EXISTS `plats` (
  `idPlat` int(10) NOT NULL AUTO_INCREMENT,
  `nomPlat` varchar(50) NOT NULL,
  `descriptionPlat` varchar(1000) NOT NULL,
  `prixPlat` float NOT NULL,
  `categorie` varchar(50) NOT NULL,
  `imgPlat` longtext,
  PRIMARY KEY (`idPlat`),
  KEY `categorie` (`categorie`),
  KEY `nomPlat` (`nomPlat`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `plats`
--

INSERT INTO `plats` (`idPlat`, `nomPlat`, `descriptionPlat`, `prixPlat`, `categorie`, `imgPlat`) VALUES
(1, '4 fromages', 'Sauce tomate , mozzarella, chèvre, emmental, Fourme d’Ambert AOP.', 13, 'Pizzas - Tomate', 'https://www.dominos.fr/ManagedAssets/FR/product/P4FR/FR_P4FR_fr_menu_9172.png?v-1678591556'),
(3, 'Pepperoni', 'Sauce tomate, mozzarella, pepperoni.', 8.5, 'Pizzas - Tomate', 'https://www.dominos.fr/ManagedAssets/FR/product/PCHP/FR_PCHP_fr_menu_9172.png?v-965639775'),
(4, 'Margherita', 'Sauce tomate, mozzarella.', 8.5, 'Pizzas - Tomate', 'https://www.dominos.fr/ManagedAssets/FR/product/PMAR/FR_PMAR_all_menu_9664.png?v1832609322'),
(6, 'Reine', 'Sauce tomate, mozzarella, jambon, champignons de Paris.', 11, 'Pizzas - Tomate', 'https://www.dominos.fr/ManagedAssets/FR/product/PREI/FR_PREI_fr_menu_9172.png?v359197323'),
(7, 'Chèvre miel', 'Crème fraîche légère française, mozzarella, chèvre, miel français.', 12, 'Pizzas - Crème', 'https://www.dominos.fr/ManagedAssets/FR/product/PCMI/FR_PCMI_fr_menu_9172.png?v1841034372'),
(8, 'Savoyarde', 'Crème fraîche légère française, mozzarella, lardons fumés, pommes de terre françaises sautées, Reblochon de Savoie AOP, origan.', 13, 'Pizzas - Crème', 'https://www.dominos.fr/ManagedAssets/FR/product/PSVY/FR_PSVY_fr_menu_9172.png?v-186655036'),
(9, 'Saumon', 'Crème fraîche légère française, mozzarella, saumon fumé au bois de hêtre, oignons, pommes de terre françaises sautées.', 13.5, 'Pizzas - Crème', 'https://www.dominos.fr/ManagedAssets/FR/product/PSAU/FR_PSAU_fr_menu_9172.png?v-577323236'),
(10, 'Diavola', 'Sauce tomate, mozzarella, haché au bœuf assaisonné*, duo de poivrons, oignons, piments jalapeños.', 12, 'Pizzas - Tomate', 'https://www.dominos.fr/ManagedAssets/FR/product/PDIB/FR_PDIB_fr_menu_9172.png?v-1016950815'),
(11, 'Jambon', 'Sauce tomate, mozzarella, jambon.', 8.5, 'Pizzas - Tomate', 'https://www.dominos.fr/ManagedAssets/FR/product/PCJA/FR_PCJA_fr_menu_9172.png?v1933656822'),
(12, 'Choco pizz\'', 'Bâtonnets de pâte à pizza nappés de sauce goût chocolat-noisette.', 4, 'DessertGourmant', 'https://www.dominos.fr/ManagedAssets/FR/product/ECHOB/FR_ECHOB_fr_menu_9314.png?v1264774915'),
(13, 'Moelleux au chocolat', 'Avec son coeur coulant, l’émotion chocolat est garantie !', 3, 'DessertGourmant', 'https://www.dominos.fr/ManagedAssets/FR/product/EDMOE/FR_EDMOE_fr_menu_9314.png?v1690512020'),
(14, 'Mini beignets choco', '4 mini beignets fourrés chocolat-noisette.', 4, 'DessertGourmant', 'https://www.dominos.fr/ManagedAssets/FR/product/EDMBE/FR_EDMBE_fr_menu_9314.png?v-706253690'),
(15, 'Cal\'z banane choco', 'Pâte à pizza garnie d’une compotée de bananes caramélisées et d\'une sauce goût chocolat-noisette.', 4, 'DessertGourmant', 'https://www.dominos.fr/ManagedAssets/FR/product/ECABC/FR_ECABC_fr_menu_9314.png?v506813498'),
(17, 'Glace - 1 boule', 'Parfum: Vanille, Chocolat, Pistache, Café', 2.5, 'DessertGlace', 'https://image.noelshack.com/fichiers/2023/09/4/1677775044-1-boule.png'),
(18, 'Glace - 2 boules', 'Parfum: Vanille, Chocolat, Pistache, Café', 4.5, 'DessertGlace', 'https://image.noelshack.com/fichiers/2023/09/4/1677775044-2-boules.png'),
(19, 'Glace - 3 boules', 'Parfum: Vanille, Chocolat, Pistache, Café', 6, 'DessertGlace', 'https://image.noelshack.com/fichiers/2023/09/4/1677775044-3-boules.png'),
(20, 'Schweppes agrumes', '33cl', 2.5, 'Boissons', 'https://www.dominos.fr/ManagedAssets/FR/product/DSCB/FR_DSCB_all_menu_9416.png?v-2052543792'),
(21, 'Fuze tea', '33cl', 2.5, 'Boissons', 'https://www.dominos.fr/ManagedAssets/FR/product/DFUP/FR_DFUP_all_menu_9374.jpg?v-1695679739'),
(22, 'Oasis tropical', '33cl', 2.5, 'Boissons', 'https://www.dominos.fr/ManagedAssets/FR/product/DOTR/FR_DOTR_fr_menu_8993.png?v-212427904'),
(23, 'Fanta', '33cl', 2.5, 'Boissons', 'https://www.dominos.fr/ManagedAssets/FR/product/DFAN/FR_DFAN_fr_menu_8993.png?v912631001'),
(24, 'Sprite', '33cl', 2.5, 'Boissons', 'https://www.dominos.fr/ManagedAssets/FR/product/DSPR/FR_DSPR_fr_menu_4231.png?v1952100262'),
(25, 'Coca-cola', '33cl', 2.5, 'Boissons', 'https://www.dominos.fr/ManagedAssets/FR/product/DCOK/FR_DCOK_fr_menu_8993.png?v-334487380'),
(26, 'Coca-cola sans sucre', '33cl', 2.5, 'Boissons', 'https://www.dominos.fr/ManagedAssets/FR/product/DCOZ/FR_DCOZ_fr_menu_8993.png?v227832660'),
(27, 'Coca-cola cherry', '33cl', 2.5, 'Boissons', 'https://www.dominos.fr/ManagedAssets/FR/product/DCOC/FR_DCOC_fr_menu_8993.png?v-822686453'),
(28, 'Eau minérale', '33cl', 1.5, 'Boissons', 'https://www.dominos.fr/ManagedAssets/FR/product/DEVI0500/FR_DEVI0500_all_menu_10007.png?v964151811'),
(29, 'Badoit', '33cl', 2, 'Boissons', 'https://www.dominos.fr/ManagedAssets/FR/product/DBAD0500/FR_DBAD0500_fr_menu_8993.png?v-1437163898'),
(30, 'Tiramisu', 'Sucre roux, sucre vanillé, biscuit à la cuillère, cacao, œufs, mascarpone, café noir.', 4.5, 'DessertGourmant', 'https://image.noelshack.com/fichiers/2023/09/4/1677775044-tiramisu.png'),
(31, 'Crema Di Funghi', 'Champignons, oignons balsamique, muscade, vin blanc, crème, persil.', 12.5, 'Pâtes ', 'https://image.noelshack.com/fichiers/2023/09/4/1677779965-crema.png'),
(32, 'Pomodoro', 'Sauce tomate, oignons.', 11, 'Pâtes ', 'https://image.noelshack.com/fichiers/2023/09/4/1677779965-pomodoro.png'),
(33, 'Carbonara', 'Lardons, oignons, sauce crémeuse, oeuf, fromage italien, persil.', 12, 'Pâtes ', 'https://www.vapiano.fr/wp-content/uploads/PASTA-Carbonara-Salmone-1.jpg'),
(34, 'Bolognese', 'Bœuf, oignons, céleri, sauce italienne.', 12, 'Pâtes ', 'https://image.noelshack.com/fichiers/2023/09/4/1677779965-bolo.png'),
(35, 'Tartufo', 'Crème de truffe, huile d\'olive, oignons blanc, ail, vin blanc, marrons, persil, citron vert.', 15, 'Pâtes ', 'https://image.noelshack.com/fichiers/2023/09/4/1677780358-truffe.png'),
(36, 'Pesto Roso', 'Fusilli pesto tomate, fromage italien, pignons de pins, tomates et piment.', 13, 'Pâtes ', 'https://image.noelshack.com/fichiers/2023/09/4/1677780533-pesto.png'),
(37, 'Quattro Formaggi', 'Crème, gorgonzola, fromage italien, burrata, chèvre, roquette, noisettes torréfiées.', 13, 'Pâtes ', 'https://image.noelshack.com/fichiers/2023/09/4/1677780748-quattro.png'),
(38, 'Gnocchi Pomodoro', 'Sauce tomate, oignons balsamique et tomate cerises.', 12, 'Pâtes ', 'https://image.noelshack.com/fichiers/2023/09/4/1677780867-gnocchi-pomodoro.png'),
(39, 'Niçoise', 'Mélange de salades, thon, olives noires, tomates cerises, oignons verts et rouges, pois gourmands, pommes de terre et œuf dur.', 8, 'Salade', 'https://image.noelshack.com/fichiers/2023/09/5/1677836953-nicoise.png'),
(40, 'César scampi', '\r\nLaitue romaine, croûtons maison, fromage italien et crevettes.', 8, 'Salade', 'https://image.noelshack.com/fichiers/2023/09/5/1677837283-cesar.png'),
(41, 'César pollo', 'Laitue romaine, croûtons maison, fromage italien et poulet.', 8, 'Salade', 'https://image.noelshack.com/fichiers/2023/09/5/1677837563-pollo.png'),
(42, 'Salade croquante​', 'Mélange de salades, carottes et tomates cerises avec notre vinaigrette balsamique.', 6.5, 'Salade', 'https://image.noelshack.com/fichiers/2023/09/5/1677837461-croquante.png');

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
CREATE TABLE IF NOT EXISTS `reservation` (
  `idReservation` int(11) NOT NULL AUTO_INCREMENT,
  `nbPersonnes` int(11) NOT NULL,
  `tableReserve` int(11) NOT NULL,
  `dateReserve` varchar(50) NOT NULL,
  `clientReserve` varchar(50) NOT NULL,
  PRIMARY KEY (`idReservation`),
  KEY `tableReserve` (`tableReserve`),
  KEY `client` (`clientReserve`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`idReservation`, `nbPersonnes`, `tableReserve`, `dateReserve`, `clientReserve`) VALUES
(5, 2, 1, '2023-03-15T21:31', 'PINEL'),
(8, 4, 2, '2023-04-04T19:55', 'GAYRAUD'),
(9, 2, 5, '2023-03-18T12:55', 'MOHAMDI'),
(10, 2, 10, '2023-03-08T12:05', 'BRIKI');

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

--
-- Déchargement des données de la table `salaries`
--

INSERT INTO `salaries` (`mailSalarie`, `nomSalarie`, `prenomSalarie`, `naissanceSalarie`, `telephoneSalarie`, `adresseSalarie`, `salaireSalarie`, `posteSalaire`) VALUES
('Aniss@gmail.com', 'BRIKI', 'Aniss', '2001-02-16', '0645362278', '21 Rue Marc Donadille', 1800, 'Serveur'),
('Cedric@gmail.com', 'GAYRAUD', 'Cedric', '2003-03-23', '0605784634', '21 Rue Marc Donadille', 2500, 'Responsable'),
('Fabien@gmail.com', 'PINEL', 'Fabien', '1998-08-10', '0693448912', '21 Rue Marc Donadille', 1800, 'Serveur'),
('Jabir@gmail.com', 'MOHAMDI', 'Jabir', '1998-08-11', '0634447632', '21 Rue Marc Donadille', 1800, 'Serveur');

-- --------------------------------------------------------

--
-- Structure de la table `salariesplanning`
--

DROP TABLE IF EXISTS `salariesplanning`;
CREATE TABLE IF NOT EXISTS `salariesplanning` (
  `cell_id` int(11) NOT NULL AUTO_INCREMENT,
  `statut` varchar(255) NOT NULL DEFAULT 'active',
  PRIMARY KEY (`cell_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `salariesplanning`
--

INSERT INTO `salariesplanning` (`cell_id`, `statut`) VALUES
(1, 'active'),
(2, 'active'),
(3, 'inactive'),
(4, 'inactive'),
(5, 'inactive'),
(6, 'inactive'),
(7, 'inactive'),
(8, 'inactive'),
(9, 'inactive'),
(10, 'inactive'),
(11, 'inactive'),
(12, 'inactive'),
(13, 'inactive'),
(14, 'inactive'),
(15, 'inactive'),
(16, 'inactive'),
(17, 'inactive'),
(18, 'inactive'),
(19, 'inactive'),
(20, 'inactive'),
(21, 'inactive'),
(22, 'inactive'),
(23, 'inactive'),
(24, 'inactive'),
(25, 'inactive'),
(26, 'inactive'),
(27, 'inactive'),
(28, 'inactive'),
(29, 'inactive'),
(30, 'inactive'),
(31, 'inactive'),
(32, 'inactive'),
(33, 'inactive'),
(34, 'inactive'),
(35, 'inactive'),
(36, 'inactive'),
(37, 'inactive'),
(38, 'inactive'),
(39, 'inactive'),
(40, 'inactive'),
(41, 'inactive'),
(42, 'inactive'),
(43, 'inactive'),
(44, 'inactive'),
(45, 'inactive'),
(46, 'inactive'),
(47, 'inactive'),
(48, 'inactive'),
(49, 'inactive'),
(50, 'inactive'),
(51, 'inactive'),
(52, 'inactive'),
(53, 'inactive'),
(54, 'inactive'),
(55, 'inactive'),
(56, 'inactive');

-- --------------------------------------------------------

--
-- Structure de la table `salles`
--

DROP TABLE IF EXISTS `salles`;
CREATE TABLE IF NOT EXISTS `salles` (
  `nomSalle` varchar(30) NOT NULL,
  `nombreCouvertTotal` int(20) NOT NULL,
  `salleRemplie` tinyint(1) NOT NULL,
  PRIMARY KEY (`nomSalle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `salles`
--

INSERT INTO `salles` (`nomSalle`, `nombreCouvertTotal`, `salleRemplie`) VALUES
('Salle1', 40, 0),
('Salle2', 40, 0),
('Terrasse', 70, 0);

-- --------------------------------------------------------

--
-- Structure de la table `statut`
--

DROP TABLE IF EXISTS `statut`;
CREATE TABLE IF NOT EXISTS `statut` (
  `nomStatut` varchar(20) NOT NULL,
  PRIMARY KEY (`nomStatut`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `statut`
--

INSERT INTO `statut` (`nomStatut`) VALUES
('Libre'),
('Occupée'),
('Réservée');

-- --------------------------------------------------------

--
-- Structure de la table `stocks`
--

DROP TABLE IF EXISTS `stocks`;
CREATE TABLE IF NOT EXISTS `stocks` (
  `quantiteIngredient` int(10) NOT NULL,
  `statut` varchar(20) NOT NULL,
  KEY `quantiteIngredient` (`quantiteIngredient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `tables`
--

DROP TABLE IF EXISTS `tables`;
CREATE TABLE IF NOT EXISTS `tables` (
  `numeroTable` int(10) NOT NULL,
  `placeTable` int(1) NOT NULL,
  `reservation` int(11) DEFAULT NULL,
  `salle` varchar(30) NOT NULL,
  `statutTable` varchar(20) NOT NULL DEFAULT 'Libre',
  PRIMARY KEY (`numeroTable`),
  KEY `reservation` (`reservation`),
  KEY `salle` (`salle`),
  KEY `statutTable` (`statutTable`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `tables`
--

INSERT INTO `tables` (`numeroTable`, `placeTable`, `reservation`, `salle`, `statutTable`) VALUES
(1, 2, 1, 'Salle1', 'Libre'),
(2, 4, NULL, 'Salle1', 'Occupée'),
(3, 8, NULL, 'Salle1', 'Libre'),
(4, 4, NULL, 'Salle1', 'Réservée'),
(5, 2, NULL, 'Salle1', 'Libre'),
(6, 4, NULL, 'Salle1', 'Occupée'),
(7, 2, NULL, 'Salle1', 'Réservée'),
(8, 8, NULL, 'Salle1', 'Libre'),
(9, 4, NULL, 'Salle1', 'Libre'),
(10, 2, NULL, 'Salle1', 'Réservée'),
(11, 8, NULL, 'Salle2', 'Libre'),
(12, 2, NULL, 'Salle2', 'Réservée'),
(13, 4, NULL, 'Salle2', 'Occupée'),
(14, 2, NULL, 'Salle2', 'Libre'),
(15, 4, NULL, 'Salle2', 'Libre'),
(16, 2, NULL, 'Salle2', 'Libre'),
(17, 4, NULL, 'Salle2', 'Libre'),
(18, 4, NULL, 'Salle2', 'Libre'),
(19, 2, NULL, 'Salle2', 'Occupée'),
(20, 8, NULL, 'Salle2', 'Libre'),
(21, 4, NULL, 'Terrasse', 'Libre'),
(22, 4, NULL, 'Terrasse', 'Réservée'),
(23, 2, NULL, 'Terrasse', 'Libre'),
(24, 8, NULL, 'Terrasse', 'Libre'),
(25, 4, NULL, 'Terrasse', 'Libre'),
(26, 4, NULL, 'Terrasse', 'Libre'),
(27, 8, NULL, 'Terrasse', 'Libre'),
(28, 4, NULL, 'Terrasse', 'Occupée'),
(29, 4, NULL, 'Terrasse', 'Occupée'),
(30, 4, NULL, 'Terrasse', 'Réservée'),
(31, 4, NULL, 'Terrasse', 'Libre'),
(32, 4, NULL, 'Terrasse', 'Réservée'),
(33, 4, NULL, 'Terrasse', 'Réservée'),
(34, 8, NULL, 'Terrasse', 'Libre'),
(35, 4, NULL, 'Terrasse', 'Libre');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commandesfournisseur`
--
ALTER TABLE `commandesfournisseur`
  ADD CONSTRAINT `commandesfournisseur_ibfk_1` FOREIGN KEY (`fournisseur`) REFERENCES `fournisseurs` (`nomFournisseur`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `commandestables`
--
ALTER TABLE `commandestables`
  ADD CONSTRAINT `commandestables_ibfk_1` FOREIGN KEY (`table`) REFERENCES `tables` (`numeroTable`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `contenircommandes`
--
ALTER TABLE `contenircommandes`
  ADD CONSTRAINT `contenircommandes_ibfk_1` FOREIGN KEY (`commande`) REFERENCES `commandestables` (`numeroCommande`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `contenircommandes_ibfk_2` FOREIGN KEY (`platCommande`) REFERENCES `plats` (`nomPlat`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `contenircommandesfournisseur`
--
ALTER TABLE `contenircommandesfournisseur`
  ADD CONSTRAINT `contenircommandesfournisseur_ibfk_1` FOREIGN KEY (`ingredient`) REFERENCES `ingredients` (`nomIngredient`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `contenircommandesfournisseur_ibfk_2` FOREIGN KEY (`nCommandeFournisseur`) REFERENCES `commandesfournisseur` (`idCommande`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `contenirmenu`
--
ALTER TABLE `contenirmenu`
  ADD CONSTRAINT `contenirmenu_ibfk_1` FOREIGN KEY (`menu`) REFERENCES `menus` (`typeMenu`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `contenirmenu_ibfk_2` FOREIGN KEY (`platMenu`) REFERENCES `plats` (`nomPlat`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `contenirplat`
--
ALTER TABLE `contenirplat`
  ADD CONSTRAINT `contenirplat_ibfk_1` FOREIGN KEY (`plat`) REFERENCES `plats` (`nomPlat`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `contenirplat_ibfk_2` FOREIGN KEY (`ingredient`) REFERENCES `ingredients` (`nomIngredient`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `ingredients`
--
ALTER TABLE `ingredients`
  ADD CONSTRAINT `ingredients_ibfk_4` FOREIGN KEY (`fournisseur`) REFERENCES `fournisseurs` (`nomFournisseur`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `ingredients_ibfk_5` FOREIGN KEY (`categorieIngredient`) REFERENCES `categoriestock` (`nom`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `plats`
--
ALTER TABLE `plats`
  ADD CONSTRAINT `plats_ibfk_2` FOREIGN KEY (`categorie`) REFERENCES `categories` (`nom`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`clientReserve`) REFERENCES `clients` (`nomClient`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `stocks`
--
ALTER TABLE `stocks`
  ADD CONSTRAINT `stocks_ibfk_1` FOREIGN KEY (`quantiteIngredient`) REFERENCES `ingredients` (`stock`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `tables`
--
ALTER TABLE `tables`
  ADD CONSTRAINT `tables_ibfk_2` FOREIGN KEY (`salle`) REFERENCES `salles` (`nomSalle`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `tables_ibfk_3` FOREIGN KEY (`statutTable`) REFERENCES `statut` (`nomStatut`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
