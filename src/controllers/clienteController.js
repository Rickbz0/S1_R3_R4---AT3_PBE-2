import { Cliente } from "../models/Cliente.js";
import { Endereco } from "../models/Endereco.js";
import { Telefone } from "../models/Telefone.js";
import axios from "axios";
import clienteRepository from "../repositories/clienteRepository.js";

const clienteController = {

    criar: async (req, res) => {
        try {
            const { nome, cpf, cep, numero, complemento, telefone } = req.body;

            // valida cep
            const cepRegex = /^[0-9]{8}$/;
            if (!cepRegex.test(cep)) {
                return res.status(400).json({ message: "CEP inválido" });
            }

            // cria cliente
            const cliente = Cliente.criar({ nome, cpf });
            const idCliente = await clienteRepository.criarCliente(cliente);

            // busca 
            const respApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

            if (respApi.data.erro) {
                return res.status(400).json({ message: "CEP não encontrado" });
            }

            console.log(respApi.data);

            const enderecoApi = respApi.data;

            const endereco = new Endereco({
                cep,
                uf: enderecoApi.uf,
                cidade: enderecoApi.localidade,
                bairro: enderecoApi.bairro,
                logradouro: enderecoApi.logradouro,
                numero,
                complemento,
                idCliente
            });

            await clienteRepository.criarEndereco(endereco);

            // telefone
            const tel = new Telefone({ telefone, idCliente });
            await clienteRepository.criarTelefone(tel);

            res.status(201).json({
                message: "Cliente criado com sucesso",
                idCliente
            });

        } catch (error) {
            res.status(500).json({
                message: "Erro ao criar cliente",
                error: error.message
            });
        }
    },

    selecionar: async (req, res) => {
        try {
            const result = await clienteRepository.selecionar();
            res.status(200).json({ result });
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar clientes", error: error.message });
        }
    },

    deletar: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await clienteRepository.deletar(id);
            res.status(200).json({ result });
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar cliente", error: error.message });
        }
    },

    editar: async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, cpf, cep, numero, complemento, telefone } = req.body;

        // validações básicas
        if (!nome || !cpf) {
            return res.status(400).json({ message: "nome e cpf são obrigatorios" });
        }

        // atualiza cliente
        const cliente = Cliente.alterar({ nome, cpf }, id);
        await clienteRepository.editarCliente(cliente);

        // busca dados do CEP
        const respApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (respApi.data.erro) {
            return res.status(400).json({ message: "CEP inválido" });
        }

        const enderecoApi = respApi.data;

        const endereco = new Endereco({
            cep,
            uf: enderecoApi.uf,
            cidade: enderecoApi.localidade,
            bairro: enderecoApi.bairro,
            logradouro: enderecoApi.logradouro,
            numero,
            complemento,
            idCliente: id
        });

        await clienteRepository.editarEndereco(endereco);

        // telefone
        const tel = new Telefone({
            telefone,
            idCliente: id
        });

        await clienteRepository.editarTelefone(tel);

        res.status(200).json({
            message: "Cliente atualizado com sucesso"
        });

    } catch (error) {
        res.status(500).json({
            message: "Erro ao editar cliente",
            error: error.message
        });
    }
}
};

export default clienteController;