import {User} from "@types";
import {BaseCrudService} from "../base-crud";

class UserService extends BaseCrudService<User> {
  constructor() {
    super({endpoint: 'user'});
  }
}

export const userService = new UserService();
