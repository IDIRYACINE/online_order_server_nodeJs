import { Auth } from "firebase-admin/lib/auth/auth";

class AuthenticationService{
    #firebaseAuth : Auth;

    constructor(auth : Auth){
        this.#firebaseAuth = auth;
    }

    LoginWithUsernameAndPassword(username:string , password : string) : boolean{
        return false
    }
}

export default AuthenticationService 