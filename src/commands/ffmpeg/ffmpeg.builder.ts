// ffmpeg -i /my_path -c:v libx264 -s 1920x1080 /my_path/res.mp4        это то что мы должны в результате получить

export class FfmpegBuilder {
    //Нам нужно финальное накопленная состояние. У нас инпут должен быть вначала, аутпут в конце, а между - набор каких-то опций
    private inputPath: string;
    private options: Map<string, string> = new Map// Map<string, string> - потому что наши эти опции имеют ключ-значение, они в конце все равно будут отдельным элементами массива

    constructor() {
        this.options.set('-c:v', 'libx264')//ключ-'-c:v', значение-'libx264'
    }

    input(inputPath: string): this {
        this.inputPath = inputPath
        return this
    }

    setVideoSize(width: number, height: number): this {
        this.options.set('-s', `${width}x${height}`)//'-s'-ключ, -значение
        return this
    }

    //Если inputPath и options мы хранили, то output мы просто получаем
    output(outputPath: string): string[] {
        if (!this.inputPath) throw new Error('Не задан параметр input')

        const args: string[] = ['-i' , this.inputPath] //То-есть мы по умолчанию заплняем -i и наш путь
        this.options.forEach((value, key) => { //forEach так как это Мапа
            //Сначало идет ключ к примеру -c:v , потом value - libx264
            args.push(key)
            args.push(value)
        })
        args.push(outputPath)//нам outputPath не нужен в хранилище так как это завершающий метод
        return args
    }
}
//Это все вызовы которые нам нужны что бы построить правильные команды, и это удобно потому что для разных параметров мы можем вызывать разную последовательность, доп методы и строить нужную нам output
// new FfmpegBuilder()
// .input('')
// .setVideoSize(1920, 1080)
// .output('//')