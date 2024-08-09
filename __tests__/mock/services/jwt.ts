import { JwtService } from "../../../src/use-cases/interfaces/jwt"

export const makeJwtService = (): JwtService => {
  return {
    async createToken(userID: string) {
      return 'test'
    },

    async verifyToken(token: string) {
      return 'test'
    }
  }
}