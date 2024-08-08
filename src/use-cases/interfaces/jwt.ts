export interface JwtService{
    createToken(userId: string): Promise<string>
    verifyToken(token: string): Promise<string | Error>
}