import Note from  "../models/NoteModel.js";
import { Op } from "sequelize";

//get all
export const getNotes = async (req,res) => {
    try {
        const response = await Note.findAll({
            attributes:['id','title','tag']
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
    }
}

//get by name
export const getNoteByName = async (req, res) => {
    try {
        const { owner } = req.params; 
        const notes = await Note.findAll({
            where: {
                owner: { [Op.like]: `%${owner}%` }
            },
            attributes: ['id', 'title', 'tag']
        });
        if (notes.length === 0) {
            return res.status(404).json({ pesan: "Note tidak ditemukan" });
        }
        res.status(200).json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
    }
};

//get 1 note
export const getNote = async (req, res) => {
    try {
        const { id } = req.params;  
        const note = await Note.findByPk(id);
        if (!note) {
            return res.status(404).json({ pesan: "Note tidak ditemukan" });
        };

        res.status(200).json({ pesan: "Note ditemukan" , note: note});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
    }
}

//create note
export const createNote = async (req,res) => {
    try {
        await Note.create(req.body);
        res.status(201).json({pesan: "Note ditambahkan"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
    }
}

//delete note
export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;  
        const note = await Note.findByPk(id);
        if (!note) {
            return res.status(404).json({ pesan: "Note tidak ditemukan" });
        }
        await Note.destroy({
            where: { id }
        });

        res.status(200).json({ pesan: "Note telah dihapus" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
    }
}


// Update a note
export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { owner, title, content, tag } = req.body;
        const note = await Note.findByPk(id);

        if (!note) {
            return res.status(404).json({ pesan: "Note tidak ditemukan" });
        }

        note.owner = owner || note.owner;
        note.title = title || note.title;  
        note.content = content || note.content;    
        note.tag = tag || note.tag;  

        await note.save();
        res.status(200).json({ pesan: "Note berhasil diupdate", note: note });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ pesan: "Terjadi kesalahan pada server" });
    }
}