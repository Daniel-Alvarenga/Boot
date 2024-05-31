import { prisma } from "../../../prisma/client";
import { AppError } from "../../../errors/error";
import { ReagirVinculoDTO } from "../../interfaces/sharedDTOs";
import { encontrarEntidadePeloEmail } from "./helpers/helpers";

export class IgnoreVinculoUseCase {
    async execute({ email, sender, recipient, senderIdentifier, recipientIdentifier }: ReagirVinculoDTO) {
        if (!email || !sender || !recipient || !senderIdentifier || !recipientIdentifier) {
            throw new AppError("Parâmetros insuficientes ou inválidos.");
        }

        if (recipient != email) {
            throw new AppError("Rementente inválido");
        }

        const senderData = await encontrarEntidadePeloEmail(sender, senderIdentifier);
        const recipientData = await encontrarEntidadePeloEmail(recipient, recipientIdentifier);

        if (!senderData) {
            throw new AppError(`${senderIdentifier.charAt(0).toUpperCase()}${senderIdentifier.slice(1).toLowerCase()} não encontrado.`);
        }

        if (!recipientData) {
            throw new AppError(`${recipientIdentifier.charAt(0).toUpperCase()}${recipientIdentifier.slice(1).toLowerCase()} não encontrado.`);
        }

        const vinculoExists = await prisma.vinculo.findFirst({
            where: {
                alunoId: (senderIdentifier == "ALUNO") ? senderData.id : null,
                professorId: (senderIdentifier == "PROFESSOR") ? senderData.id : null,
                vinculoComAlunoId: (recipientIdentifier == "ALUNO") ? recipientData.id : null,
                vinculoComProfessorId: (recipientIdentifier == "PROFESSOR") ? recipientData.id : null
            },
        });

        if (!vinculoExists) {
            throw new AppError("Solicitação inexistente");
        }

        await prisma.vinculo.delete({
            where: {
                id: vinculoExists.id,
                accepted: false
            }
        });

        return "Solicitação ignorada!";
    }
}