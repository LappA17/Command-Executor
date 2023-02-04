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
exports.FileService = void 0;
const fs_1 = require("fs"); //fs - это файл-систем модуль который работает с файловой системой в ноде
const path_1 = require("path"); //Позволяет join пути которые мы указали, причем не просто Джоинить, а с учетом шагов назад и так далее. Dirname - позвоялет получить директорию
class FileService {
    //метод на проверку существования файла
    isExist(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.stat(path); // если он может получить stat(статистику файла) - то все хорошо,файл есть
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    //Нам нужно будет путь преобразовывать
    getFilePath(path, name, ext) {
        //нам нужно проверить путь у нас абсолютный или относительный
        if (!(0, path_1.isAbsolute)(path)) {
            path = (0, path_1.join)(__dirname + '/' + path); //делаем join из текущей директории
        }
        return (0, path_1.join)((0, path_1.dirname)(path) + '/' + name + '.' + ext); //'.' потому что разреешение через точку
    } //так мы получим финальный путь
    //Так же нам нужно удалить файл если он существует
    deleteFileIfExists(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isExist(path)) {
                fs_1.promises.unlink(path); // unlink - удаление файла по пути который мы в него передаем
            }
        });
    }
}
exports.FileService = FileService;
//Благодаря getFilePath мы будем получать полный путь сохранения и deleteFileIfExists - удалять файл перед спавно если такой файл имеется. По-сути это дополнительный хелпер функции, который позволит нам реалзиовать полностью executor, уже не в Коре а в команде ffmpeg, который сбилдет, получит инпуты, спавнит и в результате выведит аутпут - все готово что бы реализовать конкретный ffmpeg executor
