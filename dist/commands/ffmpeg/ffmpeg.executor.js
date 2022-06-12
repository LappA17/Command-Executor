"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FfmpegExecutor = void 0;
const child_process_1 = require("child_process");
const command_executor_1 = require("../../core/executor/command.executor");
const file_service_1 = require("../../core/files/file.service");
const prompt_service_1 = require("../../core/prompt/prompt.service");
const ffmpeg_builder_1 = require("./ffmpeg.builder");
const stream_handler_1 = require("../../core/handlers/stream.handler");
//CommandExecutor принимает Дженерик, нам нужно сказать с каким инпутом будет работать этот конкретный executor
class FfmpegExecutor extends command_executor_1.CommandExecutor {
    //Все зависимости готовы, prompt - что бы вводить, а файлсервис для того что бы потом конкатенировать пути и удалять файлы
    //Нам в constructor нужно будет передать logger
    constructor(logger) {
        super(logger);
        this.fileService = new file_service_1.FileService(); //у нас один раз выполняется команда, по-этому не страшно что мы будем каждый раз создавать инстенс, потому что мы будем делать всего один раз, потому что команда живет всего один раз
        this.promptService = new prompt_service_1.PromptService();
    }
    prompt() {
        return __awaiter(this, void 0, void 0, function* () {
            const width = yield this.promptService.input('Ширина', 'number');
            const height = yield this.promptService.input('Высота', 'number');
            const path = yield this.promptService.input('Путь до файла', 'input');
            const name = yield this.promptService.input('Имя файла', 'input');
            return { width, height, path, name };
        });
    }
    build({ width, height, path, name }) {
        const output = this.fileService.getFilePath(path, name, 'mp4');
        const args = (new ffmpeg_builder_1.FfmpegBuilder())
            .input(path)
            .setVideoSize(width, height)
            .output(output);
        return { command: 'ffmpeg', args, output };
    }
    spawn({ command, output, args }) {
        //В спавне мы должны удалить файлы если они есть, а что бы удалить файл нужен output, по-этому создадим ICommandExecFfmpeg
        this.fileService.deleteFileIfExists(output); //если бы нам не нужны были такие предварительные манипуляции то можно было бы сделать общий спам, теоритечкски можно было бы построить по другому, типа построить промежуточную фцию prepairsSpawn где будут предварительные действия и уже потом вызвать spawn
        return (0, child_process_1.spawn)(command, args);
    }
    processStream(stream, logger) {
        const handler = new stream_handler_1.StreamHandler(logger);
        handler.processOutput(stream);
    } //В рамках processСтрима мы создали новый handler с уже конкретным logger и вызвали processOutput который будет исполняться на этом логере
}
exports.FfmpegExecutor = FfmpegExecutor;
