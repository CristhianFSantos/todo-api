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
