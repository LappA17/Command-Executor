import inquirer from 'inquirer'
import { PromptType } from './prompt.types'

export class PromptService {
    //Пока что нам нужен только Инпут
    public async input<T> (message: string, type: PromptType) { //в этот инпут мы можем передавать то что будет приходить из-вне(тайп, сообщение), что бы сделать инкапсуляцию
        const { result } = await inquirer.prompt<{ result: T }>([ //В Промпте мы должны задать набор вопросов и получить ответ
            {
                type,//помни что type: type просто пишется один раз type
                name: 'result',//name - имя в какую переменную он будет возвращать
                message//сообщение которое мы будем отображать
            }
        ]) //Мы можем вместо const data прописать const { result }, так как мы понимаем из документации inquirer что если мы указываем именно name: 'result', тот тут прийдет result. Почему здесь указывается имя - потому что можно передать сразу несколько вопросов, потому что это массив и мы передаем условно тип такой, месседж такой и нейм такой, и потом еще раз тип такой, месседж такой и тд. И здесь в результате объекта const { result } у нас все указанные в name переменных появляются
        return result
    }//Наш инпут возвращает any, по-этому нам нужно дотипизировать и вернуть Дженерик. Теперь когда мы сделали input<T> и <{ result: T }> у нас стала типизация чуть лучше и когда мы захотим скзать что нам будет нужен инпут number то мы сможем это затипизировать
}