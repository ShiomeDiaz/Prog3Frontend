import { UserModel } from "./user.model";

export class ClientModel{
    id?: String;
    document: String;
    phone: String;
    email: String;
    name: String;
    lastname: String;
    city: String;
    address: String;
    user: UserModel;

}