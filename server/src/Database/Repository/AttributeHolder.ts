
class AttributeHolder{
    #name : string;
    #value : any;

    constructor(name :string , value : any){
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

export default AttributeHolder