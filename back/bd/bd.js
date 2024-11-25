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
  \`status\` int(11) DEFAULT 0,
  \`matricula\` varchar(50) DEFAULT NULL,
  \`type\` int(11) DEFAULT 0,
  \`curso\` varchar(50) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`email\` (\`email\`),
  UNIQUE KEY \`matricula\` (\`matricula\`),
  KEY \`FK_users_cursos\` (\`curso\`),
  CONSTRAINT \`FK_users_cursos\` FOREIGN KEY (\`curso\`) REFERENCES \`cursos\` (\`curso\`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`;

const insertCursosSQL = `
INSERT INTO \`cursos\` (\`id\`, \`sigla\`, \`codigo\`, \`curso\`) VALUES
(1, 'CCO', '001', 'Ciência da Computação'),
(2, 'SIN', '002', 'Sistema da Informação'),
(3, 'MAT', '003', 'Matemática')
ON DUPLICATE KEY UPDATE sigla=VALUES(sigla), codigo=VALUES(codigo), curso=VALUES(curso);
`;

module.exports = {
  createDatabaseSQL,
  createCursosTableSQL,
  createUsersTableSQL,
  insertCursosSQL,
};
