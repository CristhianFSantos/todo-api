export const SCHEMAS_TEXT = {
  sign_up: {
    name: {
      description: 'User name',
      default: 'Kamil Mysliwiec',
    },
    email: {
      description: 'User email',
      default: 'kamil@gmail.com',
    },
    password: {
      description: 'User password',
      default: '5p&0Jo@p1',
    },
  },
  sign_in: {
    email: {
      description: "User's email",
      default: 'kamil@gmail.com',
    },
    password: {
      description: "User's password",
      default: '5p&0Jo@p1',
    },
  },
  user_request_update: {
    name: {
      description: "User's name",
      default: 'Bill Gates',
    },
    email: {
      description: "User's email",
      default: 'bill@outlook.com',
    },
  },
};
