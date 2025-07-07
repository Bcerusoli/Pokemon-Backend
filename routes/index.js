const { requireUser } = require('../middlewares/requires-user');

module.exports = app => {
    require('./auth.routes')(app);
    require('./usuario.routes')(app);
    require('./equipo.routes')(app);
    require('./item.routes')(app);
    require('./tipo.routes')(app);
    require('./movimiento.routes')(app); 
    require('./pokemon.routes')(app);
    require('./pokemonEquipo.routes')(app);
    require('./habilidad.routes')(app);
    require("./pokemonTipos.routes")(app);
    require('./pokemonEquipoMovimientos.routes')(app);
    
}