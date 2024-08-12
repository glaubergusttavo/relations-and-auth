import { Request, Response, Router } from "express";
import { makeSignUpController } from "../factories/controllers/sign-up";
import { makeLoginUserController } from "../factories/controllers/login";
import { verifyTokenMiddleware } from "../middleware/jwt";
import { makeCreateUserController } from "../factories/controllers/create-user";

const router = Router()

router.post('/signup', async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    const controller = makeSignUpController();

    const response = await controller.handle({
        name,
        email,
        password
    })
    res.status(response.statusCode).json(response.body)
})

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body

    const controller = makeLoginUserController();

    const response = await controller.handle({
        email,
        password
    })
    res.status(response.statusCode).json(response.body)
})

router.post('/createUser', async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    const controller = makeCreateUserController();

    const response = await controller.execute({
        name,
        email,
        password
    })
    res.status(response.statusCode).json(response.body)
})

router.get('/test-auth', verifyTokenMiddleware, (req: Request, res: Response) => {
    res.status(200).json({ message: 'You are authenticated!' })
})

export default router;