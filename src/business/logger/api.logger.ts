const pine = require('pine');

const logger = pine();


export class APILogger {

    info(message: string, data: any | null | undefined) {
        logger.info(`${message}   ${undefined != data ? JSON.stringify(data) : ''}`);
    }

    error(message: any) {
        logger.error(message);
    }
}