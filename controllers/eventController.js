var express = require("express");
var router = express.Router();

const Event = require("../models/EventModel");
const Venue = require("../models/VenueModel");
const Artist = require("../models/ArtistModel")
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

  // Route pour afficher event
  exports.displayEvents = async (req, res) => { 
    // si connecté en tant que venue
    // if(req.body.isVenue) {
      Venue.findOne({token: req.params.token})// cherche si token en question est présent dans Venue
      .then(tokenVenue => {
        if(tokenVenue){ 
          try{
            //Si trouvé on cherche le venue qui correspond dans la collection event
            Event.find({ venue: tokenVenue._id }).then(dataEvent => {
              if (dataEvent) { // renvoie les correspondances
                res.json({ result: true, event: dataEvent });
              } else {
                res.json({ result: false, error: 'venue not found' });
              }
            });     
          } catch(error){
            console.log(error.message);
          }
        }
      });
    };
    // else {
      // si connecté en tant qu'artiste
    //   Artist.findOne({token: req.params.token}) // cherche si token en question est présent dans Artist
    //   .then(tokenArtist => {
    //     if(tokenArtist) {
    //       try{
    //         Event.find({artistToken: tokenArtist._id}).then(dataArtist => {
    //           if(dataArtist){
    //             res.json({ result: true, artist: dataArtist });
    //             } else {
    //               res.json({ result: false, error: 'event not found' });
    //             }
    //           });
    //         } catch(error){
    //           console.log(error.message);
    //         }
    //       }
    //     });
    //   }
    // };
    

