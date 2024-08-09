import { NextFunction, Request, Response } from "express"
import { JsonWebTokenService } from "../services/jwt"

export const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
  
    if (!authorization) {
      return res.status(401).json({ message: 'Unauthorized!' })
    }
  
    const [, token] = authorization.split(' ')
  
    const jwtService = new JsonWebTokenService()
    const tokenDecodedOrError = await jwtService.verifyToken(token)
  
    if (tokenDecodedOrError instanceof Error) {
      return res.status(401).json({ message: 'Unauthorized!' })
    }
  
    next()
  }
  