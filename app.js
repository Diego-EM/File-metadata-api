const express = require('express');
const multer = require('multer');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const upload = multer({ dest: "./tmp"}).single('upfile');

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.set('port', 3000 || process.env.PORT);

app.post('/api/fileanalyse', upload,(req, res) => {
    res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
    })
})

app.get('/',express.static('./public'));

app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})