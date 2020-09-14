// General Imports and Setup //

const express			    = require ("express"),
	  bodyParser		    = require("body-parser"),
	  mongoose			    = require ("mongoose"),
 	  methodOverride	    = require ("method-override"),
 	  passport 				= require ("passport"),
 	  localStrategy 		= require ("passport-local"),
	  passportLocalMongoose = require ("passport-local-mongoose");

// Models //
const User = require ("./models/user")

// Express and Modules //
const app = express();
app.use(express.static("public")); // js, css, etc.
app.set("view engine", "ejs"); // EJS is a dependency

// Express //
app.use(require("express-session")({
    secret: "Tiny Dancer",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method")); // For PUT requests

// Mongoose //

mongoose.connect('mongodb://localhost:27017/LoginApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

// Passport //
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());  
passport.deserializeUser(User.deserializeUser()); 

// Locals //
app.use((req, res, next) => {
	res.locals.currentUser = req.user; // Includes the User in all routes.
	next(); // Required to move forward from this middleware.
});

// Globals //
const port = 3000;
// Routes //
const loginRoutes = require("./routes/login");
const newUserRoutes = require("./routes/newUser");
const successRoutes = require("./routes/success")

app.use(loginRoutes);
app.use(newUserRoutes);
app.use(successRoutes);

// START/LISTEN//		
app.listen(port, () => { console.log(`Listening on port ${port}`); });
	