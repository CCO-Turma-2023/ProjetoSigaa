# Projeto SIGAA
Neste projeto foi desenvolvida uma aplicação web inspirada no Sistema Integrado de Gestão de Atividades Acadêmicas. O projeto possui dois tipos de usuário: Coordenador e Aluno.
Cada usuário possui diferentes funcionalidades que serão explicadas ao longo do README. Neste documento também será explicado como realizar a instalação e preparação do ambiente
para uso da aplicação, as tecnologias e linguagens de programação utilizadas durante o desenvolvimento do projeto.

## Sumário
- [Sobre](#sobre)
- [Instalação e Utilização](#instalacao-e-utilizacao)
- [Tecnologias](#tecnologias)
- [Autores](#autores)

## Sobre

### Usuário Coordenador:
O usuário coordenador, o qual pode ser dos cursos de Ciência da Computação, Sistemas de Informação ou Matemática, é definido de forma prévia no banco de dados, sem que haja cadastro.

Caso o usuário esqueça a senha, é possível recuperá-la por meio do número de matrícula. Após isso, um e-mail será enviado para o usuário para que ele possa redefinir sua senha.

Ao logar no sistema, as funcionalidades disponíveis para o coordenador serão:
- Criar, editar, remover e visualizar eventos gerais e vinculados ao curso o qual ele coordena no calendário
- Criar, editar, remover e visualizar turmas ofertadas no semestre atual pelo curso que ele coordena
- Visualizar, deferir e indeferir as solicitações de matrícula realizadas para matérias do curso que ele coordena

### Usuário Aluno:
O usuário aluno, diferente do usuário coordenador, precisa ser cadastrado no sistema para que possa acessar a tela inicial de um aluno. Durante o cadastro, o aluno precisa informar
seu nome, um e-mail válido e que não esteja registrado no banco de dados, escolher entre um dos 3 cursos disponíveis (Ciência da Computação, Sistemas de Informação e Matemática),
definir e confirmar sua senha, que precisa conter, no mínimo, 8 caracteres, ter uma letra maiúscula, uma letra minúscula, um número e um caracter especial. Após o cadastro, 
o número de matricula será enviado para o e-mail do aluno. Dessa forma, ele poderá realizar o login no sistema por meio do número de matrícula e da senha definida por ele.

Caso o usuário esqueça a senha, é possível recuperá-la por meio do número de matrícula. Após isso, um e-mail será enviado para o usuário para que ele possa redefinir sua senha.

Ao logar no sistema, as funcionalidades disponíveis para o aluno serão:
- Visualizar calendário com todos os eventos gerais e vinculados ao seu curso
- Realizar solicitação de matrícula em matérias obrigatórias, optativas e eletivas
- Visualizar turmas nas quais o aluno teve a solicitação de matrícula deferida
- Visualizar grade horária das matérias nas quais o aluno está matriculado

## Instalação e Utilização {#instalacao-e-utilizacao}
### Passo 1:
Execute um gitclone no seu terminal.

### Passo 4 (Final):
Execute "npm rundev" para abrir um localhost com o projeto e clique no link para ser redirecionado para a página da aplicação. Dessa forma, só resta criar um usuário aluno ou
utilizar 

## Tecnologias
### Front End:
ReactJS e TailWind

### Back End:
ExpressJS

### Painel de Controle:
XAMPP

### Banco de Dados:
MySQL

## Autores
O Projeto SIGAA foi realizado em um grupo de 5 (cinco) pessoas, formado por:
- Caio Mendes Ribeiro da Rosa - 2023002135 (https://github.com/CaioMendesRRosa)
- Davi Dias Monsores dos Santos - 2023001272 (https://github.com/davi2907)
- Gabriel Henrique dos Santos Alves - 2023010208 (https://github.com/gabrielhdsalves)
- Paulo Alexandre de Oliveira Nascimento Filho - 2023007374 (https://github.com/PAULOX-f)
- Tiago de Figueiredo Reis - 2023009225 (https://github.com/TiagoFigReis)
