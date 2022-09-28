const MahasiswaModel = require('./MahasiswaModel');

data = {
    NIM: "211511049",
    nama: "Muhammad Rizki Halomoan",
    kelas: "2B",
    prodi: "D3 TIF",
    jurusan: "Teknik Komputer dan Informatika"
}

MahasiswaModel.collection.insertOne(data)
