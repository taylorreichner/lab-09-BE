const pool = require('../utils/pool')

module.exports = class Player {
    id;
    name;
    position;
    rank;

    constructor(row) {
        this.id = row.id,
        this.name = row.name,
        this.position = row.position,
        this.rank = row.rank
    }

    static async insert({name, position, rank}) {
        const {
            rows
        } = await pool.query(`
        
        INSERT INTO players (name, position, rank) VALUES ($1, $2, $3) RETURNING *
        `,
        [
            name,
            position,
            rank
        ]);
        return new Player(rows[0]);
    };

    static async findById(id) {
        const {
            rows
        } = await pool.query(`
        SELECT * FROM players WHERE id = $1`,
        [
            id
        ]);
        return new Player(rows[0])
    }

    static async update(rank, id) {
        const {
            rows
        } = await pool.query(`
        UPDATE players SET rank = $1 WHERE id = $2 RETURNING *        
        `,
        [
            rank,
            id
        ])
        return new Player(rows[0])
    }

    static async delete(id) {
        const {
            rows
        } = await pool.query(`
        DELETE FROM players WHERE id = $1 RETURNING *`,
        [
            id,
        ])
        return new Player(rows[0])
    }

    static async findAll() {
        const {
            rows
        } = await pool.query(`
        SELECT * FROM players
        `,
        
        )

        return new Player(rows[0])
    }


}