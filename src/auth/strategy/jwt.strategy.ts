import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { DoneCallback } from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable({})
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private configService: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: async (req: Request, done: DoneCallback) => {
                try {
                    const secret = this.configService.get<string>('SECRET');
                    if(!secret) throw new Error ('Strategy error: JWT Secret not found');
                    return done(null, secret)
                } catch (error) {
                    return done(error, null)
                }
                
            }
        })
    }
    
    async validate(payload: any) {
        console.log({validate: payload})
        return payload
    }

    
}