import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Mysql1999...",
    database:"english-phrases"
})

app.get("/", (req, res)=> {
    res.json("hello")
})

app.use(express.json())
app.use(cors())

app.get("/words", (req, res) =>{
    const q = "SELECT * FROM words";
    db.query(q, (err, data)=> {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/words/:id", (req, res) => {
    const phraseId = req.params.id;
    const q = "SELECT * FROM words WHERE id = ?";
    db.query(q, [phraseId], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json({ message: "Phrase not found" });
        return res.json(data[0]);
    });
});

app.post("/words", (req, res)=>{
    const q = "INSERT INTO words (`slovak_word`, `english_word`) VALUES (?)"
    const values = [req.body.slovak_word, req.body.english_word]

    db.query(q, [values], (err, data)=> {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.delete("/words/:id", (req, res)=> {
    const phraseId = req.params.id;
    const q = "DELETE FROM words WHERE id = ?";

    db.query(q,[phraseId], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Phrase has been deleted successfully.");
    })
})

app.put("/words/:id", (req, res)=> {
    const phraseId = req.params.id;
    const q = "UPDATE words SET `slovak_word` = ?, `english_word` = ? WHERE id = ?";
    const values = [req.body.slovak_word, req.body.english_word,]

    db.query(q, [...values, phraseId], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Phrase has been updated successfully.");
    })
})

app.listen(8800, ()=>{
    console.log("Connected to backend");
})