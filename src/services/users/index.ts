import {User} from "@types";
import {BaseService} from "../base-service";

export class UserService extends BaseService<User> {
  constructor() {
    super({endpoint: 'user'});
  }
}
