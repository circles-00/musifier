import { authenticate, TokenService } from '@loopback/authentication'
import {
  Credentials,
  TokenServiceBindings,
  UserServiceBindings,
} from '@loopback/authentication-jwt'
import { inject } from '@loopback/core'
import { model, property } from '@loopback/repository'
import {
  api,
  get,
  patch,
  post,
  requestBody,
  SchemaObject,
} from '@loopback/rest'
import { SecurityBindings, securityId, UserProfile } from '@loopback/security'
import { Repository, typeorm } from '@loopback/typeorm'
import { genSalt, hash } from 'bcryptjs'
import { omit } from 'lodash'
import { User } from '../../../entities/user.entity'
import { UserService } from '../services/user.service'

@model()
export class NewUserRequest implements Pick<User, 'email'> {
  @property({
    type: 'string',
    required: true,
  })
  email: string

  @property({
    type: 'string',
    required: true,
  })
  password: string
}

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 6,
    },
  },
}

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': { schema: CredentialsSchema },
  },
}

const RegisterSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password', 'fullName'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    fullName: {
      type: 'string',
      minLength: 5,
    },
    password: {
      type: 'string',
      minLength: 6,
    },
  },
}

export const RegisterRequestBody = {
  description: 'The input of register function',
  required: true,
  content: {
    'application/json': { schema: RegisterSchema },
  },
}

const UpdateUserSchema: SchemaObject = {
  type: 'object',
  required: ['fullName'],
  properties: {
    fullName: {
      type: 'string',
      minLength: 5,
    },
  },
}

export const UpdateUserRequestBody = {
  description: 'The input of register function',
  required: true,
  content: {
    'application/json': { schema: UpdateUserSchema },
  },
}

@api({ basePath: '/auth' })
export class AuthController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService,
    @inject(SecurityBindings.USER, { optional: true })
    public user: UserProfile,
    @typeorm.repository(User) protected userRepository: Repository<User>,
  ) {}

  @post('/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{ accessToken: string }> {
    const user = await this.userService.verifyCredentials(credentials)
    const userProfile = this.userService.convertToUserProfile(user)

    const accessToken = await this.jwtService.generateToken(userProfile)

    return { accessToken }
  }

  @post('/register', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async register(
    @requestBody(RegisterRequestBody)
    newUserRequest: NewUserRequest,
  ): Promise<User> {
    const password = await hash(newUserRequest.password, await genSalt())
    const savedUser = await this.userRepository.save({
      ...omit(newUserRequest, 'password'),
      userCredentials: {
        password,
      },
    })

    return savedUser
  }

  @authenticate('jwt')
  @get('/me', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async me(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<User | null> {
    return this.userRepository.findOne({
      // eslint-disable-next-line security/detect-object-injection
      where: { id: currentUserProfile[securityId] },
    })
  }

  @authenticate('jwt')
  @patch('/user', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async updateUser(
    @requestBody(UpdateUserRequestBody)
    user: Partial<User>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<User> {
    return this.userRepository.save({
      // eslint-disable-next-line security/detect-object-injection
      id: currentUserProfile[securityId],
      ...user,
    })
  }
}
