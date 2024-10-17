/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UserRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from 'src/expenses/dto/auth-credentials.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
// import { sign } from 'crypto';
// import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //create a new auth
  async signup(authCredentialsdto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsdto;

    const user = this.userRepository.create({
      username,
      password,
    });

    await this.userRepository.save(user);
    return;
  }

async signin(authCredentialsdto:AuthCredentialsDto): Promise<void>{
    const {username, password} = authCredentialsdto;

   const user = await this.userRepository.findOneBy({username: username})
    
   if(user.password ===  password ){
    return;
   }
   else{
    throw new UnauthorizedException('Please check your login credentials');
   }

}
}
