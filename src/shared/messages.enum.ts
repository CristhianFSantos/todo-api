/**************************************************[ USER ]**************************************************************/
export const enum eUserMessage {
  USER_NOT_FOUND = 'User not found',
  USER_UPDATE_SUCCESS = 'User updated successfully',
  USER_DELETE_SUCCESS = 'User deleted successfully',
  REQUEST_ERROR = 'Error in request',
}

export const enum eUserControllerDescription {
  USER_UPDATED = 'Method to update user',
  USER_DELETED = 'Method to delete user',
  USER_GET_ALL = 'Method to get all users',
}

/**************************************************[ TODO ]**************************************************************/
export const enum eTodoMessage {
  TODO_NOT_FOUND = 'Todo not found',
  TODO_CREATED_SUCCESS = 'Todo created successfully',
  TODO_UPDATED_SUCCESS = 'Todo updated successfully',
  TODO_DELETED_SUCCESS = 'Todo deleted successfully',
  REQUEST_ERROR = 'Error in request',
}
export const enum eTodoControllerDescription {
  TODO_UPDATE_BY_ID = 'Method to update a todo by id',
  TODO_DELETE_BY_ID = 'Method to delete a todo by id',
  TODO_CREATE = 'Method to create a new todo',
  TODO_GET_BY_ID_USER = 'Method to get all todos by id user',
  TODO_GET_BY_TITLE = 'Method to get a todo by title',
}
/**************************************************[ AUTH ]**************************************************************/
export const enum eAuthMessage {
  SIGN_IN_SUCCESS = 'User signed in successfully',
  SIGN_UP_SUCCESS = 'User created successfully',
  INVALID_CREDENTIALS = 'User or password invalid',
  EMAIL_ALREADY_EXISTS = 'Email already exists',
  REQUEST_ERROR = 'Error in request',
}

export const enum eAuthControllerDescription {
  SIGN_UP = 'Method to register a new user',
  SIGN_IN = 'Method to authenticate a user',
}
/************************************************************************************************************************/
export const enum eRecoverPasswordMessage {
  EMAIL_SENT_SUCCESS = 'Email sent successfully',
  INCORRECT_CODE = 'Incorrect code',
  RECOVER_SUCCESS = 'Recover password success',
}
