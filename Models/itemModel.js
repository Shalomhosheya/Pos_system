export class ItemModel{
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }

    get amount() {
        return this._amount;
    }

    set amount(value) {
        this._amount = value;
    }

    constructor(id,type,title,quantity,amount) {

        this._id = id;
        this._type = type;
        this._title = title;
        this._quantity = quantity;
        this._amount = amount;
    }
}