import { Auth } from "firebase-admin/lib/auth/auth";


let firebaseAuth : Auth;


export function loginWithUsernameAndPassword(username:string , password : string) : boolean{
    return true
}

export function setUpFirebaseAuth(auth : Auth){
    firebaseAuth = auth
}


