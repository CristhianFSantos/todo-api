export const MESSAGES_EN = {
  start: {
    local: (port) =>
      `🚀 Application is running in: http://localhost:${port}/swagger/`,
  },
  email: {
    from: '🚀 Todo App 🚀 <nestjs.mail.api@gmail.com>',
    subject: {
      recoverPassword: 'Você solicitou uma recuperação de senha! 🔒',
      emailRegistration: (name) =>
        `Cadastro realizado com sucesso! Seja bem vindo ${name}! 🚀`,
      checkCompleteTodo: 'Você tem tarefas pendentes! 🔔',
    },
  },
  error: {
    emailAlreadyExists: 'Email already exists',
    invalidCredentials: 'User or password invalid',
    userNotFound: 'User not found',
    repeatedData: 'The data is the same as the existing ones',
    tokenExpired: 'Token expired',
    incorretCode: 'Code or email incorrect',
    todoNotFound: 'Todo not found',
  },
  info: {
    signUpDescription: 'Method to register a new user',
    signInDescription: 'Method to authenticate a user',
    userDeletedDescription: 'Method to delete user',
    userGetAllDescription: 'Method to get all users',
    userUpdatedDescription: 'Method to update user',
    recoverPasswordDescription: 'Method to recover password',
    todoCreateDescription: 'Method to create a new todo',
    todoGetByIdDescription: 'Method to get todo by id',
    todoGetByTitleDescription: 'Method to get todo by title',
    todoGetAllDescription: 'Method to get all todos',
    todoDeleteDescription: 'Method to delete todo',
    todoUpdateDescription: 'Method to update todo',
  },
  success: {
    emailSentSuccessfully: 'Email sent successfully',
  },
};
