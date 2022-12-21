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
  todo_create_request: {
    title: {
      description: "Todo's title",
      default: 'Learn NestJS',
    },
    completed: {
      description: "Todo's completed",
      default: true,
    },
    description: {
      description: "Todo's description",
      default: 'Create application with NestJS, Prisma, Postgres and Docker',
    },
    createdAt: {
      description: "Todo's createdAt",
      default: '2020-06-01T00:00:00',
    },
    userID: {
      description: "User's id",
      default: '0f8fad5b-d9cb-469f-a165-70867728950e',
    },
  },
  todo_update_request: {
    title: {
      description: "Todo's title",
      default: 'Learn Angular',
    },
    completed: {
      description: "Todo's completed",
      default: false,
    },
    description: {
      description: "Todo's description",
      default: 'Learn Angular with NestJS',
    },
    createdAt: {
      description: "Todo's createdAt",
      default: '2020-06-01T00:00:00',
    },
    userID: {
      description: "User's id",
      default: '0f8fad5b-d9cb-469f-a165-70867728950e',
    },
  },
};
