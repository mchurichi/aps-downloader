var mongoose = require('mongoose');

var DocenteSchema = new mongoose.Schema({
  dni: String,
  nombre: String,
  archivo: String,
  descargado: Date,
  created_at: { type: Date },
  updated_at: { type: Date }
});

DocenteSchema.pre('save', function(next){
  var now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

module.exports = mongoose.model('Docentes', DocenteSchema);