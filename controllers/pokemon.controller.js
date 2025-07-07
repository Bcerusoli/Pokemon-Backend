const db = require("../models");
const path = require("path");
const fs = require("fs");


exports.listPokemons = async (req, res) => {
    try {
        const pokemones = await db.pokemon.findAll({
            attributes: ["id", "nombre", "imagen", "baseHP", "baseAtaque", "baseDefensa", "baseAtaqueEspecial", "baseDefensaEspecial", "baseVelocidad"],
        });
        res.send(pokemones);
    } catch (error) {
        console.error("Error listing pokemones:", error);
        res.status(500).send({ message: "Error al listar los Pokémon" });
    }
};

exports.getPokemonById = async (req, res) => {
    const { id } = req.params;
    try {
        const pokemon = await db.pokemon.findByPk(id, {
            attributes: ["id", "nombre", "imagen", "baseHP", "baseAtaque", "baseDefensa", "baseAtaqueEspecial", "baseDefensaEspecial", "baseVelocidad"],
        });
        if (!pokemon) {
            return res.status(404).send({ message: "Pokémon no encontrado" });
        }
        res.send(pokemon);
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
        res.status(500).send({ message: "Error al obtener el Pokémon" });
    }
};

exports.createPokemon = async (req, res) => {
    const { nombre, baseHP, baseAtaque, baseDefensa, baseAtaqueEspecial, baseDefensaEspecial, baseVelocidad } = req.body;

    
    if (!nombre || !baseHP || !baseAtaque || !baseDefensa || !baseAtaqueEspecial || !baseDefensaEspecial || !baseVelocidad || !req.files || !req.files.imagen) {
        return res.status(400).send({ message: "Todos los campos son requeridos, incluida la imagen" });
    }

    try {
        
        const existingPokemon = await db.pokemon.findOne({ where: { nombre } });
        if (existingPokemon) {
            return res.status(400).send({ message: "El nombre del Pokémon ya está registrado" });
        }

        
        const imagen = req.files.imagen;
        const uploadPath = path.join(__dirname, "../uploads/pokemones", imagen.name);

        
        if (!fs.existsSync(path.dirname(uploadPath))) {
            fs.mkdirSync(path.dirname(uploadPath), { recursive: true });
        }

        
        await imagen.mv(uploadPath);

        
        const pokemon = await db.pokemon.create({
            nombre,
            imagen: `/uploads/pokemones/${imagen.name}`, 
            baseHP,
            baseAtaque,
            baseDefensa,
            baseAtaqueEspecial,
            baseDefensaEspecial,
            baseVelocidad,
        });

        res.send(pokemon);
    } catch (error) {
        console.error("Error creando Pokémon:", error);
        res.status(500).send({ message: "Error al crear el Pokémon" });
    }
};

exports.updatePokemon = async (req, res) => {
    const { id } = req.params;
    const { nombre, baseHP, baseAtaque, baseDefensa, baseAtaqueEspecial, baseDefensaEspecial, baseVelocidad } = req.body;

    try {
        const pokemon = await db.pokemon.findByPk(id);
        if (!pokemon) {
            return res.status(404).send({ message: "Pokémon no encontrado" });
        }

        
        pokemon.nombre = nombre || pokemon.nombre;
        pokemon.baseHP = baseHP || pokemon.baseHP;
        pokemon.baseAtaque = baseAtaque || pokemon.baseAtaque;
        pokemon.baseDefensa = baseDefensa || pokemon.baseDefensa;
        pokemon.baseAtaqueEspecial = baseAtaqueEspecial || pokemon.baseAtaqueEspecial;
        pokemon.baseDefensaEspecial = baseDefensaEspecial || pokemon.baseDefensaEspecial;
        pokemon.baseVelocidad = baseVelocidad || pokemon.baseVelocidad;

        
        if (req.files && req.files.imagen) {
            const nuevaImagen = req.files.imagen;
            const uploadPath = path.join(__dirname, "../uploads/pokemones", nuevaImagen.name);

            
            if (!fs.existsSync(path.dirname(uploadPath))) {
                fs.mkdirSync(path.dirname(uploadPath), { recursive: true });
            }

            
            await nuevaImagen.mv(uploadPath);

            
            if (pokemon.imagen) {
                const oldImagePath = path.join(__dirname, "..", pokemon.imagen);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            
            pokemon.imagen = `/uploads/pokemones/${nuevaImagen.name}`;
        }

        await pokemon.save();
        res.send(pokemon);
    } catch (error) {
        console.error("Error updating Pokémon:", error);
        res.status(500).send({ message: "Error al actualizar el Pokémon" });
    }
};

exports.deletePokemon = async (req, res) => {
    const { id } = req.params;

    try {
        const pokemon = await db.pokemon.findByPk(id);
        if (!pokemon) {
            return res.status(404).send({ message: "Pokémon no encontrado" });
        }

        await pokemon.destroy();
        res.send({ message: `Pokémon con ID ${id} eliminado` });
    } catch (error) {
        console.error("Error deleting Pokémon:", error);
        res.status(500).send({ message: "Error al eliminar el Pokémon" });
    }
};