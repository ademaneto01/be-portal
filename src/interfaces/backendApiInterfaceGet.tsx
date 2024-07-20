import {
  EntitiesUsers,
  EntitiesUrl,
  EntitiesMetaBaseIframe,
} from '@/entities';

export default interface BackendApiInterfaceGet {
  localizarUsuarios(): Promise<EntitiesUsers[]>;
  getUrl(uid: any): Promise<EntitiesUrl[]>;
  localizarUsuario(uid: any): Promise<EntitiesUsers[]>;
  metaBaseIframe(id: any): Promise<EntitiesMetaBaseIframe[]>;
  localizarUrlPainel(id_ee: any): Promise<EntitiesUrl[]>;
}
