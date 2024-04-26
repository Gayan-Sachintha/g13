-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 21, 2024 at 12:20 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `admin`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `ProductID` int NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL,
  `Category` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `Imagepath` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `Price` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ProductID`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductID`, `ProductName`, `description`, `Category`, `Imagepath`, `Price`) VALUES
(35, 'ECO-WORTHY Solar Panel 25W 12V Monocrystalline Waterproof Panel for Charging 12V Battery of RV Boat', 'About this item 【100Wh Output】25W Monocrystalline solar cell can generate 100Wh per day (under 4 hours full sunshine). Perfect for 12v battery charging or maintaining. Can be used in RV/car/boat/trailer battery,back-up power,gate opener,led lights and other scenes 【Portable Size】The dimensions of panel is 16.5x12.6x0.7 inches, the length of extension cable is 39.3 inches. The extension cable is long enough for you to connect the charge controller or 12V load. And you can carry the compact 25W solar panel with you easily 【Product Details】Waterproof Junction Box, corrosion-resistant aluminum frame for extended outdoor use, allowing the solar panel to last for decades as well as withstand high winds (2400Pa) and snow loads (5400Pa) 【Easy Installation】Pre-drilled holes on the back of the panel for fast mounting and securing', 'Solar', 'public\\uploads\\Imagepath-1710645380601.PNG', '3500');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `contact` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
