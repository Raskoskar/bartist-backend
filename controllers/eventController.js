var express = require("express");
var router = express.Router();

const Event = require("../models/EventModel");
const Venue = require("../models/VenueModel");
const Artist = require("../models/ArtistModel")
const { checkBody } = require("../utils/checkBody");

// const uniqid = require('uniqid');
// const cloudinary = require('cloudinary').v2;
// const fs = require('fs');
// let fileInfo = fs.readFileSync('path/to/sample.txt');
// let uploadedImageUrl;

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
            picture: uploadedImageUrl,
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
              if (dataEvent.length) { // renvoie les correspondances
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

    exports.getEventById = (req, res) => {
      try{
        Venue.findOne({ _id: req.params.id }).then(data => {
          if (data) {
            res.status(200).json({ result: true, venue: data });
          } else {
            res.status(404).json({ result: false, message: 'User not found' });
          }
        });
      }catch(error){
        res.status(500).json({ result: false, message: 'Error' });
      }
    };

    //Route DELETE event
    exports.deleteEvent = async (req, res) => {
      // Ne pas passer l'id en params pour que la route fonctionnne
          try{
            //Si trouvé, cherche le venue qui correspond dans la collection event pour le delete
            Event.deleteOne({ _id: req.body._id }) // La cle correspond a ce qu'on a en bdd, et le req.param fait reference a la route
            .then(data => {
              console.log(data);
                if (data.deletedCount > 0) { // cf doc mongoose
                    res.json({ result:true, message:"This event has been successfully deleted" })
                } else {
                    res.json({ result:false, error:"Event not found" })
                }
            });
          } catch(error){
            console.log(error.message);
          }
    };
    // Route update event's status
    exports.updateEventStatus = async (req, res) => {
      try{
          Event.updateOne({_id: req.body._id}, { status: req.body.status})
          .then(data => {
            if(data){
              res.json({ result:true, message:"This status has been modified" })
            } else {
                res.json({ result:false, error:"Status not found" })
            }
        });
      } catch(error){
        console.log(error.message);
      }
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
    

