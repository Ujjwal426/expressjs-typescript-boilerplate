import { HttpException } from "@exceptions";
import { isEmpty } from "@utils/emptycheck";

export default class IndexService {

    /**
     * Greetings
    */
    public async greetings(name: string): Promise<string> {
        if (isEmpty(name)) throw new HttpException(400, 'Bad Request');
        return `Hello ${name}`;
    }
}