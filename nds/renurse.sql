-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 21, 2019 at 04:46 PM
-- Server version: 5.6.34-log
-- PHP Version: 7.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `renurse`
--

-- --------------------------------------------------------

--
-- Table structure for table `cfg`
--

CREATE TABLE `cfg` (
  `id` int(11) NOT NULL,
  `Name` text NOT NULL,
  `adminemail` text NOT NULL,
  `version` text NOT NULL,
  `maintenance` int(11) NOT NULL,
  `extra` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `type` text NOT NULL,
  `togroup` int(11) NOT NULL,
  `urlloc` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `name`, `type`, `togroup`, `urlloc`, `date`) VALUES
(2, 'FileZilla.xml', 'xml', 1, 'FileZilla.xml', '2019-02-21 16:27:33');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `wysig` text NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `wysig`, `active`, `date`) VALUES
(1, 'ewrw', '<p>werw</p>', 1, '2019-02-21 07:23:43');

-- --------------------------------------------------------

--
-- Table structure for table `logos`
--

CREATE TABLE `logos` (
  `id` int(11) NOT NULL,
  `filename` text NOT NULL,
  `inorder` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `logos`
--

INSERT INTO `logos` (`id`, `filename`, `inorder`) VALUES
(1, 'a3f1cf12b65133bc.jpg', ''),
(2, 'a1a45cf25210e3c9.png', ''),
(3, '7b947366d5015c8c.png', ''),
(4, '4de35593ed424db7.jpg', ''),
(5, 'ea05315678548efd.png', ''),
(6, 'a39cf9a074484ffd.png', '');

-- --------------------------------------------------------

--
-- Table structure for table `publications`
--

CREATE TABLE `publications` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  `coverurl` text NOT NULL,
  `wysig` text NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `publications`
--

INSERT INTO `publications` (`id`, `name`, `active`, `coverurl`, `wysig`, `date`) VALUES
(13, 'Nieuw', 1, '40269a4eeb92d9e0.jpg', '<p>Hier kunnen we balasdasd</p><p>asd<a title=\"sdfwerw\" href=\"http:// www.google.nl\"> www.google.nl</a></p><p>as</p>', '2019-02-11 18:33:57'),
(14, 'qweq', 1, '', '<p>qwewq</p>', '2019-02-21 08:23:38');

-- --------------------------------------------------------

--
-- Table structure for table `research`
--

CREATE TABLE `research` (
  `id` int(11) NOT NULL,
  `uname` text NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  `coverurl` text NOT NULL,
  `wysig` text NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `research`
--

INSERT INTO `research` (`id`, `uname`, `active`, `coverurl`, `wysig`, `date`) VALUES
(10, 'hallo nieuw', 1, '73acc9e3e734a495.jpg', '<p>geweldig\'s</p>', '2019-02-11 18:33:32'),
(11, 'werw', 1, '', '<p>werwr</p>', '2019-02-21 08:23:01');

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `wysig` text NOT NULL,
  `position` int(11) NOT NULL,
  `lastedit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uname` text NOT NULL,
  `lastname` text NOT NULL,
  `email` text NOT NULL,
  `pwd` text NOT NULL,
  `secret` text NOT NULL,
  `type` int(11) NOT NULL DEFAULT '1',
  `active` int(11) NOT NULL DEFAULT '1',
  `lastlogin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uname`, `lastname`, `email`, `pwd`, `secret`, `type`, `active`, `lastlogin`) VALUES
(8, 'test342', 'test', 'checksome@checksome.nl', 'ru5m6qp3', 'jQABO5u5Rxi2CvL5', 1, 1, '2019-01-30 10:35:35'),
(9, 'werew', 'werw', 'admin', 'admin', 'SM9WwlXIsQNgnfmG', 2, 0, '2019-01-30 16:47:22'),
(10, 'werwer', 'werewrwerw', 'OKOKOK', 'v7voka7m', '2ewuecqnjKCPvYT9', 1, 1, '2019-01-30 17:27:45'),
(11, 'eew', 'werwe', 'wer', 'jly4yvb7', 'OSVVJHPHDK8HFmhM', 1, 1, '2019-01-30 17:31:54'),
(12, 'nieuwww', 'asda', 'DEZE', 'zczvwijn', '40CVbsaYHHzTn8IB', 1, 1, '2019-02-08 21:22:38'),
(13, 'werw', 'ewrw', 'werw', 'ucdfwf7d', 'JaRbIEUV3mMzgEtM', 1, 1, '2019-02-11 16:34:34'),
(14, 'testtest', 'testtest', 'testtest', 'testtest', 'gP97VyYjlLKjHqkk', 1, 1, '2019-02-21 14:14:14');

-- --------------------------------------------------------

--
-- Table structure for table `users_to_groups`
--

CREATE TABLE `users_to_groups` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `groupsid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users_to_groups`
--

INSERT INTO `users_to_groups` (`id`, `userid`, `groupsid`) VALUES
(2, 8, 0),
(3, 9, 0),
(4, 9, 0),
(14, 14, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cfg`
--
ALTER TABLE `cfg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logos`
--
ALTER TABLE `logos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `publications`
--
ALTER TABLE `publications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `research`
--
ALTER TABLE `research`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_to_groups`
--
ALTER TABLE `users_to_groups`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cfg`
--
ALTER TABLE `cfg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `logos`
--
ALTER TABLE `logos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `publications`
--
ALTER TABLE `publications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `research`
--
ALTER TABLE `research`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `users_to_groups`
--
ALTER TABLE `users_to_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
