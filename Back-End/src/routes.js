const express = require('express')
const mahasiswa = require('./controller/MahasiswaController')
let router = express.Router()

router.get("/", mahasiswa.findAll)
router.get("/search", mahasiswa.search)
router.get("/:nim", mahasiswa.findOne)
router.post("/", mahasiswa.create)
router.put("/:nim", mahasiswa.update)
router.delete("/:nim", mahasiswa.deleted)


module.exports = router