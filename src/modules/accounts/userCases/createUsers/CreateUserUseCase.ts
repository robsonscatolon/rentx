import { inject, injectable } from "tsyringe"
import { ICreateUsersDTO } from "../../dtos/ICreateUsersDto"
import { UsersRepository } from "../../repositories/implementations/UsersRepository"
import { hash } from "bcryptjs"
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(@inject("UsersRepository")
    private usersRepository: IUsersRepository
    ) { }

    async execute({name, email, password, driver_license}: ICreateUsersDTO): Promise<void> {

        const emailAlreadyExists = await this.usersRepository.findByEmail(email);

        if(emailAlreadyExists){
            throw new AppError("User already exists!")
        }

        const passwordEncrypt = await hash(password, 8)

        await this.usersRepository.create({
            name,
            email, 
            password: passwordEncrypt,
            driver_license
        })
    }

}

export { CreateUserUseCase }