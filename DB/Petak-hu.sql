-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Ápr 17. 10:03
-- Kiszolgáló verziója: 10.4.6-MariaDB
-- PHP verzió: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `kozigi_petak`
--
CREATE DATABASE IF NOT EXISTS `kozigi_petak` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `kozigi_petak`;

-- --------------------------------------------------------

--
-- A nézet helyettes szerkezete `auctionbidders`
-- (Lásd alább az aktuális nézetet)
--
CREATE TABLE `auctionbidders` (
`auctionID` int(11)
,`ID` int(11)
,`userID` int(11)
,`price` int(11)
,`date` datetime
,`username` varchar(64)
);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `auctions`
--

CREATE TABLE `auctions` (
  `ID` int(11) NOT NULL,
  `coinID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `title` varchar(128) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `minBid` int(11) NOT NULL,
  `description` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `expiration` date NOT NULL,
  `notified` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bidders`
--

CREATE TABLE `bidders` (
  `ID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `auctionID` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `coins`
--

CREATE TABLE `coins` (
  `ID` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `worth` int(11) NOT NULL,
  `description` text COLLATE utf8_hungarian_ci NOT NULL,
  `userID` int(11) NOT NULL,
  `headfile` text COLLATE utf8_hungarian_ci NOT NULL,
  `tailfile` text COLLATE utf8_hungarian_ci NOT NULL,
  `uploadDate` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cointags`
--

CREATE TABLE `cointags` (
  `ID` int(11) NOT NULL,
  `coinID` int(11) NOT NULL,
  `nameID` int(11) NOT NULL,
  `descID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `comments`
--

CREATE TABLE `comments` (
  `ID` int(11) NOT NULL,
  `postID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `message` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `moderations`
--

CREATE TABLE `moderations` (
  `ID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `banTime` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- A nézet helyettes szerkezete `postcomments`
-- (Lásd alább az aktuális nézetet)
--
CREATE TABLE `postcomments` (
`postID` int(11)
,`userID` int(11)
,`ID` int(11)
,`message` varchar(255)
,`date` date
,`username` varchar(64)
);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `posts`
--

CREATE TABLE `posts` (
  `ID` int(11) NOT NULL,
  `topicID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `imagefile` text COLLATE utf8_hungarian_ci DEFAULT NULL,
  `title` varchar(128) COLLATE utf8_hungarian_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `isClosed` tinyint(1) NOT NULL DEFAULT 0,
  `isDeleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tagcategories`
--

CREATE TABLE `tagcategories` (
  `ID` int(11) NOT NULL,
  `name` varchar(128) COLLATE utf8_hungarian_ci NOT NULL,
  `color` varchar(7) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `tagcategories`
--

INSERT INTO `tagcategories` (`ID`, `name`, `color`) VALUES
(1, 'Uralkodó', '#77a4ed'),
(2, 'Anyag', '#ed774c'),
(3, 'Dinasztia', '#44cacf'),
(4, 'Birodalom', '#ab0510'),
(5, 'Ország', '#ab0510'),
(6, 'Verés éve', '#756bff'),
(7, 'Állapot', '#faf575'),
(8, 'Patina mennyiség', '#fac375');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tagdescriptions`
--

CREATE TABLE `tagdescriptions` (
  `ID` int(11) NOT NULL,
  `description` text COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- A nézet helyettes szerkezete `tags`
-- (Lásd alább az aktuális nézetet)
--
CREATE TABLE `tags` (
`ID` int(11)
,`coinID` int(11)
,`name` varchar(128)
,`description` text
,`color` varchar(7)
);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `topics`
--

CREATE TABLE `topics` (
  `ID` int(11) NOT NULL,
  `name` text COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `topics`
--

INSERT INTO `topics` (`ID`, `name`) VALUES
(1, 'Érmeazonosító'),
(2, 'Értékbecslés'),
(3, 'Egyéb');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `imagefile` text COLLATE utf8_hungarian_ci DEFAULT NULL,
  `name` varchar(64) COLLATE utf8_hungarian_ci NOT NULL,
  `fullname` varchar(128) COLLATE utf8_hungarian_ci NOT NULL,
  `email` varchar(128) COLLATE utf8_hungarian_ci NOT NULL,
  `phone` varchar(13) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `address` text COLLATE utf8_hungarian_ci DEFAULT NULL,
  `passwd` varchar(64) COLLATE utf8_hungarian_ci NOT NULL,
  `permission` int(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`ID`, `imagefile`, `name`, `fullname`, `email`, `phone`, `address`, `passwd`, `permission`) VALUES
(1, NULL, 'admin', 'Peták.hu Admin', 'admin@petak.hu', NULL, NULL, 'ec004ef0da5bde09ed611533bdd9ccaf041514be632814ba1303f6725eedff7b', 2);

-- --------------------------------------------------------

--
-- Nézet szerkezete `auctionbidders`
--
DROP TABLE IF EXISTS `auctionbidders`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `auctionbidders`  AS  select `auctions`.`ID` AS `auctionID`,`bidders`.`ID` AS `ID`,`bidders`.`userID` AS `userID`,`bidders`.`amount` AS `price`,`bidders`.`date` AS `date`,`users`.`name` AS `username` from ((`bidders` join `users` on(`users`.`ID` = `bidders`.`userID`)) join `auctions` on(`auctions`.`ID` = `bidders`.`auctionID`)) ;

-- --------------------------------------------------------

--
-- Nézet szerkezete `postcomments`
--
DROP TABLE IF EXISTS `postcomments`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `postcomments`  AS  select `comments`.`postID` AS `postID`,`comments`.`userID` AS `userID`,`comments`.`ID` AS `ID`,`comments`.`message` AS `message`,`comments`.`date` AS `date`,`users`.`name` AS `username` from ((`posts` join `comments` on(`comments`.`postID` = `posts`.`ID`)) join `users` on(`users`.`ID` = `comments`.`userID`)) ;

-- --------------------------------------------------------

--
-- Nézet szerkezete `tags`
--
DROP TABLE IF EXISTS `tags`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `tags`  AS  select `cointags`.`ID` AS `ID`,`cointags`.`coinID` AS `coinID`,`tagcategories`.`name` AS `name`,`tagdescriptions`.`description` AS `description`,`tagcategories`.`color` AS `color` from ((`cointags` join `tagdescriptions` on(`cointags`.`descID` = `tagdescriptions`.`ID`)) join `tagcategories` on(`cointags`.`nameID` = `tagcategories`.`ID`)) ;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `auctions`
--
ALTER TABLE `auctions`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `coinID` (`coinID`),
  ADD KEY `userID` (`userID`);

--
-- A tábla indexei `bidders`
--
ALTER TABLE `bidders`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `auctionID` (`auctionID`);

--
-- A tábla indexei `coins`
--
ALTER TABLE `coins`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `userID` (`userID`);

--
-- A tábla indexei `cointags`
--
ALTER TABLE `cointags`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `coinID` (`coinID`),
  ADD KEY `nameID` (`nameID`),
  ADD KEY `descID` (`descID`);

--
-- A tábla indexei `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `postID` (`postID`),
  ADD KEY `userID` (`userID`);

--
-- A tábla indexei `moderations`
--
ALTER TABLE `moderations`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `userID` (`userID`);

--
-- A tábla indexei `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `topicID` (`topicID`),
  ADD KEY `userID` (`userID`);

--
-- A tábla indexei `tagcategories`
--
ALTER TABLE `tagcategories`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `tagdescriptions`
--
ALTER TABLE `tagdescriptions`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `auctions`
--
ALTER TABLE `auctions`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `bidders`
--
ALTER TABLE `bidders`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `coins`
--
ALTER TABLE `coins`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `cointags`
--
ALTER TABLE `cointags`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `comments`
--
ALTER TABLE `comments`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `moderations`
--
ALTER TABLE `moderations`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `posts`
--
ALTER TABLE `posts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `tagcategories`
--
ALTER TABLE `tagcategories`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `tagdescriptions`
--
ALTER TABLE `tagdescriptions`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `topics`
--
ALTER TABLE `topics`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `auctions`
--
ALTER TABLE `auctions`
  ADD CONSTRAINT `auctions_ibfk_1` FOREIGN KEY (`coinID`) REFERENCES `coins` (`ID`),
  ADD CONSTRAINT `auctions_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`);

--
-- Megkötések a táblához `bidders`
--
ALTER TABLE `bidders`
  ADD CONSTRAINT `bidders_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`),
  ADD CONSTRAINT `bidders_ibfk_2` FOREIGN KEY (`auctionID`) REFERENCES `auctions` (`ID`);

--
-- Megkötések a táblához `coins`
--
ALTER TABLE `coins`
  ADD CONSTRAINT `coins_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`);

--
-- Megkötések a táblához `cointags`
--
ALTER TABLE `cointags`
  ADD CONSTRAINT `cointags_ibfk_1` FOREIGN KEY (`coinID`) REFERENCES `coins` (`ID`),
  ADD CONSTRAINT `cointags_ibfk_2` FOREIGN KEY (`nameID`) REFERENCES `tagcategories` (`ID`),
  ADD CONSTRAINT `cointags_ibfk_3` FOREIGN KEY (`descID`) REFERENCES `tagdescriptions` (`ID`);

--
-- Megkötések a táblához `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`postID`) REFERENCES `posts` (`ID`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`);

--
-- Megkötések a táblához `moderations`
--
ALTER TABLE `moderations`
  ADD CONSTRAINT `moderations_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`);

--
-- Megkötések a táblához `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`topicID`) REFERENCES `topics` (`ID`),
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
