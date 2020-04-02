const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const ongs = await (connection('ongs').select('*'));

        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body; //campos

        const id = crypto.randomBytes(4).toString('HEX'); //gerando id unico

        await connection('ongs').insert({ //ele aguarda o código finalizar para  depois ir para o return
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });
    }
}