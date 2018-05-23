import { UserRoute } from "../../shared/models/userRoute.model";

export interface UserRouteAdmin extends UserRoute {
    roles: string;
}
