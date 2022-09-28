const db = require('./db')
const Schema = db.Schema

const Mahasiswa = new Schema({
    NIM : {
        type : String,
        required: true
    },
    nama : {
        type : String,
        required: true
    },
    kelas : {
        type : String,
        required: true
    },
    prodi : {
        type : String,
        required: true
    },
    jurusan : {
        type : String,
        required: true
    },
    image : {
        type : String,
        required: true
    },
})

module.exports = db.model('MahasiswaData', Mahasiswa)