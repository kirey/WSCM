import { Role } from "./../../admin/users/models";

export class UserRoute {
    id: number;
    url: string;
    description: string;
    kjcApplicationRoleses: Role[];
}