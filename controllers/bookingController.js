var express = require("express");
var router = express.Router();

const Venue = require("../models/VenueModel");
const Artist = require("../models/ArtistModel");
const Booking = require("../models/BookingModel");
const { checkBody } = require("../utils/checkBody");


// Pour créer un booking
exports.createBooking = async (req, res) => {
//je reçois token, isVenue et name de l'artiste ou du venue + champs du booking - envoyer l'ID de l'event ?
if (!checkBody(req.body, ['isVenue', 'token', 'eventId', 'name', 'date', 'description', 'status', 'duration', 'hour_start', 'rate' ])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
const newBooking = new Booking({ //je crée un objet booking
    description: req.body.description,
    date: req.body.date,
    hour_start: req.body.hour_start,
    duration: req.body.duration,
    status: req.body.status,
    rate: req.body.rate,
    event: req.body.eventId,
    }); 
if (req.body.isVenue) {
  //si c'est un établissement qui crée
  (newBooking.creatorIsVenue = true),
    Venue.findOne({ token: req.body.token }) // je cherche l'ID de l'établissement grâce au token du user connecté
      .then((dataVenue) => {
        if (dataVenue) {
          // si l'établissement existe
          (newBooking.venue = dataVenue._id), // j'enregistre l'ID de l'établissement comme clé étrangère "venue" du booking
            Artist.findOne({ name: req.body.name }) // puis je cherche l'artiste en fonction du name envoyé par la requête
              .then((dataArtist) => {
                if (dataArtist) {
                  // si je trouve l'artiste
                  (newBooking.artist = dataArtist._id), // j'enregistre l'ID de l'artiste comme clé étrangère "artiste" du booking
                    newBooking.save().then((newBookingSaved) => {
                      // j'enregistre le nouveau booking
                      if (newBookingSaved) {
                        res.json({ result: true, newBookingSaved });
                      } else {
                        res.json({
                          result: false,
                          error: "Booking not created",
                        });
                      }
                    });
                } else {
                  res.json({ result: false, error: "No artist found" });
                }
              });
        } else {
          res.json({ result: false, error: "No venue found" });
        }
      });
} else {
  // si c'est l'artiste qui crée la proposition de booking
  (newBooking.creatorIsVenue = false),
    Artist.findOne({ token: req.body.token }) // je cherche l'ID de l'artiste grâce au token du user connecté
      .then((dataArtist) => {
        if (dataArtist) {
          // si l'artiste existe
          (newBooking.artist = dataArtist._id), // j'enregistre l'ID de l'artiste comme clé étrangère "venue" du booking
            Venue.findOne({ name: req.body.name }) // puis je cherche l'établissement' en fonction du name envoyé par la requête
              .then((dataVenue) => {
                if (dataVenue) {
                  // si je trouve l'artiste
                  (newBooking.venue = dataVenue._id), // j'enregistre l'ID de l'artiste comme clé étrangère "artiste" du booking
                    newBooking.save().then((newBookingSaved) => {
                      // j'enregistre le nouveau booking
                      if (newBookingSaved) {
                        res.json({ result: true, newBookingSaved });
                      } else {
                        res.json({
                          result: false,
                          error: "Booking not created",
                        });
                      }
                    });
                } else {
                  res.json({ result: false, error: "No venue found" });
                }
              });
        } else {
          res.json({ result: false, error: "No artist found" });
        }
      });
}};


// Pour afficher tous les bookings du user dans la page "Mes propositions"
exports.displayAllBookings = async (req, res) => {
    console.log(req.body.isVenue)
    console.log(req.body.token)
    if(req.body.isVenue) { // si le user connecté est un établissement
        Venue.findOne({token: req.body.token})
            .then(dataVenue => {
                if(dataVenue) {
                    Booking.find({venue: dataVenue._id})  // on recherche tous les bookings qui ont l'ID de l'établissement en clé étrangère
                    .then(dataBookings => {
                        if (dataBookings) {
                            res.json({ result: true, dataBookings })
                        } else {
                            res.json({ result: false, error: 'No bookings found' })
                        }
                    })
                } else {
                    res.json({ result: false, error: 'Venue not found' })
                }
            })
    } else { // si le user connecté est un artist
        Artist.findOne({token: req.body.token})
        .then(dataArtist => {
            if(dataArtist) {
                Booking.find({artist: dataArtist._id}) // on recherche tous les bookings qui ont l'ID de l'artiste en clé étrangère
                .then(dataBookings => {
                    if (dataBookings) {
                        res.json({ result: true, dataBookings })
                    } else {
                        res.json({ result: false, error: 'No bookings found' })
                    }
                })
            } else {
                res.json({ result: false, error: 'Artist not found' })
            }
        })
    }

}

// Pour accepter ou refuser un booking en changeant son statut
exports.updateBookingStatus = async (req, res) => {

  console.log('id', req.body._id)
  console.log('status', req.body.status)
    Booking.updateOne({'_id': req.body._id}, {'status': req.body.status})
        .then(dataBooking => {
            if(dataBooking) {
                res.json({ result: true, dataBooking })
            } else {
                res.json({ result: false, error: 'Booking not found' })
            }
        })
}