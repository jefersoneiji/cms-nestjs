import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { PERMISSIONS_KEY } from "../decorators";
import { UserService } from "src/user/user.service";
import { Permissions } from "../enums";

@Injectable()
export class RequiredPermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector, private userService: UserService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const required_permission = this.reflector.getAllAndOverride<Permissions[]>(PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (!required_permission) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        
        if (user.role === 'admin') { return true; }
        return this.userService.check_permission(user.role, required_permission[0]);
    }
}