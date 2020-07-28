export default {
  jwt: {
    secret: process.env.APP_SECRET || 'filadelfia',
    expiresIn: '1d',
  },
};
