import { UserType } from '@prisma/client';

export interface IUser {
  name: string
  email: string
  password: string
  type: UserType
}

export interface IEvolution {
  name: string
  pacientId: number
  created_at: Date
  text: string
  pictures: string[]
}
