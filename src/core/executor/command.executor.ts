//Здесь будет наш исполнитель
//Здесь должен быть 1) ввод данных, 2)билд нашей команды, 3) spawn + какие-то возможности для дополнительных действий, 4) процесс стрим

import { ChildProcessWithoutNullStreams } from 'child_process';
import {IStreamLogger} from '../handlers/stream-logger.interface'
import {ICommandExec} from './command.types'

export abstract class CommandExecutor<Input> {

    //CommandExecutor должен получать логгер, потому что он будет использоваться, это будет IStreamLogger, потому что когда мы будем process stream нам нужно будет его прокинуть туда
    constructor(private logger: IStreamLogger) {}

    //Здесь в execute мы должны последовательно вызвать prompt, build, spawn, processStream
    public async execute() {
        const input = await this.prompt()
        const command = this.build(input)
        const stream = this.spawn(command)
        this.processStream(stream, this.logger)
    }

    //сделаем protected что бы мы не показывали эту реализацию внаружу. Мы по сути должны вызвать метод --> дальше в этом методе собирается ввод пользователя и выдается какой-то инпут. Эти методы должны быть асенхроными потому что возврат должен быть Промис нашего ввода prompt. Теперь нужно сказать Промис от чего, потому что для каждого нашего execute инпут свой, по-этому сделаем вот здесь дженерик class CommandExecutor<Input> который мы будем использовать в методе prompt. То-есть мы когда делаем эксекьюетр - мы знаем что должно проходить на выходе нашего prompt, то-есть мы запросили два параметра, три, пять, то эти параметры будут описываться интерфейсом Input
    protected abstract prompt(): Promise<Input>
    protected abstract build(input: Input): ICommandExec//возвращает что-то для выполнение команды
    protected abstract spawn(command: ICommandExec): ChildProcessWithoutNullStreams//после того как мы получили результат выполнения build - нам нужно перейти в спавн и возвращает стрим который мы должны передать дальше
    protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void//у нас processStream может обрабатываться различными Логерами и как раз логгер который нам прийдет в конструктор мы сюда и запехнём

    //То-есть мы теперь понимаем что мы в CommandExecutor передаём private logger: IStreamLogger(это наш out, логгер какой-то, какая-то конкретная реализация) и мы его прокидываем в processStream
}