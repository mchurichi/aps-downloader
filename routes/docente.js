var express = require('express');
var mime = require('mime');
var fs = require('fs');

var Docente = require('../models/Docente');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('docente/descarga');
});

router.post('/', function(req, res, next) {
  var dni = req.body.dni.trim();
  
  Docente.findOne({dni: dni}, function(err, doc) {
    if (doc) {
      doc.descargado = new Date();
      doc.save();
      var fixedUrl = doc.archivo.replace('dl=0', 'dl=1');
      res.redirect(fixedUrl);
    } else {
      res.render('docente/descarga', {mensaje: 'DNI no encontrado'});
    }
  });
});

module.exports = router;