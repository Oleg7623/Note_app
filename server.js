const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

const notesFile = path.join(__dirname, "notes.json");
const PASSWORD = "1234"; // Простий пароль для входу

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// Початкова сторінка з логіном
app.get("/", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    const { password } = req.body;
    if (password === PASSWORD) {
        const notes = getNotes();
        res.render("notes", { notes });
    } else {
        res.send("Невірний пароль. <a href='/'>Спробуйте ще раз</a>");
    }
});

// Додати нотатку
app.post("/add", (req, res) => {
    const { note } = req.body;
    if (note.trim()) {
        const notes = getNotes();
        notes.push(note);
        fs.writeFileSync(notesFile, JSON.stringify(notes));
    }
    res.redirect("/");
});

function getNotes() {
    if (!fs.existsSync(notesFile)) return [];
    const data = fs.readFileSync(notesFile);
    return JSON.parse(data);
}

app.listen(PORT, () => {
    console.log(`Note App running at http://localhost:${PORT}`);
});
