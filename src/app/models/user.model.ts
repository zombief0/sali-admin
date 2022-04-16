export class UserModel{
  role: string;
  token: string;
  username: string;
  tokenExpirationDate: Date;


  get getToken(): string {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this.token;
  }
}
