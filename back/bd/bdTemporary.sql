-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 09/12/2024 às 02:35
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bdusers`
--
CREATE DATABASE IF NOT EXISTS `bdusers` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bdusers`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `calendario`
--

CREATE TABLE `calendario` (
  `id` int(11) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `curso` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `calendario`
--

INSERT INTO `calendario` (`id`, `title`, `date`, `color`, `description`, `curso`) VALUES
(28, 'Natal', '2024-12-25', '#f72222', 'Meery Chritsmas', 'Ciência da Computação'),
(29, 'Substitutiva de Grafos', '2024-12-26', '#0c6a92', 'Dia do abalo', 'Ciência da Computação'),
(30, 'Entrega de Web', '2024-12-18', '#a27676', 'Entregar o Trabalho de Programação Web', 'Ciência da Computação'),
(31, 'Dia D', '2024-12-12', '#000000', 'O \"D\" do \"dia D\" é de \"Drama\", ou seja, \"Dia do Drama\"', 'Ciência da Computação');

-- --------------------------------------------------------

--
-- Estrutura para tabela `cursos`
--

CREATE TABLE `cursos` (
  `id` int(11) NOT NULL,
  `sigla` varchar(255) NOT NULL,
  `codigo` varchar(255) NOT NULL,
  `curso` varchar(50) DEFAULT NULL,
  `coordenador` varchar(50) DEFAULT 'Farinhas'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cursos`
--

INSERT INTO `cursos` (`id`, `sigla`, `codigo`, `curso`, `coordenador`) VALUES
(1, 'CCO', '001', 'Ciência da Computação', 'Rafael Frinhani'),
(2, 'SIN', '002', 'Sistema da Informação', 'Phyllipe de Souza Lima'),
(3, 'MAT', '003', 'Matemática', 'Fernando Pereira Micena');

-- --------------------------------------------------------

--
-- Estrutura para tabela `turmas`
--

CREATE TABLE `turmas` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `sigla` varchar(255) NOT NULL,
  `participantes` varchar(50) DEFAULT NULL,
  `professor` varchar(50) DEFAULT NULL,
  `Vagas` int(11) DEFAULT NULL,
  `ano` int(11) DEFAULT NULL,
  `horarios` longtext DEFAULT NULL,
  `periodo` int(11) DEFAULT NULL,
  `cargaHoraria` int(11) DEFAULT NULL,
  `curso` varchar(50) DEFAULT NULL,
  `solicitacoes` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `turmas`
--

INSERT INTO `turmas` (`id`, `nome`, `sigla`, `participantes`, `professor`, `Vagas`, `ano`, `horarios`, `periodo`, `cargaHoraria`, `curso`, `solicitacoes`) VALUES
(40, 'Inteligência Artificial', 'CMC01', '', 'Isabella Drumond', 60, 2024, 'Terça-Feira  13:30 - 15:20,Quinta-Feira  13:30 - 15:20,', 5, 64, 'Ciência da Computação', '2002,2000'),
(41, 'Cálculo A', 'MAT00A', '', 'Juan Valentin', 110, 2024, 'Segunda-Feira  7:55 - 12:00,', 1, 64, 'Matemática Bacharelado', '2002,2004'),
(42, 'Sistemas Operacionais', 'SRC02', '', 'Carlos Minoru', 60, 2024, 'Quarta-Feira  13:30 - 15:20,Quinta-Feira  15:45 - 17:35,', 3, 64, 'Sistema da Informação', '2002,2000,2004'),
(43, 'Banco de Dados I', 'SPAD01', '', 'Melise Vieira', 60, 2024, 'Segunda-Feira  15:45 - 17:35,Quarta-Feira  7:55 - 9:45,', 5, 64, 'Sistema da Informação', '2002,2001,2000,2005,2004'),
(44, 'Desenvolvimento de Jogos', 'SDES01', '', 'Phyllipe Lima', 30, 2024, 'Quinta-Feira  19:00 - 20:40,Terça-Feira  21:00 - 22:40,', 0, 64, 'Sistema da Informação', '2002,2000,2004'),
(45, 'Economia da Informação', 'SECO01', '', 'José Arnaldo', 40, 2024, 'Quinta-Feira  13:30 - 15:20,', 0, 32, 'Sistema da Informação', '2002,2004');

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` int(11) DEFAULT 0,
  `matricula` varchar(50) DEFAULT NULL,
  `type` int(11) DEFAULT 0,
  `curso` varchar(50) NOT NULL DEFAULT 'Sistema da Informação',
  `solicitacoes` longtext DEFAULT NULL,
  `reset_token` varchar(128) DEFAULT NULL,
  `reset_token_expires` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `name`, `senha`, `email`, `status`, `matricula`, `type`, `curso`, `solicitacoes`, `reset_token`, `reset_token_expires`) VALUES
(2, 'Marcio Morelo', 'Senha123@', 'marcioMorelo@gmail.com', 1, '2002', 0, 'Sistema da Informação', '43', NULL, NULL),
(3, 'Joao Aparecido', 'Senha123@', 'soulmaste58@gmail.com', 1, '2003', 0, 'Sistema da Informação', '43', NULL, NULL),
(4, 'Caio Mendes Ribeiro da Rosa', 'Caio123@', 'caioribeirorosa@hotmail.com', 1, '2004', 0, 'Sistema da Informação', '42,44,45,43,,41', NULL, NULL),
(5, 'Phyllipe de Souza Lima', 'Senha123@', 'coordsin@gmail.com', 1, '2009001', 1, 'Sistema da Informação', '', NULL, NULL),
(6, 'Rafael Frinhani', 'Senha123@', 'coordcco@gmail.com', 1, '1998001', 1, 'Ciência da Computação', '', NULL, NULL),
(10, 'Fernando Pereira Micena', 'Senha123@', 'coordmat@gmail.com', 1, '2009002', 1, 'Matemática Bacharelado', '', NULL, NULL),
(11, 'Davi Dias', 'Senha123@', 'davi@gmail.com', 1, '2001', 0, 'Ciência da Computação', '43', NULL, NULL),
(12, 'Gabriel Alves', 'Senha123@', ' gabriel@gmail.com', 1, '2000', 0, 'Sistema da Informação', '43,42,44,40', NULL, NULL),
(13, 'Tiago Reis', 'Senha123@', 'tiago@gmail.com', 1, '2005', 0, 'Sistema da Informação', '43', NULL, NULL),
(14, 'Paulo', 'Senha123@', 'pauloteste@gmail.com', 1, '1999', 0, 'Sistema da Informação', 'Matemática', NULL, NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `calendario`
--
ALTER TABLE `calendario`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Índices de tabela `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `curso` (`curso`);

--
-- Índices de tabela `turmas`
--
ALTER TABLE `turmas`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `matricula` (`matricula`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `calendario`
--
ALTER TABLE `calendario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de tabela `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `turmas`
--
ALTER TABLE `turmas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
