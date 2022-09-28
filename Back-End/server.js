var express = require('express')
var app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require("express-fileupload");

const router = require('./src/routes')

var corsOptions = {
    origin: "*"
}


app.use(
  fileUpload()
);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/mahasiswa", router)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})