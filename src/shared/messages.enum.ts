export const enum eAuthMessage {
  INVALID_CREDENTIALS = 'User or password invalid',
  EMAIL_ALREADY_EXISTS = 'Email already exists',
  USER_NOT_FOUND = 'User not found',
  DELETE_USER_SUCCESS = 'User deleted successfully',
  REQUEST_ERROR = 'Error in request',
  SIGN_UP_SUCCESS = 'User created successfully',
  SIGN_IN_SUCCESS = 'User signed in successfully',
  USER_UPDATE_SUCCESS = 'User updated successfully',
}

export const enum eAuthControllerDescription {
  SIGN_UP = 'Method to register a new user',
  SIGN_IN = 'Method to authenticate a user',
  DELETE_USER_BY_ID = 'Method to delete a user by id',
  UPDATE_USER_BY_ID = 'Method to update a user by id',
  GET_ALL_USERS = 'Method to get all users',
}

export const enum eTodoMessage {
  TODO_NOT_FOUND = 'Todo not found',
  TODO_CREATED = 'Todo created successfully',
  TODO_UPDATED = 'Todo updated successfully',
  TODO_DELETED = 'Todo deleted successfully',
  TODO_LIST_EMPTY = 'Todo list is empty',
  REQUEST_ERROR = 'Error in request',
}

export const enum eTodoControllerDescription {
  GET_TODOS_BY_ID_USERS = 'Method to get all todos by id user',
  POST_TODO = 'Method to create a new todo',
  DELETE_TODO_BY_ID = 'Method to delete a todo by id',
  UPDATE_TODO_BY_ID = 'Method to update a todo by id',
  GET_TODO_BY_TITLE = 'Method to get a todo by title',
}
