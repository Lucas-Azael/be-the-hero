const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query

        const [count] = await connection('incidents')
            .count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //pegando dados de duas tabelas
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*', //todos os dados tabela incidents
                'ongs.name', //apenas os campos desejados da tabela de ongs
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]); //limitando número de 5 páginas

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({ //armazenando os dados na variavel id
            title,
            description,
            value,
            ong_id,
        })

        return response.json({ id }); //retornando o id criado
    },

    async delete(request, response) {
        const { id } = request.params; //buscando id através do params
        const ong_id = request.headers.authorization; //id da ong no header

        const incident = await connection('incidents') //pegando tabela
            .where('id', id) //comparando o id até encontrar o id desejado
            .select('ong_id') //selecionando a ong para fazer o teste
            .first(); //pegando o primeiro

        if (incident.ong_id != ong_id) { //comparando se id na tabela buscada é o mesmo id da ong que está realizando a operação
            return response.status(401).json({ error: 'Operation not permited' })
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}