var express = require("express");
var router = express.Router();

const User = require("../models/UserModel");
const { checkBody } = require("../utils/checkBody");

const uid2 = require("uid2");
const bcrypt = require("bcrypt");

const token = uid2(32);


/* GESTION DES USERS */
/* Fonctions: Create, Trouver tout les utilisateurs, Trouver un utilisateur */
/* ------------------------*/
exports.getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({ result: true, users: users });
    } catch (err) {
      console.log(err);
      res.status(400).json({ result: false, message: err.message });
    }
  };