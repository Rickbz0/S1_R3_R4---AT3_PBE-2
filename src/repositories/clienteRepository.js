

import { connection } from "../configs/Database.js";

const clienteRepository = {

    criarCliente: async (cliente) => {
        const sql = `
            INSERT INTO clientes (Nome, CPF)
            VALUES (?, ?)
        `;
        const [result] = await connection.execute(sql, [
            cliente.nome,
            cliente.cpf
        ]);

        return result.insertId;
    },

    criarEndereco: async (endereco) => {
        const sql = `
            INSERT INTO enderecos 
            (Cep, Uf, Cidade, Bairro, Logradouro, Numero, Complemento, IdCliente)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await connection.execute(sql, [
            endereco.cep,
            endereco.uf,
            endereco.cidade,
            endereco.bairro,
            endereco.logradouro,
            endereco.numero,
            endereco.complemento,
            endereco.idCliente
        ]);
    },

    criarTelefone: async (telefone) => {
        const sql = `
            INSERT INTO telefones (Telefone, IdCliente)
            VALUES (?, ?)
        `;

        await connection.execute(sql, [
            telefone.telefone,
            telefone.idCliente
        ]);
    },

    selecionar: async () => {
        const sql = ` SELECT Id, Nome, CPF, DataCad FROM clientes`;
        const [rows] = await connection.execute(sql);
        return rows;
    },

    deletar: async (id) => {
        const sql = `DELETE FROM clientes WHERE Id = ?;`;
        const [rows] = await connection.execute(sql, [id]);
        return rows;
        
    },

    editarCliente: async (cliente) => {
        const sql = `
            UPDATE clientes
            SET Nome = ?, CPF = ?
            WHERE Id = ?
        `;
        await connection.execute(sql, [
            cliente.nome,
            cliente.cpf,
            cliente.id
        ]);
    },

    editarEndereco: async (endereco) => {
        const sql = `
            UPDATE enderecos
            SET Cep = ?, Uf = ?, Cidade = ?, Bairro = ?, Logradouro = ?, Numero = ?, Complemento = ?
            WHERE IdCliente = ?
        `;
        await connection.execute(sql, [
            endereco.cep,
            endereco.uf,
            endereco.cidade,
            endereco.bairro,
            endereco.logradouro,
            endereco.numero,
            endereco.complemento,
            endereco.idCliente
        ]);
    },

    editarTelefone: async (telefone) => {
        const sql = `
            UPDATE telefones
            SET Telefone = ?
            WHERE IdCliente = ?
        `;
        await connection.execute(sql, [
            telefone.telefone,
            telefone.idCliente
        ]);
    }

};

export default clienteRepository;