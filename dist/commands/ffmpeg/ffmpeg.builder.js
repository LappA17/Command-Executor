"use strict";
// ffmpeg -i /my_path -c:v libx264 -s 1920x1080 /my_path/res.mp4        это то что мы должны в результате получить
Object.defineProperty(exports, "__esModule", { value: true });
exports.FfmpegBuilder = void 0;
class FfmpegBuilder {
    constructor() {
        this.options = new Map; // Map<string, string> - потому что наши эти опции имеют ключ-значение, они в конце все равно будут отдельным элементами массива
        this.options.set('-c:v', 'libx264'); //ключ-'-c:v', значение-'libx264'
    }
    input(inputPath) {
        this.inputPath = inputPath;
        return this;
    }
    setVideoSize(width, height) {
        this.options.set('-s', `${width}x${height}`); //'-s'-ключ, -значение
        return this;
    }
    //Если inputPath и options мы хранили, то output мы просто получаем
    output(outputPath) {
        if (!this.inputPath)
            throw new Error('Не задан параметр input');
        const args = ['-i', this.inputPath]; //То-есть мы по умолчанию заплняем -i и наш путь
        this.options.forEach((value, key) => {
            //Сначало идет ключ к примеру -c:v , потом value - libx264
            args.push(key);
            args.push(value);
        });
        args.push(outputPath); //нам outputPath не нужен в хранилище так как это завершающий метод
        return args;
    }
}
exports.FfmpegBuilder = FfmpegBuilder;
//Это все вызовы которые нам нужны что бы построить правильные команды, и это удобно потому что для разных параметров мы можем вызывать разную последовательность, доп методы и строить нужную нам output
// new FfmpegBuilder()
// .input('')
// .setVideoSize(1920, 1080)
// .output('//')
