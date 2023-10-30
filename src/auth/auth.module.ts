import {Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/user/user.model';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
    imports: [SequelizeModule.forFeature([UserModel]), JwtModule.register({}), UserModule],
    exports: [SequelizeModule],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController]
})

export class AuthModule {}