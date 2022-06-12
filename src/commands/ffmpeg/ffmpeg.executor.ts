import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { CommandExecutor } from '../../core/executor/command.executor'
import { ICommandExec } from '../../core/executor/command.types';
import { FileService } from '../../core/files/file.service';
import { IStreamLogger } from '../../core/handlers/stream-logger.interface';
import { PromptService } from '../../core/prompt/prompt.service';
import { IFfmpegInput, ICommandExecFfmpeg } from './ffmpeg.types';
import { FfmpegBuilder } from './ffmpeg.builder'
import { StreamHandler } from '../../core/handlers/stream.handler';

//CommandExecutor принимает Дженерик, нам нужно сказать с каким инпутом будет работать этот конкретный executor
export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
    private fileService: FileService = new FileService()//у нас один раз выполняется команда, по-этому не страшно что мы будем каждый раз создавать инстенс, потому что мы будем делать всего один раз, потому что команда живет всего один раз
    private promptService: PromptService = new PromptService()
    //Все зависимости готовы, prompt - что бы вводить, а файлсервис для того что бы потом конкатенировать пути и удалять файлы

    //Нам в constructor нужно будет передать logger
    constructor(logger: IStreamLogger) {
        super(logger)
    }

    protected async prompt(): Promise<IFfmpegInput> {
        const width = await this.promptService.input<number>('Ширина', 'number')
        const height = await this.promptService.input<number>('Высота', 'number')
        const path = await this.promptService.input<string>('Путь до файла', 'input')
        const name = await this.promptService.input<string>('Имя файла', 'input')
        return { width, height, path, name}
    }

    protected build({ width, height, path, name }: IFfmpegInput): ICommandExecFfmpeg {
        const output = this.fileService.getFilePath(path, name, 'mp4')
        const args = (new FfmpegBuilder())
            .input(path)
            .setVideoSize(width, height)
            .output(output)
        return { command: 'ffmpeg', args, output }
    }

    protected spawn({ command, output, args}: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
        //В спавне мы должны удалить файлы если они есть, а что бы удалить файл нужен output, по-этому создадим ICommandExecFfmpeg
        this.fileService.deleteFileIfExists(output);//если бы нам не нужны были такие предварительные манипуляции то можно было бы сделать общий спам, теоритечкски можно было бы построить по другому, типа построить промежуточную фцию prepairsSpawn где будут предварительные действия и уже потом вызвать spawn
        return spawn(command, args);
    }
    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
        const handler = new StreamHandler(logger)
        handler.processOutput(stream)
    }//В рамках processСтрима мы создали новый handler с уже конкретным logger и вызвали processOutput который будет исполняться на этом логере
    //В рамках шаблонного метода мы можем подключать любоей логгер который нам нужен и в результате конфигурировать команды с помощью билдера и получать на выход результируещий аутпут
}