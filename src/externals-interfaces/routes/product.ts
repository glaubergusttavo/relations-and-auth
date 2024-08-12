import { Request, Response, Router } from "express";
import { makeCreateProductController } from "../factories/controllers/create-product";
import { verifyTokenMiddleware } from "../middleware/jwt";

const router = Router();

router.post('/createProduct', verifyTokenMiddleware, async (req: Request, res: Response) =>{
    const {userId, type, mark, price} = req.body

    const controller = makeCreateProductController();

    const response = await controller.execute({
        userId,
        type,
        mark,
        price
    })

    res.status(response.statusCode).json(response.body)
})

export default router;