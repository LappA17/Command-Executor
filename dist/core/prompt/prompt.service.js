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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptService = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
class PromptService {
    //Пока что нам нужен только Инпут
    input(message, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const { result } = yield inquirer_1.default.prompt([
                {
                    type,
                    name: 'result',
                    message //сообщение которое мы будем отображать
                }
            ]); //Мы можем вместо const data прописать const { result }, так как мы понимаем из документации inquirer что если мы указываем именно name: 'result', тот тут прийдет result. Почему здесь указывается имя - потому что можно передать сразу несколько вопросов, потому что это массив и мы передаем условно тип такой, месседж такой и нейм такой, и потом еще раз тип такой, месседж такой и тд. И здесь в результате объекта const { result } у нас все указанные в name переменных появляются
            return result;
        });
    } //Наш инпут возвращает any, по-этому нам нужно дотипизировать и вернуть Дженерик. Теперь когда мы сделали input<T> и <{ result: T }> у нас стала типизация чуть лучше и когда мы захотим скзать что нам будет нужен инпут number то мы сможем это затипизировать
}
exports.PromptService = PromptService;
