export class SignInResponseDTO {
  userID: string;
  email: string;
  name: string;
  token: string | null;
  tokenExpiration: Date | null;

  constructor(partial: Partial<SignInResponseDTO>) {
    this.userID = partial.userID;
    this.email = partial.email;
    this.name = partial.name;
    this.token = partial.token ?? null;
    this.tokenExpiration = partial.tokenExpiration ?? null;
  }
}
