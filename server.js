const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;


//setting static access to all the files in the public folder
app.use(express.static("./public"));


//MiddleWare to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//CRUD - GET /notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
    res.status(200);
    console.log ("notes retrieved");
});

//CRUD - "*" aka index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//CRUD - GET /api/notes
app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({message : `unable to retrieve notes`});
        }
        res.json(JSON.parse(data));
    })
});


//CRUD - POST /api/notes
app.post('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        
        const notesArr = JSON.parse(data);
        
        notesArr.push(req.body);
        fs.writeFile("./db/db.json", JSON.stringify(notesArr), (err) => {
            if (err) {
                console.log(err);
                return;
            }
            res.json({message : `Note added`});
        })
    })
});





//console log the port number ti know server is running
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`)
});