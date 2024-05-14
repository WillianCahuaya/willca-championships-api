import { Logger, Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { ConfigService, ConfigKey } from '@config/index';
import { UserService } from '@authentication/services/index';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    private readonly logger = new Logger(JwtStrategy.name);

    constructor (
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get(ConfigKey.JWT_ACCESS_SECRET),
        });
    }

    async validate(payload: any, done: (error: any, user?: any) => void) {
        this.logger.debug(`[validateToken] request: ${JSON.stringify({ payload })}`);
        try {
            await this.userService.validateIfExistTokens(payload.username);
            done(null, payload);
            return payload;
        } catch (err) {
            throw new UnauthorizedException('Token invalid', err.message);
        }
    }
}
