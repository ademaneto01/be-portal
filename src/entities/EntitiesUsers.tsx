import React from 'react';
interface UserProps {
  uid: string;
  nome: string;
  email: string;
  perfil: string;
  escola: string;
  id_ee: string;
  ativo: boolean;
}

export default class EntitiesUsers {
  readonly uid: string;
  readonly nome: string;
  readonly email: string;
  readonly perfil: string;
  readonly escola: string;
  readonly id_ee: string;
  readonly ativo: boolean;

  constructor({ uid, nome, email, perfil, escola, id_ee, ativo }: UserProps) {
    this.uid = uid;
    this.nome = nome;
    this.email = email;
    this.perfil = perfil;
    this.escola = escola;
    this.id_ee = id_ee;
    this.ativo = ativo;
  }
}
