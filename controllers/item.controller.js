const db = require("../models");
const path = require("path");
const fs = require("fs");

exports.listItems = async (req, res) => {
    try {
        const items = await db.item.findAll({
            attributes: ["id", "nombre", "descripcion", "imagen"],
        });
        res.send(items);
    } catch (error) {
        console.error("Error listing items:", error);
        res.status(500).send({ message: "Error al listar ítems" });
    }
};

exports.getItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await db.item.findByPk(id, {
            attributes: ["id", "nombre", "descripcion", "imagen"],
        });
        if (!item) {
            return res.status(404).send({ message: "Ítem no encontrado" });
        }
        res.send(item);
    } catch (error) {
        console.error("Error fetching item:", error);
        res.status(500).send({ message: "Error al obtener ítem" });
    }
};

exports.createItem = async (req, res) => {
    const { nombre, descripcion } = req.body;

    
    if (!nombre || !descripcion || !req.files || !req.files.imagen) {
        return res.status(400).send({ message: "Todos los campos son requeridos, incluida la imagen" });
    }

    try {
        
        const imagen = req.files.imagen;
        const uploadPath = path.join(__dirname, "../uploads/items", imagen.name);

        
        if (!fs.existsSync(path.dirname(uploadPath))) {
            fs.mkdirSync(path.dirname(uploadPath), { recursive: true });
        }

        
        await imagen.mv(uploadPath);

        
        const item = await db.item.create({
            nombre,
            descripcion,
            imagen: `/uploads/items/${imagen.name}`, 
        });

        res.send(item);
    } catch (error) {
        console.error("Error creating item:", error);
        res.status(500).send({ message: "Error al crear ítem" });
    }
};

exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    try {
        const item = await db.item.findByPk(id);
        if (!item) {
            return res.status(404).send({ message: "Ítem no encontrado" });
        }

        
        item.nombre = nombre || item.nombre;
        item.descripcion = descripcion || item.descripcion;

        
        if (req.files && req.files.imagen) {
            const nuevaImagen = req.files.imagen;
            const uploadPath = path.join(__dirname, "../uploads/items", nuevaImagen.name);

            
            if (!fs.existsSync(path.dirname(uploadPath))) {
                fs.mkdirSync(path.dirname(uploadPath), { recursive: true });
            }

            
            await nuevaImagen.mv(uploadPath);

           
            if (item.imagen) {
                const oldImagePath = path.join(__dirname, "..", item.imagen);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            
            item.imagen = `/uploads/items/${nuevaImagen.name}`;
        }

        await item.save();
        res.send(item);
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).send({ message: "Error al actualizar ítem" });
    }
};

exports.deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await db.item.findByPk(id);
        if (!item) {
            return res.status(404).send({ message: "Ítem no encontrado" });
        }
        await item.destroy();
        res.send({ message: `Ítem con ID ${id} eliminado` });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).send({ message: "Error al eliminar ítem" });
    }
};