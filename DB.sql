-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : sam. 05 avr. 2025 à 22:34
-- Version du serveur : 5.7.24
-- Version de PHP : 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `fight_club_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `aptitude`
--

CREATE TABLE `aptitude` (
  `Id` int(11) NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `aptitude`
--

INSERT INTO `aptitude` (`Id`, `nom`) VALUES
(1, 'Coup de poing droit'),
(2, 'Coup de poing gauche'),
(3, 'Coup de pied droit'),
(4, 'Coup de pied gauche'),
(5, 'Balayette'),
(6, 'Takedown'),
(7, 'Coup de tête');

-- --------------------------------------------------------

--
-- Structure de la table `combat`
--

CREATE TABLE `combat` (
  `Id` int(11) NOT NULL,
  `id_combattant_1` int(11) DEFAULT NULL,
  `id_combattant_2` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `combat`
--

INSERT INTO `combat` (`Id`, `id_combattant_1`, `id_combattant_2`) VALUES
(1, 1, 2),
(2, 3, 4),
(3, 5, 6),
(4, 7, 8),
(5, 9, 10),
(6, 11, 1);

-- --------------------------------------------------------

--
-- Structure de la table `combattant`
--

CREATE TABLE `combattant` (
  `Id` int(11) NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `force` int(11) DEFAULT NULL,
  `sante` int(11) DEFAULT NULL,
  `niveau` int(11) DEFAULT NULL,
  `id_style` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `combattant`
--

INSERT INTO `combattant` (`Id`, `nom`, `force`, `sante`, `niveau`, `id_style`) VALUES
(1, 'Zarek', 92, 110, 14, 1),
(2, 'Nashira', 80, 105, 11, 2),
(3, 'Kieran', 88, 120, 15, 3),
(4, 'Elara', 76, 98, 12, 4),
(5, 'Tiberius', 69, 85, 10, 5),
(6, 'Aurelia', 97, 130, 16, 6),
(7, 'Nikolai', 82, 115, 13, 7),
(8, 'Isolde', 65, 90, 8, 8),
(9, 'Leif', 72, 100, 9, 1),
(10, 'Vera', 85, 125, 17, 2),
(11, 'Xander', 93, 120, 16, 3);

-- --------------------------------------------------------

--
-- Structure de la table `combattant_aptitude`
--

CREATE TABLE `combattant_aptitude` (
  `id_combattant` int(11) NOT NULL,
  `id_aptitude` int(11) NOT NULL,
  `note` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `combattant_aptitude`
--

INSERT INTO `combattant_aptitude` (`id_combattant`, `id_aptitude`, `note`) VALUES
(1, 1, 9),
(1, 2, 8),
(1, 3, 7),
(1, 4, 9),
(1, 5, 6),
(1, 6, 7),
(1, 7, 8),
(2, 1, 7),
(2, 2, 8),
(2, 3, 6),
(2, 4, 9),
(2, 5, 7),
(2, 6, 6),
(2, 7, 5),
(3, 1, 8),
(3, 2, 9),
(3, 3, 8),
(3, 4, 7),
(3, 5, 9),
(3, 6, 8),
(3, 7, 6),
(4, 1, 6),
(4, 2, 7),
(4, 3, 6),
(4, 4, 9),
(4, 5, 8),
(4, 6, 7),
(4, 7, 8),
(5, 1, 7),
(5, 2, 6),
(5, 3, 9),
(5, 4, 7),
(5, 5, 6),
(5, 6, 8),
(5, 7, 7),
(6, 1, 10),
(6, 2, 9),
(6, 3, 8),
(6, 4, 6),
(6, 5, 7),
(6, 6, 9),
(6, 7, 7),
(7, 1, 8),
(7, 2, 7),
(7, 3, 8),
(7, 4, 6),
(7, 5, 9),
(7, 6, 7),
(7, 7, 9),
(8, 1, 6),
(8, 2, 7),
(8, 3, 8),
(8, 4, 7),
(8, 5, 6),
(8, 6, 9),
(8, 7, 5),
(9, 1, 9),
(9, 2, 6),
(9, 3, 7),
(9, 4, 8),
(9, 5, 9),
(9, 6, 6),
(9, 7, 7),
(10, 1, 8),
(10, 2, 9),
(10, 3, 6),
(10, 4, 7),
(10, 5, 9),
(10, 6, 8),
(10, 7, 6);

-- --------------------------------------------------------

--
-- Structure de la table `resultat`
--

CREATE TABLE `resultat` (
  `id_combat` int(11) NOT NULL,
  `gagnant` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `resultat`
--

INSERT INTO `resultat` (`id_combat`, `gagnant`) VALUES
(1, 1),
(2, 3);

-- --------------------------------------------------------

--
-- Structure de la table `round`
--

CREATE TABLE `round` (
  `Id` int(11) NOT NULL,
  `id_combat` int(11) DEFAULT NULL,
  `id_aptitude` int(11) DEFAULT NULL,
  `id_combattant` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `round`
--

INSERT INTO `round` (`Id`, `id_combat`, `id_aptitude`, `id_combattant`) VALUES
(1, 1, 1, 1),
(2, 1, 1, 2),
(3, 1, 3, 1),
(4, 1, 3, 2),
(5, 2, 1, 3),
(6, 2, 1, 4),
(7, 2, 4, 3),
(8, 2, 4, 4);

-- --------------------------------------------------------

--
-- Structure de la table `style`
--

CREATE TABLE `style` (
  `Id` int(11) NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `style`
--

INSERT INTO `style` (`Id`, `nom`) VALUES
(1, 'Boxe thai'),
(2, 'Boxe anglaise'),
(3, 'Judo'),
(4, 'Capoeira'),
(5, 'Krav Maga'),
(6, 'Takwendo'),
(7, 'JJB'),
(8, 'Karaté');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
