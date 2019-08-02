const express = require("express")
const bodyparser = require("body-parser")
const hbs = require("hbs")
const session = require("express-session")
const cookieparser = require("cookie-parser")



const {
    User
} = require("./model/user.js")

const {
    Quiz
} = require("./model/quiz.js")

const {
    Flashcard
} = require("./model/flashcard.js")



const app = express()


app.use(express.static(__dirname + "/public"))

app.use('/profile', require('./routes/profileroute.js'));
app.use('/quiz', require('./routes/quizroute.js'));


// url encoder
const urlencoder = bodyparser.urlencoded({
    extended: false
});


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home-guest.html")
})

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/public/registration.html")
})

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login.html")
})

app.get("/about-guest", (req, res) => {
    res.sendFile(__dirname + "/public/about.html")
})

app.get("/logout", (req, res) => {
    res.sendFile(__dirname + "/public/login.html")
})

app.post("/createAccount", urlencoder, (req, res) => {
    let name = req.body.name
    let username = req.body.username
    let password = req.body.password

    //User.createAccount(name, username, password)

    res.redirect("home")
})


app.post("/loginuser", urlencoder, async (req, res) => {
    let username = req.body.username
    let password = req.body.password

    let user = await User.getAccount(username, password)

    console.log(user)



    /*
    if (username == "admin" && password == "1234") {
        res.redirect("home")
    } else {
        console.log("incorrect login")
        res.sendFile(__dirname + "/public/home-guest.html")
    }
    */
})

app.get("/home", (req, res) => {
    res.render("home-user.hbs")
})

app.get("/search", (req, res) => {
    res.render("search.hbs")
})

app.get("/about", (req, res) => {
    res.render("about.hbs")
})




app.listen(3000, function () {
    console.log("port 3000 is live");
})






/*




app.get("/create", (req, res) => {
    var deck = []

    var flash1 = new Flashcard({
        question: "What is 1+1",
        answer: "2"
    })

    var flash2 = new Flashcard({
        question: "What is 2+2",
        answer: "4"
    })

    flash1.save()
    flash2.save()

    deck.push(flash1)
    deck.push(flash2)


    var quiz = new Quiz({
        title: "Midterms",
        author: "Denzel Co",
        subject: "AUTOMAT",
        description: "Chapter 1-5",
        public: false,
        deck: deck
    })

    Flashcard.findOne({
        _id: "5d418a2a8840af6871427ee1"
    }, (err, doc) => {
        console.log(doc)
    })
})
*/