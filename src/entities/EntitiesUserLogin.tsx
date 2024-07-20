interface UserProps {
    uid: string;
    nome: string;
    email: string;
    token: string;
    perfil: string;
    id_ee: string;
    
  }
  
  export default class EntitiesUserLogin {
    readonly uid: string;
    readonly nome: string;
    readonly email: string;
    readonly token: string;
    readonly perfil: string;
    readonly id_ee: string;
  
    constructor({ uid, nome, email, token, perfil, id_ee }: UserProps) {
      this.uid = uid;
      this.nome = nome;
      this.email = email;
      this.token = token;
      this.perfil = perfil;
      this.id_ee = id_ee;
    }
  }
  