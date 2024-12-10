-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para bdusers
CREATE DATABASE IF NOT EXISTS `bdusers` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `bdusers`;

-- Copiando estrutura para tabela bdusers.calendario
CREATE TABLE IF NOT EXISTS `calendario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `curso` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela bdusers.calendario: ~2 rows (aproximadamente)
INSERT INTO `calendario` (`id`, `title`, `date`, `color`, `description`, `curso`) VALUES
	(32, 'Ano Novo', '2024-12-31', '#005799', 'Virada do Ano', 'Sistema da Informação'),
	(56, 'Entrega de Web', '2024-12-11', '#000000', 'Entregar o Trabalho de Programação Web', 'Ciência da Computação');

-- Copiando estrutura para tabela bdusers.cursos
CREATE TABLE IF NOT EXISTS `cursos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sigla` varchar(255) NOT NULL,
  `codigo` varchar(255) NOT NULL,
  `curso` varchar(50) DEFAULT NULL,
  `coordenador` varchar(50) DEFAULT 'Farinhas',
  PRIMARY KEY (`id`),
  KEY `curso` (`curso`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela bdusers.cursos: ~3 rows (aproximadamente)
INSERT INTO `cursos` (`id`, `sigla`, `codigo`, `curso`, `coordenador`) VALUES
	(1, 'CCO', '001', 'Ciência da Computação', 'Rafael Frinhani'),
	(2, 'SIN', '002', 'Sistema da Informação', 'Phyllipe de Souza Lima'),
	(3, 'MAT', '003', 'Matemática Bacharelado', 'Fernando Pereira Micena');

-- Copiando estrutura para tabela bdusers.turmas
CREATE TABLE IF NOT EXISTS `turmas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `sigla` varchar(255) NOT NULL,
  `participantes` varchar(50) DEFAULT NULL,
  `professor` varchar(50) DEFAULT NULL,
  `vagas` int(11) DEFAULT NULL,
  `ano` int(11) DEFAULT NULL,
  `horarios` longtext DEFAULT NULL,
  `periodo` int(11) DEFAULT NULL,
  `cargaHoraria` int(11) DEFAULT NULL,
  `curso` varchar(50) DEFAULT NULL,
  `solicitacoes` longtext DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela bdusers.turmas: ~8 rows (aproximadamente)
INSERT INTO `turmas` (`id`, `nome`, `sigla`, `participantes`, `professor`, `vagas`, `ano`, `horarios`, `periodo`, `cargaHoraria`, `curso`, `solicitacoes`) VALUES
	(40, 'Inteligência Artificial', 'CMC01', '', 'Isabella Drumond', 60, 2024, 'Terça-Feira  13:30 - 15:20,Quinta-Feira  13:30 - 15:20,', 5, 64, 'Ciência da Computação', ''),
	(41, 'Cálculo A', 'MAT00A', '', 'Juan Valentin', 110, 2024, 'Segunda-Feira  7:55 - 12:00,', 1, 64, 'Matemática Bacharelado', ''),
	(42, 'Sistemas Operacionais', 'SRC02', '', 'Carlos Minoru', 60, 2024, 'Quarta-Feira  13:30 - 15:20,Quinta-Feira  15:45 - 17:35,', 3, 64, 'Sistema da Informação', ''),
	(43, 'Banco de Dados I', 'SPAD01', '', 'Melise Vieira', 70, 2024, 'Segunda-Feira  15:45 - 17:35,Quarta-Feira  7:55 - 9:45,', 5, 64, 'Sistema da Informação', ''),
	(44, 'Desenvolvimento de Jogos', 'SDES01', '', 'Phyllipe Lima', 30, 2024, 'Quinta-Feira  19:00 - 20:40,Terça-Feira  21:00 - 22:40,', 0, 64, 'Sistema da Informação', ''),
	(45, 'Economia da Informação', 'SECO01', '', 'José Arnaldo', 40, 2024, 'Quinta-Feira  13:30 - 15:20,', 0, 32, 'Sistema da Informação', ''),
	(46, 'Sistemas Embarcados', 'CRSC02', '', 'Luiz Olmes', 1, 2024, 'Quarta-Feira  7:55 - 12:00,', 3, 64, 'Sistema da Informação', ''),
	(47, 'Programação Lógica Funcional', 'PRSC03', '', 'Isabela Neves', 60, 2024, 'Segunda-Feira  13:30 - 15:20,Sexta-Feira  13:30 - 15:20,', 2, 64, 'Sistema da Informação', '');

-- Copiando estrutura para tabela bdusers.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` int(11) DEFAULT 0,
  `matricula` varchar(50) DEFAULT NULL,
  `type` int(11) DEFAULT 0,
  `curso` varchar(50) NOT NULL DEFAULT 'Sistema da Informação',
  `solicitacoes` longtext DEFAULT NULL,
  `reset_token` varchar(128) DEFAULT NULL,
  `reset_token_expires` timestamp NULL DEFAULT NULL,
  `turmas` longtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `matricula` (`matricula`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela bdusers.users: ~3 rows (aproximadamente)
INSERT INTO `users` (`id`, `name`, `senha`, `email`, `status`, `matricula`, `type`, `curso`, `solicitacoes`, `reset_token`, `reset_token_expires`, `turmas`) VALUES
	(5, 'Phyllipe de Souza Lima', 'Senha123@', 'coordsin@gmail.com', 1, '2009001', 1, 'Sistema da Informação', '', NULL, NULL, NULL),
	(6, 'Rafael Frinhani', 'Senha123@', 'coordcco@gmail.com', 1, '1998001', 1, 'Ciência da Computação', '', NULL, NULL, NULL),
	(10, 'Fernando Pereira Micena', 'Senha123@', 'coordmat@gmail.com', 1, '2009002', 1, 'Matemática Bacharelado', '', NULL, NULL, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
