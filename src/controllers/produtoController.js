import { Produto } from "../models/Produto.js";
import produtoRepository from "../repositories/produtoRepository.js";

const produtoController = {

    criar: async (req, res) => {
        try {
            const { nome, descricao, preco, categoria } = req.body;

            const dados = {
                nome,
                descricao,
                preco,
                categoria,
                caminhoImagem: req.file ? req.file.filename : null
            };

            const produto = Produto.criar(dados);
            const result = await produtoRepository.criar(produto);
            res.status(201).json({ result });
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar produto", error: error.message });
        }
    },

    editar: async (req, res) => {
        try {
            const id = req.params.id;
            const { nome, descricao, preco, categoria, caminhoImagem } = req.body;

            const dados = {
                nome,
                descricao,
                preco,
                categoria,
                caminhoImagem: req.file ? req.file.filename : caminhoImagem
            };

            const produto = Produto.alterar(dados, id);
            const result = await produtoRepository.editar(produto);
            res.status(200).json({ result });
        } catch (error) {
            res.status(500).json({ message: "Erro ao editar produto", error: error.message });
        }
    },

    deletar: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await produtoRepository.deletar(id);
            res.status(200).json({ result });
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar produto", error: error.message });
        }
    },

    selecionar: async (req, res) => {
        try {
            const result = await produtoRepository.selecionar();
            res.status(200).json({ result });
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar produtos", error: error.message });
        }
    }
};

export default produtoController;