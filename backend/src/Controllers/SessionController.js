const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id', id) //buscando pelo id
            .select('name')
            .first(); //assim ele retorna apenas um só resultado

        if (!ong) {
            return response.status(400).json({ error: 'Ong não encontrada' });
        }

        return response.json(ong); //retorna apenas o nome
    }
}