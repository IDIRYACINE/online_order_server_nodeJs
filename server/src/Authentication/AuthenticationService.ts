import { Auth,getAuth, createUserWithEmailAndPassword } from "firebase/auth";

class AuthenticationService{
    #firebaseAuth : Auth;

    constructor(firebaseApp ){
        this.#firebaseAuth = getAuth();
    }
}

export default AuthenticationService 