import {Model} from "mongoose";

export class Repository<IEntity>{
    protected model : Model<IEntity>;
    constructor(model : Model<IEntity>){
        this.model = model;
    }
}