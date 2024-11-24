

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` int(11) DEFAULT 0,
  `matricula` varchar(50) DEFAULT NULL,
  `type` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `name`, `senha`, `email`, `status`, `matricula`, `type`) VALUES
(2, 'Marcio Morelo', 'Senha123@', 'marcioMorelo@gmail.com', 1, '2002', 0),
(3, 'Joao Aparecido', 'Senha123@', 'soulmaste58@gmail.com', 1, '2003', 0),
(4, 'Caio Mendes Ribeiro da Rosa', 'Caio123@', 'caioribeirorosa@hotmail.com', 1, '2004', 0),
(5, 'Dirceu Moreu', 'Senha123@', 'dirmoreu@gmail.com', 1, '2005', 0),
(6, '', '', '', 0, '2006', 0);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `matricula` (`matricula`);

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

