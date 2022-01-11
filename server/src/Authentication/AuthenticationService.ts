import { Auth } from "firebase-admin/lib/auth/auth";

class AuthenticationService{
    #firebaseAuth : Auth;

    constructor(auth : Auth){
        this.#firebaseAuth = auth;
    }
}

export default AuthenticationService 