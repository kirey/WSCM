export class ActivateUser {
    password: string;
    mailHashSecret: string;
    code: string;
    hashCode: string;

    constructor(
        password: string,
        mailHashSecret: string,
        code: string,
        hashCode: string,
    ) {
        this.password = password;
        this.mailHashSecret = mailHashSecret;
        this.code = code;
        this.hashCode = hashCode;
    }
}