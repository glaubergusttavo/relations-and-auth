import jwt from 'jsonwebtoken'
import { JwtService } from '../../use-cases/interfaces/jwt';

export class JsonWebTokenService implements JwtService {
    async createToken(userId: string) {

        const token = jwt.sign(userId, process.env.SECRET_KEY || '')

        return token
    }
    async verifyToken(token: string) {
        try {
            const tokenDecoded = jwt.verify(token, process.env.SECRET_KEY || '')

            return tokenDecoded.toString()
        } catch (error) {
            return new Error('Invalid token!')
        }
    }
}