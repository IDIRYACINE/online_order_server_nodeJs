import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

class AuthenticationService{
    #firebaseAuth;

    constructor(firebaseApp){
        this.#firebaseAuth = getAuth();
    }
}

export {AuthenticationService as default}