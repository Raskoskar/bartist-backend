var express = require("express");
var router = express.Router();

const Event = require("../models/EventModel");
const Venue = require("../models/VenueModel");
const { checkBody } = require("../utils/checkBody");

//ROUTE CREATION D'EVENEMENT
exports.createEvent = async (req, res) => {
    //Vérification que les champs sont bien remplis
    if (!checkBody(req.body, ['title', 'date', 'hour_start', 'status', 'genres' ])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
      }
    // A rajouter éventuellement : Vérification qu'il n'y a pas déjà un event ce jour là ? ou peut-être un message d'alerte pour le user ?
    //Recherche de l'établissement d'après token de l'utilisateur connecté
    Venue.findOne({token: req.body.token})
        .then(data => {
        // le compte Venue existe en BDD
        if (data) {
          const newEvent = new Event({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            hour_start: req.body.hour_start,
            picture: req.body.picture,
            status: req.body.status,
            socials: req.body.socials,
            venue: data._id,
            genres: req.body.genres,
          }); 
          
          newEvent.save().then(newEventSaved => {
            res.json({ result: true, newEventSaved });
          });
        } else {
          // le compte Venue n'existe pas en BDD 
          res.json({ result: false, error: 'Venue not found' });
        }
      });
  };

// Fonction GET pour récupérer tout les events
exports.getEvents = async (req, res) => {
  try{
    Event.find().then(data => {
      if(data){
        res.status(200).json({result: true, events: data})
      }else{
        res.status(404).json({result: false, message: "no data"})
      }
  })
  }catch(err){
    res.status(500).json({result: false, message: err.message})
  }
}