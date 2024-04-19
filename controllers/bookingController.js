var express = require("express");
var router = express.Router();

const Venue = require("../models/VenueModel");
const Artist = require("../models/ArtistModel");
const Booking = require("../models/BookingModel");

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
    Booking.findById(req.body._id)
        .then(dataBooking => {
            if(dataBooking) {
                dataBooking.status = req.body.status;
                res.json({ result: true, dataBooking })
            } else {
                res.json({ result: false, error: 'Booking not found' })
            }
        })
}