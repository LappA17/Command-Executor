//Это то что мы будем в результате возвращать как команду - то что должен возвращать protected abstract build() и то что принимает spawn()
export interface ICommandExec {
    command: string;
    args: string[];
}