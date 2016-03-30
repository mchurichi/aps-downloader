var express = require('express');
var router = express.Router();
var Docente = require('../models/Docente');
var multer  = require('multer');
var fs = require('fs');

// Listado de docentes
router.get('/', function(req, res, next) {
  Docente.find().sort({nombre: 1}).exec(function(err, docentes) {
    if (!err) {
      res.render('admin/index', {docentes: docentes});
    } else {
      res.render('admin/index', {mensaje: 'Error al cargar la lista de docentes'});
    }
  });
});

// GET nuevo docente
router.get('/nuevo-docente', function(req, res, next) {
  res.render('admin/detalle-docente', {accion: 'Nuevo'});
});

// POST nuevo docente
router.post('/nuevo-docente', function(req, res, next) {
  Docente.create(req.body,
    function(err, doc) {
      if (!err) {
        res.render('admin/detalle-docente', {accion: 'Nuevo', mensaje: 'Docente creado exitosamente'});
      } else {
        res.render('admin/detalle-docente', {accion: 'Nuevo', docente: req.body, mensaje: 'Hubo un error al crear el docenteo'});
      }
    });
});

// GET editar docente
router.get('/editar-docente/:id', function(req, res, next) {
  Docente.findById(req.params.id, function(err, docente) {
    if (!err) {
      res.render('admin/detalle-docente', {accion: 'Editar', docente: docente});
    } else {
      res.send(400, 'Error al obtener docente');
    }
  });
});

// POST editar docente
router.post('/editar-docente/:id', function(req, res, next) {
  var docenteData = req.body;
  // docenteData.descargado = null;
  Docente.findById(req.params.id, function(err, doc) {
    if (!err) {
      if (doc.archivo != docenteData.archivo) {
        doc.descargado = null;
        doc.archivo = docenteData.archivo;
      }
      doc.dni = docenteData.dni;
      doc.nombre = docenteData.nombre;
      doc.save();
      
      res.render('admin/detalle-docente', {accion: 'Editar', docente: docenteData, mensaje: 'Docente modificado exitosamente'});
    } else {
      res.render('admin/detalle-docente', {accion: 'Editar', docente: docenteData, mensaje: 'Hubo un error al modificar los datos del docente'});
    }
  });
});

// GET eliminar docente
router.get('/eliminar-docente/:id', function(req, res, next) {
  Docente.findById(req.params.id, function(err, docente) {
    if (!err) {
      res.render('admin/eliminar-docente', {docente: docente});
    } else {
      res.send(400, 'Error al obtener docente');
    }
  });
});

// POST eliminar docente
router.post('/eliminar-docente/:id', function(req, res, next) {
  Docente.findByIdAndRemove(req.params.id, function(err, doc) {
    if (!err) {
        res.render('admin/eliminar-docente', {mensaje: 'Docente eliminado exitosamente'});
      } else {
        res.render('admin/eliminar-docente', {mensaje: 'Hubo un error al eliminar el docente'});
      }
  });
});

module.exports = router;
