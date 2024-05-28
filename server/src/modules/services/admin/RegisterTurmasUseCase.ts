import { Turma } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { RegisterTurmaDTO } from "../../interfaces/adminDTOs"
import { AppError } from "../../../errors/error";

export class RegisterTurmasUseCase {
    async execute({ inicio, fim, cursoName }: RegisterTurmaDTO): Promise<{ cursoName: string, turma: Pick<Turma, 'inicio' | 'fim'> }> {

        if (!inicio || !fim || !cursoName) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        const Curso = await prisma.curso.findFirst({
            where: {
                name: cursoName
            }
        });

        if (!Curso) {
            throw new AppError("Curso inválido!")
        }

        const turmaAlreadyExists = await prisma.turma.findFirst({
            where: {
                inicio: inicio,
                fim: fim,
                cursoId: Curso.id
            }
        });

        if (turmaAlreadyExists) {
            throw new AppError("Turma já existente!")
        } else {

            const turma = await prisma.turma.create({
                data: {
                    inicio: inicio,
                    fim: fim,
                    cursoId: Curso.id
                }
            });

            if (!turma) {
                throw new AppError("Erro ao cadastrar turma!");
            }

            return {
                cursoName: cursoName,
                turma: {
                    inicio: turma.inicio,
                    fim: turma.fim
                }
            };
        }
    }
}
