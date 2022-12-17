export class SignUpResponseDTO {
  userID: string;
  name: string;
  email: string;

  constructor(partial: Partial<SignUpResponseDTO>) {
    this.userID = partial.userID;
    this.name = partial.name;
    this.email = partial.email;
  }
}
