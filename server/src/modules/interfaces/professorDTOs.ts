export interface InitProfessorDTO {
    email: string
}

export interface LoginProfessorDTO {
    email: string,
    password: string
}

export interface ValidateProfessorDTO {
    email: string,
    temporaryPassword: string,
    newPassword: string
}

export interface RecoveryProfessorDTO {
    name: string,
    email: string
}

export interface ValidateRecoveryDTO {
    email: string,
    recoveryPass: string,
    newPass: string
}

export interface CreateActivityDTO {
    title: string;
    descricao: string;
    professorId: string;
    imagem: Express.Multer.File;
}

export interface RelateAlunoAtividadeDTO {
    alunoId: string;
    atividadeId: string;
    professorId: string;
    mencao: Mencao;
}

export enum Mencao{
    I = "I",
    R = "R",
    B = "B",
    MB = "MB"
}