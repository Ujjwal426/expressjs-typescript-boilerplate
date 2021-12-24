import { Router } from "express";
//
import { Route } from "@interfaces";
import { IndexController } from "@controllers";
import { validateRequest } from "@middlewares";
import { GreetingRequest } from "@validators";

export default class IndexRoutes implements Route {

    router = Router();
    controller = new IndexController();

    constructor() {
        this.router.get('/healthcheck', this.controller.healthcheck);
        this.router.get('/', this.controller.index);
        this.router.post('/greetings', validateRequest(GreetingRequest, 'body'), this.controller.greetings);
    }

}