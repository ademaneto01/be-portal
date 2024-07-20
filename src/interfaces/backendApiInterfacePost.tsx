import {
  EntitiesUserLogin,
} from '@/entities';

export default interface BackendApiInterfacePost {
  userLogin(userData: any): Promise<EntitiesUserLogin[]>;
 
}
