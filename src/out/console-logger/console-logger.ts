import { IStreamLogger } from "../../core/handlers/stream-logger.interface";

export class ConsoleLogger implements IStreamLogger {
    //Что бы сделать ConsoleLogger паттерном Singleton нам нужно статическое свойство где будет лежать сам инстенс этого Логгера
    private static logger: ConsoleLogger;
    //А здесь сделаем статический метод для получение его Инстенса, для того что бы его каждый раз не создавать
    public static getInstance() {
        //Если инстенса нет то мы его создаем
        if (!ConsoleLogger.logger) {
            ConsoleLogger.logger = new ConsoleLogger()
        }
        //если есть возвращаем
        return ConsoleLogger.logger
    }

    log(...args: any[]): void {
        console.log(...args)
    }
    error(...args: any[]): void {
        console.log(...args)
    }
    end(): void {
        console.log('Готово')
    }
    
}