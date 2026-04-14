import { connection } from "../configs/Database.js";

const produtoRepository = {

    criar: async (produto) => {
        const sql = `
            INSERT INTO produtos 
            (Nome, Valor, IdCategoria, CaminhoImagem) 
            VALUES (?, ?, ?, ?);
        `;
        const values = [
            produto.nome,
            produto.valor,
            produto.idCategoria,
            produto.caminhoImagem
        ];

        const [rows] = await connection.execute(sql, values);
        return rows;
    },

    editar: async (produto) => {
        const sql = `
            UPDATE produtos 
            SET Nome = ?, Valor = ?, IdCategoria = ?, CaminhoImagem = ?
            WHERE Id = ?;
        `;
        const values = [
            produto.nome,
            produto.valor,
            produto.idCategoria,
            produto.caminhoImagem,
            produto.id
        ];

        const [rows] = await connection.execute(sql, values);
        return rows;
    },

    deletar: async (id) => {
        const sql = `DELETE FROM produtos WHERE Id = ?;`;
        const [rows] = await connection.execute(sql, [id]);
        return rows;
    },

    selecionar: async () => {
        const sql = `SELECT * FROM produtos;`;
        const [rows] = await connection.execute(sql);
        return rows;
    }
};

export default produtoRepository;