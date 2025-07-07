const { sequelize } = require("../config/db.config");

const usuario = require("./usuario")(sequelize);
const authToken = require("./authToken")(sequelize);
const equipo = require("./equipo")(sequelize);
const pokemon = require("./pokemon")(sequelize);
const pokemonEquipo = require("./pokemonEquipo")(sequelize); 
const movimiento = require("./movimiento")(sequelize);
const item = require("./item")(sequelize);
const habilidad = require("./habilidad")(sequelize);
const naturaleza = require("./naturaleza")(sequelize);
const tipo = require("./tipo")(sequelize); 
const pokemonEquipoMovimientos = require("./pokemonEquipoMovimientos")(sequelize);

// Relaciones entre Usuario y AuthToken
usuario.hasMany(authToken, {
    foreignKey: "usuarioId",
    sourceKey: "id",
    as: "authTokens",
});
authToken.belongsTo(usuario, {
    foreignKey: "usuarioId",
    as: "usuario",
});

// Relaciones entre Usuario y Equipo
usuario.hasMany(equipo, {
    foreignKey: "usuarioId",
    sourceKey: "id",
    as: "equipos",
});
equipo.belongsTo(usuario, {
    foreignKey: "usuarioId",
    as: "usuario",
});

// Relaciones entre Equipo y Pokémon (a través de PokemonEquipo)
pokemon.belongsToMany(equipo, {
    through: pokemonEquipo,
    foreignKey: "pokemonId",
    otherKey: "equipoId",
    as: "equipos",
});
equipo.belongsToMany(pokemon, {
    through: pokemonEquipo,
    foreignKey: "equipoId",
    otherKey: "pokemonId",
    as: "pokemones",
});

// Relaciones entre PokemonEquipo y Pokémon
pokemonEquipo.belongsTo(pokemon, {
    foreignKey: "pokemonId",
    as: "pokemon",
});

// Relaciones entre PokemonEquipo y Equipo
pokemonEquipo.belongsTo(equipo, {
    foreignKey: "equipoId",
    as: "equipo",
});

// Relaciones entre Pokémon y Movimiento
pokemon.belongsToMany(movimiento, {
    through: "PokemonMovimientos",
    foreignKey: "pokemonId",
    otherKey: "movimientoId",
    as: "movimientos",
});
movimiento.belongsToMany(pokemon, {
    through: "PokemonMovimientos",
    foreignKey: "movimientoId",
    otherKey: "pokemonId",
    as: "pokemones",
});

// Relaciones entre PokemonEquipo y Ítem
pokemonEquipo.belongsTo(item, {
    foreignKey: "itemId",
    as: "item",
});

pokemonEquipo.belongsToMany(movimiento, {
    through: "PokemonEquipoMovimientos", 
    foreignKey: "pokemonEquipoId",
    otherKey: "movimientoId",
    as: "movimientos",
});

movimiento.belongsToMany(pokemonEquipo, {
    through: "PokemonEquipoMovimientos", 
    foreignKey: "movimientoId",
    otherKey: "pokemonEquipoId",
    as: "pokemonEquipos",
});
pokemon.belongsToMany(habilidad, {
    through: "PokemonHabilidades", 
    foreignKey: "pokemonId",
    otherKey: "habilidadId",
    as: "habilidades",
});

habilidad.belongsToMany(pokemon, {
    through: "PokemonHabilidades", 
    foreignKey: "habilidadId",
    otherKey: "pokemonId",
    as: "pokemones",
});
// Relaciones entre PokemonEquipo y Habilidad
pokemonEquipo.belongsTo(habilidad, {
    foreignKey: "habilidadId",
    as: "habilidad",
});
habilidad.hasMany(pokemonEquipo, {
    foreignKey: "habilidadId",
    as: "pokemonEquipos",
});

// Relaciones entre Pokémon y Naturaleza
pokemon.belongsTo(naturaleza, {
    foreignKey: "naturalezaId",
    as: "naturaleza",
});

// Relaciones entre Pokémon y Tipo (muchos a muchos)
pokemon.belongsToMany(tipo, {
    through: "PokemonTipos",
    foreignKey: "pokemonId",
    otherKey: "tipoId",
    as: "tipos",
});
tipo.belongsToMany(pokemon, {
    through: "PokemonTipos",
    foreignKey: "tipoId",
    otherKey: "pokemonId",
    as: "pokemones",
});

// Relaciones entre Movimiento y Tipo (uno a uno)
movimiento.belongsTo(tipo, {
    foreignKey: "tipoId",
    as: "tipo",
});
tipo.hasMany(movimiento, {
    foreignKey: "tipoId",
    as: "movimientos",
});

module.exports = {
    usuario,
    authToken,
    movimiento,
    equipo,
    pokemon,
    pokemonEquipo,
    pokemonEquipoMovimientos, 
    item,
    habilidad,
    naturaleza,
    tipo, 
    sequelize,
    Sequelize: sequelize.Sequelize,
};