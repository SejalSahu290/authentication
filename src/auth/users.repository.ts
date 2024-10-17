/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "src/expenses/dto/auth-credentials.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
   
    async createUser(authCredentialsdto:AuthCredentialsDto): Promise<void> {
        const {username , password} = authCredentialsdto;

        const user = this.create({username, password});



        await this.save(user);
    }
}