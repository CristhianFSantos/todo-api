export class RecoverPasswordResponseDTO {
  userID: string;
  name: string;
  email: string;

  constructor(partial: Partial<RecoverPasswordResponseDTO>) {
    this.userID = partial.userID;
    this.name = partial.name;
    this.email = partial.email;
  }
}
