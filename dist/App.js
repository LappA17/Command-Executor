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
exports.App = void 0;
const ffmpeg_executor_1 = require("./commands/ffmpeg/ffmpeg.executor");
const console_logger_1 = require("./out/console-logger/console-logger");
class App {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            //Мы создадим здесь наш executor - FfmpegExecutor и туда передаем logger
            new ffmpeg_executor_1.FfmpegExecutor(console_logger_1.ConsoleLogger.getInstance()).execute(); //те мы в апи там где нам нужно берем executоr который нам нужен, туда передаем нужный логгер и получаем комбинацию executor и логгера
            //new DirExecuter(ConsoleLogger.getInstance()).execute()
            // /Users/Ruslan/Desktop/Work/command-executor/: //это путь который мы вставили
            // total 112
            // drwxr-xr-x   7 Ruslan  staff    224 12 июн 20:11 dist
            // drwxr-xr-x  56 Ruslan  staff   1792 11 июн 23:37 node_modules
            // -rw-r--r--   1 Ruslan  staff  38378 12 июн 13:20 package-lock.json
            // -rw-r--r--   1 Ruslan  staff    144 12 июн 13:20 package.json
            // drwxr-xr-x   7 Ruslan  staff    224 11 июн 23:39 src
            // -rw-r--r--   1 Ruslan  staff  10999 12 июн 17:08 tsconfig.json
            // Готово
        });
    }
}
exports.App = App;
const app = new App();
app.run();
//inquirer Нужно для него отдельно поставить Тайпсы, так как это ДТС npm i -D @types/inquirer
