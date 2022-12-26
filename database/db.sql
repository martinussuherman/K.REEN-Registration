-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.5.8-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for kreen_registration
CREATE DATABASE IF NOT EXISTS `kreen_registration` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `kreen_registration`;

-- Dumping structure for table kreen_registration.dataaffiliate
CREATE TABLE IF NOT EXISTS `dataaffiliate` (
  `Id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `Nama` tinytext NOT NULL DEFAULT '',
  `KodeReferral` tinytext NOT NULL DEFAULT '',
  `Approved` tinyint(3) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kreen_registration.datakontak
CREATE TABLE IF NOT EXISTS `datakontak` (
  `Id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `Nama` tinytext NOT NULL DEFAULT '',
  `Email` tinytext NOT NULL DEFAULT '',
  `NomorHP` tinytext NOT NULL DEFAULT '',
  `TanggalLahir` date NOT NULL DEFAULT '1900-01-01',
  `JenisKelamin` char(1) NOT NULL DEFAULT '',
  `Alamat` text NOT NULL DEFAULT '',
  `KodeKabupatenKota` smallint(5) unsigned NOT NULL DEFAULT 0,
  `KodePos` varchar(5) NOT NULL DEFAULT '',
  PRIMARY KEY (`Id`),
  KEY `FK_datakontak_kabupatenkota` (`KodeKabupatenKota`),
  CONSTRAINT `FK_datakontak_kabupatenkota` FOREIGN KEY (`KodeKabupatenKota`) REFERENCES `kabupatenkota` (`Kode`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kreen_registration.kabupatenkota
CREATE TABLE IF NOT EXISTS `kabupatenkota` (
  `Kode` smallint(5) unsigned NOT NULL DEFAULT 0,
  `Nama` tinytext NOT NULL DEFAULT '',
  `KodeProvinsi` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`Kode`),
  KEY `FK_kabupaten_kota_provinsi` (`KodeProvinsi`),
  CONSTRAINT `FK_kabupaten_kota_provinsi` FOREIGN KEY (`KodeProvinsi`) REFERENCES `provinsi` (`Kode`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kreen_registration.kirimwamintaalamat
CREATE TABLE IF NOT EXISTS `kirimwamintaalamat` (
  `Id` mediumint(8) unsigned NOT NULL DEFAULT 0,
  `WaSent` tinyint(4) unsigned NOT NULL DEFAULT 0,
  KEY `FK_kirimwamintaalamat_datakontak` (`Id`),
  CONSTRAINT `FK_kirimwamintaalamat_datakontak` FOREIGN KEY (`Id`) REFERENCES `datakontak` (`Id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kreen_registration.provinsi
CREATE TABLE IF NOT EXISTS `provinsi` (
  `Kode` tinyint(3) unsigned NOT NULL DEFAULT 0,
  `Nama` tinytext NOT NULL DEFAULT '',
  PRIMARY KEY (`Kode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
