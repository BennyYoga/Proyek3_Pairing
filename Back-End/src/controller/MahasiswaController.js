const MahasiswaModel = require('../model/MahasiswaModel');
const path = require('path');
const {unlink} = require('fs')


function search(req, res){
    const { nama } = req.query;
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(nama);
    console.log(req.query.nama)
    MahasiswaModel.find({nama: { $regex: searchRgx, $options: "i"} }).then((data)=>{
        res.send(data)
    })
    .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving messages.",
        })
    })
}

function findAll(req, res){
   MahasiswaModel.find().then((data) => {
    res.send(data)
   })
   .catch((err) => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving messages.",
    })
   })
}

function findOne(req, res){
    MahasiswaModel.findOne({NIM : req.params.nim}).then((data)=>{
        if(!data){
            return res.status(404).send({
                message: "Nim : " + req.params.nim + " tidak tersedia",
            })
        }
        res.send(data)
    })
    .catch((err) => {
        return res.status(500).send({
            message: "Error retrieving message with nim " + req.params.nim,
        });
    })
}

async function create(req, res){
    if (!req.body) {
        return res.status(400).send({
          message: "Data tidak boleh kosong!"
        })
    }
    var mahasiswa = await MahasiswaModel.findOne({NIM : req.body.NIM})
    if(mahasiswa){
        return res.status(409).send({
            message: "Error creating NIM is existing",
        });
    }

    // file settings
    const file = req.files.image;
    const extensionName = path.extname(file.name); // fetch the file extension
    const file_name = req.body.NIM + extensionName
    const path_name = "public/image/"+file_name;
    const allowedExtension = ['.png','.jpg','.jpeg'];

    if(!allowedExtension.includes(extensionName)){
        return res.status(422).send("Invalid Image");
    }
    //upload file
    file.mv(path_name, (err) => {
      if (err) {
        return res.status(500).send({
            message: "Image cannot upload"
        })
      }
    });

    //upload to database
    var data = {
        NIM: req.body.NIM,
        nama: req.body.nama,
        kelas: req.body.kelas,
        prodi: req.body.prodi,
        jurusan: req.body.jurusan,
        image: file_name
    }
    MahasiswaModel.collection.insertOne(data);
    return res.status(200).send(data)
}

function update(req, res){
    var dataUpdate = {
        nama: req.body.nama,
        kelas: req.body.kelas,
        prodi: req.body.prodi,
        jurusan: req.body.jurusan
    }
    MahasiswaModel.findOneAndUpdate({NIM:req.params.nim}, dataUpdate)
        .then((data)=>{
            if(!data){
                return res.status(404).send({
                    message: "Nim : " + req.params.nim + " tidak tersedia",
                })
            }
            res.send(data)
        })
        .catch((err)=>{
            return res.status(500).send({
                message: "Error updating message with id " + req.params.messageId,
            });
        })
}

function deleted(req, res){
    MahasiswaModel.findOneAndDelete({NIM:req.params.nim})
    .then((data)=>{
        if(!data){
            return res.status(404).send({
                message: "Nim : " + req.params.nim + " tidak tersedia",
            })
        }
        unlink("public/image/"+data.image, (err) => {
            if (err) throw err;
            console.log('image was deleted');
        })
        res.send(data)
    })
    .catch((err)=>{
        return res.status(500).send({
            message: "Error updating message with id " + req.params.messageId,
        });
    })
}


module.exports = {findAll, findOne, create, update, deleted, search}

