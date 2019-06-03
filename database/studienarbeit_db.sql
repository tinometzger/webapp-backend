-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 03. Jun 2019 um 17:19
-- Server-Version: 10.1.38-MariaDB
-- PHP-Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `studienarbeit_db`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `studienarbeit`
--

CREATE TABLE `studienarbeit` (
  `id` int(11) NOT NULL,
  `betreuerID` int(11) NOT NULL,
  `bezeichnung` varchar(100) NOT NULL,
  `beschreibung` varchar(5000) NOT NULL,
  `anzahlStudierende` int(11) NOT NULL,
  `aufwandBetreuer` float NOT NULL,
  `aufwandStudierende` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `studienarbeit`
--

INSERT INTO `studienarbeit` (`id`, `betreuerID`, `bezeichnung`, `beschreibung`, `anzahlStudierende`, `aufwandBetreuer`, `aufwandStudierende`) VALUES
(1, 0, 'Studienarbeit 1', 'TEST 1111111', 1, 0, 0),
(3, 0, 'Studienarbeit 2', 'TEST 22222222', 2, 0, 0),
(4, 1, 'Algorithmusentwicklung', 'Es sollen folgende Algorithmen entworfen werden..', 1, 0, 0),
(14, 1, 'Implementierung einer Webapp', 'Es soll eine Webapp implementiert werden', 1, 0, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `studienarbeit_betreuer_studierende`
--

CREATE TABLE `studienarbeit_betreuer_studierende` (
  `id` int(11) NOT NULL,
  `studienarbeitID` int(11) NOT NULL,
  `studierendeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `studienarbeit_betreuer_studierende`
--

INSERT INTO `studienarbeit_betreuer_studierende` (`id`, `studienarbeitID`, `studierendeID`) VALUES
(1, 1, 2),
(2, 2, 0),
(8, 14, 3);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `termin`
--

CREATE TABLE `termin` (
  `id` int(11) NOT NULL,
  `typeID` int(11) NOT NULL,
  `zeitpunkt` datetime NOT NULL,
  `notizen` varchar(3000) NOT NULL,
  `aufwand` int(11) NOT NULL,
  `studienarbeitsID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `termin`
--

INSERT INTO `termin` (`id`, `typeID`, `zeitpunkt`, `notizen`, `aufwand`, `studienarbeitsID`) VALUES
(4, 3, '2019-06-27 08:19:00', '', 0, 4),
(7, 1, '2019-05-10 14:20:55', 'uebung02.pdf', 0, 14),
(8, 2, '2019-05-31 21:41:00', '', 0, 14),
(9, 4, '2019-06-13 12:55:00', '', 0, 14),
(10, 2, '2019-06-13 00:00:00', '', 0, 4);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `termintype`
--

CREATE TABLE `termintype` (
  `id` int(11) NOT NULL,
  `bezeichnung` varchar(50) NOT NULL,
  `ort` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `termintype`
--

INSERT INTO `termintype` (`id`, `bezeichnung`, `ort`) VALUES
(1, 'Treffen', 'Definierter Ort'),
(2, 'Online-Call', 'Definierte Software'),
(3, 'Meilenstein', ''),
(4, 'Aufgabe', '');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `wiki-eintrag`
--

CREATE TABLE `wiki-eintrag` (
  `id` int(11) NOT NULL,
  `autor` int(11) NOT NULL,
  `titel` varchar(50) NOT NULL,
  `inhalt` varchar(3000) NOT NULL,
  `datum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `studienarbeit`
--
ALTER TABLE `studienarbeit`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `studienarbeit_betreuer_studierende`
--
ALTER TABLE `studienarbeit_betreuer_studierende`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `termin`
--
ALTER TABLE `termin`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `termintype`
--
ALTER TABLE `termintype`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `wiki-eintrag`
--
ALTER TABLE `wiki-eintrag`
  ADD PRIMARY KEY (`id`),
  ADD KEY `autor` (`autor`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `studienarbeit`
--
ALTER TABLE `studienarbeit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT für Tabelle `studienarbeit_betreuer_studierende`
--
ALTER TABLE `studienarbeit_betreuer_studierende`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT für Tabelle `termin`
--
ALTER TABLE `termin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2001;

--
-- AUTO_INCREMENT für Tabelle `termintype`
--
ALTER TABLE `termintype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `wiki-eintrag`
--
ALTER TABLE `wiki-eintrag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
