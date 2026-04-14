export class Produto {
    #id;
    #idCategoria;
    #nome;
    #valor;
    #caminhoImagem;
    #dataCad;

    constructor(nome, valor, idCategoria, caminhoImagem, id = null) {
        this.id = id;
        this.nome = nome;
        this.valor = valor;
        this.idCategoria = idCategoria;
        this.caminhoImagem = caminhoImagem;
    }

    //metodos acessores - getters setters 
    get id() {
        return this.#id;
    }
    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    get nome() {
        return this.#nome;
    }
    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    get valor() {
        return this.#valor;
    }
    set valor(value) {
        this.#validarValor(value);
        this.#valor = value;
    }

    get idCategoria() {
        return this.#idCategoria;
    }
    set idCategoria(value) {
        this.#validarIdCategoria(value);
        this.#idCategoria = value;
    }

    get caminhoImagem() {
        return this.#caminhoImagem;
    }
    set caminhoImagem(value) {
        this.#validarPathImagem(value);
        this.#caminhoImagem = value;
    }

    #validarId(value) {
        if (value && value <= 0) {
            throw new Error("ID invalido");
        }
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 100) {
            throw new Error("Nome deve ter entre 3 e 100 caracteres");
        }
    }

    #validarValor(value) {
        if (!value || value <= 0) {
            throw new Error("valor deve ser maior que zero");
        }
    }

    #validarIdCategoria(value) {
        if (!value || value <= 0) {
            throw new Error("Categoria invalida");
        }
    }

   #validarPathImagem(value) {
    if (!value || value.trim().length < 5) {
        throw new Error("Caminho da imagem invalido");
    }
}
    //criacao de objetos ultilizando o design pattern FACTORY METHOD
    static criar(dados) {
        return new Produto(
            dados.nome,
            dados.valor,
            dados.idCategoria,
            dados.caminhoImagem
        );
    }

    static alterar(dados, id) {
        return new Produto(
            dados.nome,
            dados.valor,
            dados.idCategoria,
            dados.caminhoImagem,
            id
        );
    }
}