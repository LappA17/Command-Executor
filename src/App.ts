import { DirExecuter } from "./commands/dir/dir.executor"
import { FfmpegExecutor } from "./commands/ffmpeg/ffmpeg.executor"
import { PromptService } from "./core/prompt/prompt.service"
import { ConsoleLogger } from "./out/console-logger/console-logger"

export class App {
    async run() {
        //Мы создадим здесь наш executor - FfmpegExecutor и туда передаем logger
        new FfmpegExecutor(ConsoleLogger.getInstance()).execute()//те мы в апи там где нам нужно берем executоr который нам нужен, туда передаем нужный логгер и получаем комбинацию executor и логгера

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
    }
}

const app = new App()
app.run()

//inquirer Нужно для него отдельно поставить Тайпсы, так как это ДТС npm i -D @types/inquirer