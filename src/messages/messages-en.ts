export const MESSAGES_EN = {
  start: {
    local: (port) =>
      `🚀 Application is running in: http://localhost:${port}/swagger/`,
  },
  error: {
    emailAlreadyExists: 'Email already exists',
    invalidCredentials: 'User or password invalid',
    userNotFound: 'User not found',
    repeatedData: 'The data is the same as the existing ones',
    tokenExpired: 'Token expired',
    incorret_code: 'Code or email incorrect',
  },
  info: {
    sign_up_description: 'Method to register a new user',
    sign_in_description: 'Method to authenticate a user',
    user_deleted_description: 'Method to delete user',
    user_get_all_description: 'Method to get all users',
    user_updated_description: 'Method to update user',
    recover_password_description: 'Method to recover password',
  },
  success: {
    email_sent_successfully: 'Email sent successfully',
  },
};
