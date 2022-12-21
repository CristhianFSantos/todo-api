export class TodoResponseDTO {
  todoID: string;
  title: string;
  completed: boolean;
  description: string;
  createdAt: string;
  userID: string;

  constructor(partial: Partial<TodoResponseDTO>) {
    this.todoID = partial.todoID;
    this.title = partial.title;
    this.completed = partial.completed;
    this.description = partial.description;
    this.createdAt = partial.createdAt;
    this.userID = partial.userID;
  }
}
