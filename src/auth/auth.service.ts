/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UserRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../auth/auth-credentials.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
// import { sign } from 'crypto';
// import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
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

async signin(authCredentialsdto:AuthCredentialsDto): Promise<{accessToken: string}>{
  // console.log('authCredentialsDto' , authCredentialsdto)
    const {username, password} = authCredentialsdto;
      
   const user = await this.userRepository.findOneBy({username: username})
     
   console.log(user)

   if( user && user.password ===  password ){
    const payload: JwtPayload = {username};
    const accessToken: string = await this.jwtService.sign(payload);
    return{ accessToken };
   }
   else{
    throw new UnauthorizedException('Please check your login credentials');
   }

}
}
