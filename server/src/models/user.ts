import mongoose from 'mongoose';

/**
 * Enumerates the different sources of authentication possible for a user.
 */
enum AuthenticationType {
  Internal = 'internal',
  Google = 'google',
}

interface IInternalUser extends mongoose.Types.Subdocument {
  _id: string;
  email: string;
  password: string;
}

interface IGoogleUser extends mongoose.Types.Subdocument {
  _id: string;
  googleId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  image: string;
  createdAt: Date;
}

interface IUser extends mongoose.Document {
  _id: string;
  accountType: AuthenticationType;
  email: string;
  password: string;
  googleAccount: IGoogleUser;
}

const GoogleUserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const InternalUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g,
  },
  password: {
    type: String,
    required: true,
    // match: /^[a-zA-Z0-9!?$%^*)(+=._-]{6,61}$/g,
  },
});

const UserSchema = new mongoose.Schema({
  accountType: {
    type: String,
    enum: Object.values(AuthenticationType),
    required: true,
  },
  email: {
    type: String,
    match:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g,
  },
  password: {
    type: String,
  },
  googleAccount: {
    type: GoogleUserSchema,
  },
});

const User = mongoose.model<IUser>('User', UserSchema);

/**
 * Defines the name of the cookie stored by the user.
 *
 * TODO: change this using your project name, but make sure this
 * is not generic. You don't want it to interfere with other cookies
 * stored by the user. We suggest 'authToken-[projectName]-[randomString]'
 * although you can omit the [randomString].
 **/
const authJWTName = 'authToken-h4i-boilerplate';

export {
  IInternalUser,
  IGoogleUser,
  IUser,
  User,
  AuthenticationType,
  authJWTName,
};
