import { Router } from "express";
import { CreateUserController } from "../modules/accounts/userCases/createUsers/CreateUserController";

const usersRoutes = Router()
const createUserController = new CreateUserController()

usersRoutes.post("/", createUserController.handle)


export { usersRoutes }