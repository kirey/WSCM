export class UserData {
    email: string;
    defaultLanguage: string;
    password: string;

    constructor(email: string, defaultLanguage: string) {
        this.email = email;
        this.defaultLanguage = defaultLanguage;
        this.password = '';
    }
}