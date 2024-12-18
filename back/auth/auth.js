const express = require('express');

const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const autenticarToken = (req,res) => {
    const authH = req.headers['authorization'];
    const token = authH && authH.split(' ')[1];
    if(token === null) return res.status(401).send('Token não encontrado');

    try {
        const user = jwt.verify(token, process.env.TOKEN);

        return res.status(201).json({user : user});
    } catch (error) {
        res.status(403).send('Token inválido');
    }
   
}

module.exports = {autenticarToken};