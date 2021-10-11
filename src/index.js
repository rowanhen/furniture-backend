const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")
const dotenv = require("dotenv")
// import dotenv from "dotenv";

dotenv.config();

//middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT ?? 5000;

if (!port) {
  throw 'Missing PORT environment variable.  Set it in .env file.';
}

if (!process.env.DATABASE_URL) {
    throw "No DATABASE_URL env var!  Have you made a .env file?  And set up dotenv?";
}
//Routes

//create a design

// "INSERT INTO productinfo (name, item, chairPart, colour) VALUES ($1, $2, $3, $4) RETURNING *"

// id | name | item | chairPart | colour 
// 1  |helo  | 1    | middle    | #000000
// 2  |helo  | 1    | top       | #000000
// 3  |helo  | 1    | bottom    | #ffffff
// 4  |helo  | 1    | buttons   | #ffffff

app.post("/submit", async (req, res) => {
    try {
        for( let row of req.body ){
            const { name, item, chairPart, colour } = row;
            await pool.query(
                "INSERT INTO newdesigninfo (name, item, chairPart, colour) VALUES ($1, $2, $3, $4) RETURNING *",
                [name, item, chairPart, colour]
            );
        }
        res.status(200).send(`Added ${req.body.length} rows`);
        
    } catch (err) {
        res.sendStatus(500);
        console.error(err);
    }
})

//get all designs

app.get("/designs", async (req, res) => {
    try {
        const allDesigns = await pool.query("SELECT * FROM newdesigninfo")
        res.json(allDesigns.rows)
    } catch (err) {
        console.error(err);
    }
})

//load a design

app.get("/designs/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const design = await pool.query("SELECT * FROM productinfo WHERE id = $1", [ id ])
        res.json(design.rows[0])
    } catch (err) {
        console.error(err);
    }
})

//update a design 

app.put("/designs/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, chairUpper, chairLower, buttonsUpper, buttonsLower, frame, backing } = req.body;
        const updateDesign = await pool.query(
            "UPDATE productinfo SET (name, chairUpper, chairLower, buttonsUpper, buttonsLower, frame, backing) = ($1, $2, $3, $4, $5, $6, $7) where id = $8",
            [ name, chairUpper, chairLower, buttonsUpper, buttonsLower, frame, backing, id ]
        );
        res.json("Design updated!")
    } catch (err) {
        console.error(err);
    }
})

//delete a design

//TODO: make so design is deleted based on name

app.delete("/designs/:name", async (req, res) => {
    try {
        const { name } = req.params;
        const deleteDesign = await pool.query("DELETE FROM newdesigninfo WHERE name = $1", [ name ]);
        res.json("Design deleted")
    } catch (err) {
        console.log(err.message)
    }
});

app.get("/", async (req, res) => {
    try {
        const everything = await pool.query("SELECT * FROM newdesigninfo")
        res.json(everything.rows)
        console.log("im working on / !")
    } catch (err) {
        console.error(err);
    }
})
