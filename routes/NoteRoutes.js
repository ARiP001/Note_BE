import express from "express"
import { getNotes, createNote, deleteNote, getNote, updateNote, getNoteByName } from "../controller/NoteController.js"

const router = express.Router()

router.get('/notes', getNotes);
router.post('/notes', createNote);
router.delete('/notes/:id', deleteNote);
router.get('/notes/:id', getNote);
router.put('/notes/:id', updateNote);
router.get('/notes/search/:owner', getNoteByName);

export default router;