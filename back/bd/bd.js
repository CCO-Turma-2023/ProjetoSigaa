// bd/bd.js

// Script SQL para criação do banco
const createDatabaseSQL = `
CREATE DATABASE IF NOT EXISTS \`bdusers\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
`;

const createCursosTableSQL = `
CREATE TABLE IF NOT EXISTS \`cursos\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`sigla\` varchar(255) NOT NULL,
  \`codigo\` varchar(255) NOT NULL,
  \`curso\` varchar(50) DEFAULT NULL,
  \`coordenador\` varchar(50) DEFAULT 'Farinhas',
  PRIMARY KEY (\`id\`),
  KEY \`curso\` (\`curso\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`;

const createUsersTableSQL = `
CREATE TABLE IF NOT EXISTS \`users\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) NOT NULL,
  \`senha\` varchar(255) NOT NULL,
  \`email\` varchar(255) NOT NULL,
  \`matricula\` varchar(50) DEFAULT NULL,
  \`type\` int(11) DEFAULT 0,
  \`curso\` varchar(50) NOT NULL DEFAULT 'Sistema da Informação',
  \`solicitacoes\` longtext DEFAULT NULL,
  \`reset_token\` varchar(128) DEFAULT NULL,
  \`reset_token_expires\` timestamp NULL DEFAULT NULL,
  \`turmasDef\` longtext DEFAULT NULL,
  \`turmasIn\` longtext DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`email\` (\`email\`),
  UNIQUE KEY \`matricula\` (\`matricula\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`;

const createTurmasTableSQL = `
CREATE TABLE IF NOT EXISTS \`turmas\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`nome\` varchar(255) NOT NULL,
  \`sigla\` varchar(255) NOT NULL,
  \`participantes\` varchar(50) DEFAULT NULL,
  \`professor\` varchar(50) DEFAULT NULL,
  \`vagas\` int(11) DEFAULT NULL,
  \`ano\` int(11) DEFAULT NULL,
  \`horarios\` longtext DEFAULT NULL,
  \`periodo\` int(11) DEFAULT NULL,
  \`cargaHoraria\` int(11) DEFAULT NULL,
  \`curso\` varchar(50) DEFAULT NULL,
  \`solicitacoes\` longtext DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`;

const createCalendarioTableSQL = `
CREATE TABLE IF NOT EXISTS \`calendario\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`title\` varchar(50) DEFAULT NULL,
  \`date\` varchar(50) DEFAULT NULL,
  \`color\` varchar(50) DEFAULT NULL,
  \`description\` longtext DEFAULT NULL,
  \`curso\` varchar(50) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`;

const insertCursosSQL = `
INSERT INTO \`cursos\` (\`id\`, \`sigla\`, \`codigo\`, \`curso\`, \`coordenador\`) VALUES
  (1, 'CCO', '001', 'Ciência da Computação', 'Rafael Frinhani'),
  (2, 'SIN', '002', 'Sistema da Informação', 'Phyllipe de Souza Lima'),
  (3, 'MAT', '003', 'Matemática Bacharelado', 'Fernando Pereira Micena')
ON DUPLICATE KEY UPDATE 
  \`sigla\`=VALUES(\`sigla\`), 
  \`codigo\`=VALUES(\`codigo\`), 
  \`curso\`=VALUES(\`curso\`);
`;

const insertUsersSQL = `
INSERT INTO \`users\` (\`id\`, \`name\`, \`senha\`, \`email\`, \`matricula\`, \`type\`, \`curso\`, \`solicitacoes\`, \`reset_token\`, \`reset_token_expires\`, \`turmasDef\`, \`turmasIn\`) VALUES
  (5, 'Phyllipe de Souza Lima', 'Senha123@', 'coordsin@gmail.com', '2009001', 1, 'Sistema da Informação', NULL, NULL, NULL, NULL, NULL),
  (6, 'Rafael Frinhani', 'Senha123@', 'coordcco@gmail.com','1998001', 1, 'Ciência da Computação', NULL, NULL, NULL, NULL, NULL),
  (10, 'Fernando Pereira Micena', 'Senha123@', 'coordmat@gmail.com', '2009002', 1, 'Matemática Bacharelado', NULL, NULL, NULL, NULL, NULL)
ON DUPLICATE KEY UPDATE 
  \`name\`=VALUES(\`name\`), 
  \`senha\`=VALUES(\`senha\`), 
  \`email\`=VALUES(\`email\`),
  \`matricula\`=VALUES(\`matricula\`), 
  \`type\`=VALUES(\`type\`),
  \`curso\`=VALUES(\`curso\`), 
  \`solicitacoes\` = IF(\`solicitacoes\` IS NULL OR \`solicitacoes\` = '', VALUES(\`solicitacoes\`), \`solicitacoes\`),
  \`reset_token\`=VALUES(\`reset_token\`),
  \`reset_token_expires\`=VALUES(\`reset_token_expires\`),
  \`turmasDef\` = IF(\`turmasDef\` IS NULL OR \`turmasDef\` = '', VALUES(\`turmasDef\`), \`turmasDef\`),
  \`turmasIn\` = IF(\`turmasIn\` IS NULL OR \`turmasIn\` = '', VALUES(\`turmasIn\`), \`turmasIn\`);
`;

const insertCalendarioSQL = `
INSERT INTO \`calendario\` (\`id\`, \`title\`, \`date\`, \`color\`, \`description\`, \`curso\`) VALUES
  (32, 'Ano Novo', '2024-12-31', '#005799', 'Virada do Ano', 'Sistema da Informação'),
  (56, 'Entrega de Web', '2024-12-11', '#000000', 'Entregar o Trabalho de Programação Web', 'Ciência da Computação')
ON DUPLICATE KEY UPDATE 
  \`title\`=VALUES(\`title\`), 
  \`date\`=VALUES(\`date\`), 
  \`color\`=VALUES(\`color\`),
  \`description\`=VALUES(\`description\`),
  \`curso\`=VALUES(\`curso\`);
`;

module.exports = {
  createDatabaseSQL,
  createCursosTableSQL,
  createUsersTableSQL,
  createTurmasTableSQL,
  insertCursosSQL,
  insertUsersSQL,
  createCalendarioTableSQL,
  insertCalendarioSQL,
};
