import express from "express";
import cors from "cors";
import NoteRoutes from "./routes/NoteRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(NoteRoutes);

app.listen(5000, ()=>console.log('Menyala abankuh di port 5000...'))
