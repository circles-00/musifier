import { UserService as LoopbackUserService } from '@loopback/authentication'
import { UserWithRelations } from '@loopback/authentication-jwt'
import { HttpErrors } from '@loopback/rest'
import { securityId, UserProfile } from '@loopback/security'
import { Repository, typeorm } from '@loopback/typeorm'
import { compare } from 'bcryptjs'
import { User } from '../../../entities/user.entity'

export type Credentials = {
  email: string
  password: string
}

export class UserService implements LoopbackUserService<User, Credentials> {
  constructor(
    @typeorm.repository(User) public userRepository: Repository<User>,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<User> {
    const invalidCredentialsError = 'Invalid email or password.'

    const foundUser = await this.userRepository.findOne({
      where: { email: credentials.email },
      relations: ['userCredentials'],
    })

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError)
    }

    const passwordMatched = await compare(
      credentials.password,
      foundUser.userCredentials.password,
    )

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError)
    }

    return foundUser
  }

  convertToUserProfile(user: User): UserProfile {
    return {
      [securityId]: user.id.toString(),
      name: user.username,
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    }
  }

  //function to find user by id
  async findUserById(id: string): Promise<User & UserWithRelations> {
    const userNotfound = 'invalid User'
    const foundUser = await this.userRepository.findOne({
      where: { id },
    })

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(userNotfound)
    }

    return foundUser
  }
}
