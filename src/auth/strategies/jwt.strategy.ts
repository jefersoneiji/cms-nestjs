import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from "../jwt-payload.interface";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: any) => {
                    return request?.cookies?.Authentication || request?.Authentication;
                }
            ]),
            secretOrKey: "super_secret"
        });
    }

    async validate({ userId }: JwtPayload) {
        return this.userService.getUser({ _id: userId });
    }
}