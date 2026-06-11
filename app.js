require("dotenv").config();

const bcrypt = require("bcrypt");

const session = require("express-session");

const Skill = require("./models/skills");

const User = require("./models/Users");

const mongoose = require("mongoose"); //using database requires mongoose

const express = require("express"); //taking express module in use

const app = express(); //using express

app.use(express.urlencoded({ extended: true })); //parses the form data and makes it available and readable for express

app.use(session({
    secret: "learnloopsecret",
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs"); // to let the express know we have ejs files and let it run them

app.use(express.static("public")); //to use static files we have in our folder like css files

console.log("Attempting MongoDB connection...");
mongoose.connect(
    process.env.MONGO_URI
)
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((err) => {
        console.log(err);
    });

// const userSchema = new mongoose.Schema({
//     username: String,
//     email: String,
//     password: String
// });

// const User = mongoose.model("User", userSchema);





app.get('/', (req, res) => {
    res.render("home")
})

app.get('/about', (req, res) => {
    console.log(req.query);
    res.render("about")
})

app.get('/register', (req, res) => {

    res.render("register")
})

app.post("/register", async (req, res) => {
    try {

        // console.log("username:", req.body.username)
        // console.log("email:", req.body.email) --these lines of code were used to print data in the terminal

        const existingUser = await User.findOne({
            email: req.body.email
        });


        if (existingUser) {
            return res.send("Email already exists");
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        await user.save();

        res.redirect("/login");
    


    } catch (error) {
        console.log(error);
        res.send("something went wrong");
    }
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {

    console.log(req.body)

    const user = await User.findOne({
        email: req.body.email
    });
    console.log(user);

    if (!user) {
        return res.send("User not found");
    }
    const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if (!passwordMatch) {
        return res.send("Incorrect password");
    }

    req.session.userId = user._id;

    res.redirect("/dashboard");
})

app.get("/dashboard", (req, res) => {

    if (!req.session.userId) {
        return res.redirect("/login");
    }

    res.render("dashboard");

});

app.get("/profile", async (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }

    const user = await User.findById(req.session.userId);

    const allSkills = await Skill.find({
        userId: req.session.userId
    });

    res.render("profile", {
        user: user,
        allSkills: allSkills
    });

});

app.get("/logout", (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            return res.send("Error logging out");
        }
        res.redirect("/login");
    });

});

app.get("/addskills", (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    res.render("addSkills");
});

app.get("/browseSkills", async (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }

    const allSkills = await Skill.find();
    console.log(allSkills);
    res.render("browseSkills", {
        allSkills: allSkills
    });
});

app.get("/community", (req, res) => {
    res.render("community")
});

app.post("/add-skills", async (req, res) => {
    const newSkill = new Skill({
        skillName: req.body.skillName,
        category: req.body.category,
        description: req.body.description,
        userId: req.session.userId
    });
    await newSkill.save();

    res.redirect("/profile");
});

app.post("/delete-skill/:id", async (req, res) => {

    const skill = await Skill.findById(req.params.id);

    if (skill.userId !== req.session.userId) {
        return res.send("Unauthorized");
    }

    await Skill.findByIdAndDelete(req.params.id);

    res.redirect("/profile");

});

app.get("/edit-skill/:id", async (req, res) => {

    if (!req.session.userId) {
        return res.redirect("/login");
    }

    const skill = await Skill.findById(req.params.id);

    if (skill.userId !== req.session.userId) {
        return res.send("Unauthorized");
    }

    res.render("editSkill", {
        skill: skill
    });

});

app.post("/edit-skill/:id", async (req, res) => {

    const skill = await Skill.findById(req.params.id);

    if (skill.userId !== req.session.userId) {
        return res.send("Unauthorized");
    }

    await Skill.findByIdAndUpdate(req.params.id, {
        skillName: req.body.skillName,
        category: req.body.category,
        description: req.body.description
    });

    res.redirect("/profile");

});






app.listen(3000, () => {  //listening for user on particular port number
    console.log("Server is running!");
});