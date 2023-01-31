import { connect } from "../../business/config/db.config";
import { User } from "../../business/model/User";
import { APILogger } from "../../business/logger/api.logger";
import { UserQuery } from "../../business/queries/UserQuery";

export class PsqlUserQueries implements UserQuery {
    private logger: APILogger;

    constructor() {
        this.logger = new APILogger;
    }

    async findUserById(id: number): Promise<User | null >{    
        const client = connect();
        await client
            .connect()
            .catch((err) => this.logger.error(err));

        const {rows} = await client.query(`SELECT * FROM users WHERE id = $1`, [id]);
        await client.end();    
        
        if (rows.length > 0) {
            return rows[0];    
        } else {
            return null    
        }
    }


    async findUserByEmail(email: string): Promise<User | null >{    
        const client = connect();
        await client
            .connect()
            .catch((err) => this.logger.error(err));

        const {rows} = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);
        await client.end();    
        
        if (rows.length > 0) {
            return rows[0];    
        } else {
            return null    
        }
    }

    async createNewUser(email: string, hashedPassword: string, salt: string): Promise<User | null> {
        const client = connect();
        await client
            .connect()
            .catch((err) => this.logger.error(err));
        
        const {rows} = await client.query(
            `INSERT INTO users (username, password, email, created_on, salt) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4) returning *`, 
            [email, hashedPassword, email, salt]
        );

        await client.end();

        if (rows.length > 0) {
            return rows[0];    
        } else {
            return null    
        }
    }
}

