import { Injectable } from '@nestjs/common';
import { WelcomeMessage } from '../interfaces/interfaces';

@Injectable()
export class WelcomeService {

    getWelcomeMessage(): WelcomeMessage {
        return {
            welcome: 'Welcome to Service Orders API',
            ok: true
        }
    }

}
