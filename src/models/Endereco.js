export class Endereco {
    constructor(dados) {
        this.cep = dados.cep;
        this.uf = dados.uf;
        this.cidade = dados.cidade;
        this.bairro = dados.bairro;
        this.logradouro = dados.logradouro;
        this.numero = dados.numero;
        this.complemento = dados.complemento;
        this.idCliente = dados.idCliente;
    }
}