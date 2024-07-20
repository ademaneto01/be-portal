interface UserProps {
    uid: string;
    nome: string;
    email: string;
    senha: string;
    perfil: string;
    id_ee: string;
    ativo: boolean;
  }
  
  export default class EntitiesOneUser {
    readonly uid: string;
    readonly nome: string;
    readonly email: string;
    readonly senha: string;
    readonly perfil: string;
    readonly id_ee: string;
    private readonly _ativo: boolean;
  
    constructor({ uid, nome, email, senha, perfil, id_ee, ativo }: UserProps) {
      this.uid = uid;
      this.nome = nome;
      this.email = email;
      this.senha = senha;
      this.perfil = perfil;
      this.id_ee = id_ee;
      this._ativo = ativo;
    }
  }
  