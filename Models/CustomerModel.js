export  class CustomerModel {
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get number() {
        return this._number;
    }

    set number(value) {
        this._number = value;
    }


    constructor(id,name,address,number) {
       this._id = id;
        this._name = name;
        this._address = address;
        this._number = number;
    }

}
