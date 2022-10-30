const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());


const multer = require('multer')
const path = require('path')



const db = mysql.createConnection({
    user:'root',
    host: 'localhost',
    password:'',
    database:'checkin',

});
app.get("/" ,(req , res) => {
    res.send("hello world");
});



app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}));


app.use(express.static("./public"));
app.use(express.json());



/** check if session exist */

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({
            loggedIn: true,
            picture: req.session.user[0].picture,
            firstname: req.session.user[0].firstname,
            lastname: req.session.user[0].lastname
        })
    } else {
        res.send({
            loggedIn: false
        })
    }
})

/** login script */

app.post("/Login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const sqlSelect = "SELECT * FROM users WHERE `username` = ? and `password` = ?";
    db.query(sqlSelect, [username, password], (err, result) => {
        if (err) {
            res.send({
                err: err
            })
        } else {
            if (result.length == 0) {
                res.send({
                    message: "Authentication failed"
                })
            } else {
                req.user = result;
                res.send(result);
            }
        }
    });
});
app.listen(3001, () => {
    console.log("running")
});


/* Add an announcment*/

app.post("/addannonce", (req, res) => {
    const firstnameRef = req.body.firstnameRef;
    const lastnameRef = req.body.lastnameRef;
    const cinRef = req.body.cinRef;
    const emailRef = req.body.emailRef;
    const phoneRef = req.body.phoneRef;
    const locationRef = req.body.locationRef;
    const dateRef= req.body.dateRef;
    const priceRef = req.body.priceRef;
    const property = req.body.property;
    const descRef = req.body.descRef;
   
    const sqlSelect = "INSERT INTO `annonce` (`id_annonce`, `firstname`, `lastname`, `cin`, `email`, `phone`, `location`, `date`, `price`, `property`,`description` ) VALUES (NULL,?,?,?,?,?,?,?,?,?,?)";
    db.query(sqlSelect, [firstnameRef, lastnameRef,cinRef,emailRef, phoneRef,locationRef,dateRef,priceRef, property,descRef ], (err, result) => {
        if (err) {
            res.send({
                err: err
            })
        } else {
            res.send({
                message: "Operation completed"
                
            })

        }
    });
});

/** fin add annonce script */

/** select annonce script */

app.get("/newAnnonce", (req, res) => {
    const sqlSelect = "SELECT * FROM `annonce`";
    db.query(sqlSelect, (err, result) => {
        
        console.log(result)
        if (err) {
            res.send({
                err: err
            })
        } else {
            if (result.length == 0) {
                res.send({
                    message: "No Rows"
                })
            } else {
                res.send(result);
            }
        }
    });
});

app.get("/afficher", (req, res) => {
    const sqlSelect = "SELECT * FROM `annonce`";
    db.query(sqlSelect, (err, result) => {
        
        console.log(result)
        if (err) {
            res.send({
                err: err
            })
        } else {
            if (result.length == 0) {
                res.send({
                    message: "No Rows"
                })
            } else {
                res.send(result);
            }
        }
    });
});

/** fin select annonce script */

/** add annonce script */

// app.get("/afficheannonce", (req, res) => {
//     const sqlSelect = "SELECT * FROM `annonce`";
//     db.query(sqlSelect, (err, result) => {
        
//         console.log(result)
//         if (err) {
//             res.send({
//                 err: err
//             })
//         } else {
//             if (result.length == 0) {
//                 res.send({
//                     message: "No Rows"
//                 })
//             } else {
//                 res.send(result);
//             }
//         }
//     });
// });

  app.post("/afficheannonce", (req, res) => {
    const loc = req.body.loc;
    const prix = req.body.prix;
    const sqlSelect = "SELECT * FROM `annonce` where location = ? or price = ?"
    db.query(sqlSelect, [loc, prix],(err, result) => {
      if (err) {
        console.log(err);
        res.send({
          err: err,
        });
      } else {
        if (result.length == 0) {
          res.send({
            message: "No Rows",
          });
        } else {
          res.send(result);
        }
      }
    });
  });

  
  /** search script */

 /* reservation*/

app.post("/reservation", (req, res) => {
    const FirstnameRef = req.body.FirstnameRef;
    const LastnameRef = req.body.LastnameRef;
    const CinRef = req.body.CinRef;
    const EmailRef = req.body.EmailRef;
    const PhoneRef = req.body.PhoneRef;
   
    const sqlSelect = "INSERT INTO `reservation` (`id_reservation`, `firstname`,`lastname`, `cin`, `email`, `phone` ) VALUES (NULL,?,?,?,?,?)";
    db.query(sqlSelect, [FirstnameRef,LastnameRef,CinRef,EmailRef, PhoneRef ], (err, result) => {
        if (err) {
            console.log(err)
            res.send({
                err: err
            })
        } else {
            res.send({
                message: "Operation completed"
                
            })

        }
    });
});

/** reservation */

/** affiche reservation */

app.get("/affichereservation", (req, res) => {
    const sqlSelect = "SELECT firstname,lastname,cin FROM `reservation` ORDER BY id_reservation DESC LIMIT 1";
    db.query(sqlSelect, (err, result) => {
      if (err) {
        res.send({
          err: err,
        });
      } else {
        if (result.length == 0) {
          res.send({
            message: "No Rows",
          });
        } else {
          res.send(result);
        }
      }
    });
  });

  /** fin affiche reservation */