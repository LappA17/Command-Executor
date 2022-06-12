import { promises } from "fs";//fs - это файл-систем модуль который работает с файловой системой в ноде
import { dirname, isAbsolute, join } from "path"; //Позволяет join пути которые мы указали, причем не просто Джоинить, а с учетом шагов назад и так далее. Dirname - позвоялет получить директорию

export class FileService {
    //метод на проверку существования файла
    private async isExist(path: string) { //path - путь для файла
        try {
            await promises.stat(path)// если он может получить stat(статистику файла) - то все хорошо,файл есть
            return true
        } catch {
            return false
        }
    }

    //Нам нужно будет путь преобразовывать
    public getFilePath(path: string, name: string, ext: string): string { //name-это имя файла, ext-это разшерение(екстеншен)
        //нам нужно проверить путь у нас абсолютный или относительный
        if (!isAbsolute(path)) {
            path = join(__dirname + '/' + path)//делаем join из текущей директории
        }
        return join(dirname(path) + '/' + name + '.' + ext)//'.' потому что разреешение через точку
    }//так мы получим финальный путь

    //Так же нам нужно удалить файл если он существует
    async deleteFileIfExists(path: string) {
        if (await this.isExist(path)) {
            promises.unlink(path)// unlink - удаление файла по пути который мы в него передаем
        }
    }
}
//Благодаря getFilePath мы будем получать полный путь сохранения и deleteFileIfExists - удалять файл перед спавно если такой файл имеется. По-сути это дополнительный хелпер функции, который позволит нам реалзиовать полностью executor, уже не в Коре а в команде ffmpeg, который сбилдет, получит инпуты, спавнит и в результате выведит аутпут - все готово что бы реализовать конкретный ffmpeg executor