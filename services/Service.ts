import {Model} from "mongoose";

export class Service<IEntity>{
    protected model : Model<IEntity>;
    constructor(model : Model<IEntity>){
        this.model = model;
    }
}