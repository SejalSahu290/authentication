/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "jsonwebtoken";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){
        super({
            secretOrKey:'topSecrete51',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

        });
}

async validate(payload: JwtPayload) : Promise<User>{
    const { username } = payload;
    const user: User = await this.userRepository.findOneBy({username: username});

    if(!user){
        console.log('I am un auth')
        throw new UnauthorizedException();
    }

    return user;
}

}