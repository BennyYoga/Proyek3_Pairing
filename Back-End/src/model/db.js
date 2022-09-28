const db = require('mongoose');

db.connect('mongodb://localhost:27017/mahasiswa',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = db