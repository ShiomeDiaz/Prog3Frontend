export class UserModel{
    id?: String;
    username: String;
    password?: String;
    clientId?: String;
    role?: number;
    token?: String;
    isLogged: Boolean = false;
}