import { NextFunction, Request, Response } from 'express';
//
import { IndexService } from '@services';
import { GreetingRequest } from '@validators';

export default class IndexController {

    private service = new IndexService();

    /*
    * Health check
    */
    public healthcheck = (req: Request, res: Response) => {
        res.sendStatus(200);
    };

    /*
    * Welcome
    */
    public index = (req: Request, res: Response) => {
        res.status(200).json({ data: null, message: 'Its working dude!' });
    }

    /*
    * Greetings
    */
    public greetings = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body: GreetingRequest = req.body;
            const data: String = await this.service.greetings(body.name);
            res.status(200).json({ data, message: 'Greeting' });
        } catch (error) {
            next(error);
        }
    }
}