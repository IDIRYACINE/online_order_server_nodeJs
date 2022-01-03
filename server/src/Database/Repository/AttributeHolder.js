
class AttributeHolder{
    #name;
    #value;

    constructor(name , value){
        this.#name = name;
        this.#value = value;
    }

    get name(){
        return this.#name;
    }

    get value(){
        return this.#value;
    }

    set value(value){
        this.#value = value;
    }

}