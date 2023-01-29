import { Client } from "pg";


export const connect = () => {

    const hostName: string = process.env.DB_HOST!;
    const port: any = process.env.DB_PORT!;
    const user: string = process.env.DB_USER!;
    const password: string = process.env.DB_PASSWORD!;
    const database: string = process.env.DB_NAME!;

    const client = new Client({
        host: hostName,        
        port: port,
        user: user,        
        password: password,
        database: database    
    });

    return client;
}