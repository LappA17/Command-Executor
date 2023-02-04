import { ICommandExec } from "../../core/executor/command.types";

export interface IFfmpegInput { //Это будет Инпут нашей конкретной команды
    //Нам нужно что бы нам ввели:
    width: number;
    height: number;
    path: string; //путь до файла
    name: string; //имя файла
}

export interface ICommandExecFfmpeg extends ICommandExec {
    output: string;
}