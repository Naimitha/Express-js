const express = require("express");
const path = require("path");
const app = express();
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const axios = require("axios");

const firebaseConfig = {
  apiKey: "AIzaSyA_684N7Rcm_BKgLHBcflvcn25WPv7lY9I",
  authDomain: "express-2b828.firebaseapp.com",
  projectId: "express-2b828",
  storageBucket: "express-2b828.appspot.com",
  messagingSenderId: "987032260877",
  appId: "1:987032260877:web:be1ea8c9d90c15d707a044",
};

const firebaseApp = initializeApp(firebaseConfig);
const OMDB_API_KEY = "fb77d35f"; // Replace with your actual OMDB API key

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const auth = getAuth(firebaseApp);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        res.redirect("/home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(error);
        res.status(400).send(`Error: ${errorMessage}`);
      });
  } catch (e) {
    console.error(e);
    res.redirect("/signup");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const auth = getAuth(firebaseApp);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        res.redirect("/home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(error);
        res.status(400).send(`Error: ${errorMessage}`);
      });
  } catch (e) {
    console.error(e);
    res.redirect("/login");
  }
});

app.post("/search-movie", async (req, res) => {
  const { movieName } = req.body;
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?t=${movieName}&apikey=${OMDB_API_KEY}`
    );
    const movieDetails = response.data;
    res.json(movieDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching movie details");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
