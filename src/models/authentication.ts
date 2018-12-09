export interface ILogin {
    email:string;
    password:string;
}

export interface IRegister {
    name:string;
    surname:string;
    email:string;
    password:string;
    confirmPassword:string;
    profilePictureStorageURL:string;
    localPictureStorageURL:string;
}

export interface IResetPassword {
    email: string;
}

export interface IPrivateCard {
    description:string,
    headerOne:string,
    headerTwo:string,
    isChecked:boolean,
    color:string
}