import { validarCPF } from "../utils/validarCpfs.js";
export class Cliente {
    #id;
    #nome;
    #cpf;
    #dataCad;

    constructor(nome, cpf, id = null) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
    }

    //metodos acessores - getters setters
    get nome() {
         return this.#nome; 
        }

    set nome(value) {
        if (!value || value.length < 3) {
            throw new Error("Nome invalido");
        }
        this.#nome = value;
    }

    get cpf() {
         return this.#cpf; 
        }

    set cpf(value) {
        if (!value || !validarCPF(value)) {
            throw new Error("cpf invalido");
        }
        this.#cpf = value;
    }
//criacao de objetos ultilizando o design pattern FACTORY METHOD
    static criar(dados) {
        return new Cliente(dados.nome, dados.cpf);
    }

    static alterar({ nome, cpf }, id) {
        return new Cliente({ id, nome, cpf });
    }
}