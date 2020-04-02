const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization; //pegando a ong logada

        const incidents = await connection('incidents')
            .where('ong_id', ong_id).select('*'); //selecionando a ong a partir do ong_id

        return response.json(incidents);
    }
}