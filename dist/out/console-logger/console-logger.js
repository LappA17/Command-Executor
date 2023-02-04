"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
class ConsoleLogger {
    //А здесь сделаем статический метод для получение его Инстенса, для того что бы его каждый раз не создавать
    static getInstance() {
        //Если инстенса нет то мы его создаем
        if (!ConsoleLogger.logger) {
            ConsoleLogger.logger = new ConsoleLogger();
        }
        //если есть возвращаем
        return ConsoleLogger.logger;
    }
    log(...args) {
        console.log(...args);
    }
    error(...args) {
        console.log(...args);
    }
    end() {
        console.log('Готово');
    }
}
exports.ConsoleLogger = ConsoleLogger;
