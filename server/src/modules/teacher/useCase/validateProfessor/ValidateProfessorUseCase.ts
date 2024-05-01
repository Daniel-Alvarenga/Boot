import { Professor } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { ValidateProfessorDTO } from "../../dtos/ValidateProfessorDTO";
import { AppError } from "../../../../errors/error";

const bcrypt = require('bcrypt');

export class ValidateProfessorUseCase{
    async execute({ email, temporaryPassword, newPassword } : ValidateProfessorDTO):  Promise< Professor >{

        const professor = await prisma.professor.findFirst({
            where: {
                email,
                validated: false
            }
        });

        if (!professor){
            throw new AppError("Email não cadastrado ou professor já validado!");
        } 

        
        const isPasswordValid = bcrypt.compareSync(temporaryPassword, professor.password);
        
        if(!isPasswordValid){
            throw new AppError("Senha invalida!");
        }
        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);

        const professorUpdate = await prisma.professor.update({
            where: {
                email,
            },
            data:{
                password: hash,
                validated: true
            }
        });

        if (!professorUpdate){
            throw new AppError("Erro ao autenticar professor!");
        }

        return professorUpdate;
    }
}