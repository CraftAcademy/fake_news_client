import { generateAuthActions } from 'redux-token-auth';

const config = {
  authUrl: "http://localhost:3000/v1/auth/sign_in",
  userAttributes: {
    email: "email"
  }
};

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config);

export { registerUser, signInUser, signOutUser, verifyCredentials };  