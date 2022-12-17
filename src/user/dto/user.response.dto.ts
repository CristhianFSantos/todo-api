export class UserResponseDTO {
  userID: string;
  name: string;
  email: string;

  constructor(partial: Partial<UserResponseDTO>) {
    this.userID = partial.userID;
    this.name = partial.name;
    this.email = partial.email;
  }
}
