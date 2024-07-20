interface UserProps {
    uid: string;
    id_ee: string;
    url_painel: string;
    time_stamp: string;
  }
  
  export default class EntitiesUrl {
    readonly uid: string;
    readonly id_ee: string;
    readonly url_painel: string;
    readonly time_stamp: string;
  
    constructor({ uid, id_ee, url_painel, time_stamp }: UserProps) {
      this.uid = uid;
      this.id_ee = id_ee;
      this.url_painel = url_painel;
      this.time_stamp = time_stamp;
    }
  }
  