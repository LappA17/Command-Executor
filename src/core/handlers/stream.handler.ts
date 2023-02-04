// Здесь будет Хендлер-поток который возвращает наше исполнение spawn. (stream - поток)

import { ChildProcessWithoutNullStreams } from "child_process";
import { IStreamLogger } from "./stream-logger.interface";

export class StreamHandler {
    //Мы должны передавать сюда внутрь внешний разработчик который будет расспологаться в out, по-этому у него есть явное первое параметар constrcutor - это private logger. Этому logger нужно передать задание интерфейса в файле stream-logger-interface.ts
    constructor(private logger: IStreamLogger) {}

    //Теперь нам нужен метод который будем процессить наш stream
    //Мы устанавливаем дополнительные типы для node.js: npm i -D @types/node , и теперь у нас появился ChildProcessWithoutNullStreams и мы можем по-нормальному использовать ТС и node.js
    processOutput(stream: ChildProcessWithoutNullStreams) {
        //теперь подпишемся на этот стрим
        stream.stdout.on('data', (data: any) => {
            this.logger.log(data.toString())//нужно делать дату ту стринг потому что может быть буффером даты
        });

        //ошибка
        stream.stderr.on('data', (data: any) => {
            this.logger.error(data.toString())
        });

        //Здесь уже подписка на события, окончание работы нашего spawn
        stream.stderr.on('close', () => {
            this.logger.end()
        });
    }//таким образом мы проксировали stream: ChildProcessWithoutNullStreams в наш logger. Это близко к паттерну Прокси, когда мы берем и ставим вперед нашего logger, проксю которую получает stream и дальше передает его в логгер, по-сути мы отпроксировали стрим внутри логгера
}