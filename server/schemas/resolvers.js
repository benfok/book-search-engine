// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');
// import error handling from apollo
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
    Query: {
         // get the current logged in user
         me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('thoughts');
            }
            throw new AuthenticationError('You need to be logged in!');
          },
    },

    Mutation: {
        // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });

            if (!user) {
                return res.status(400).json({ message: 'Something is wrong!' });
              }
            
            const token = signToken(user);

            return { token, user };
        },

        // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect email or password');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect email or password');
            }

            const token = signToken(user);

            return { token, user };
        },

        // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
        // user comes from `req.user` created in the auth middleware function
        saveBook: async (parent, { book }, context) => {
            console.log(context);
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: book } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }

            throw new AuthenticationError('Not logged in');
        },
        
        
        // remove a book from `savedBooks`
        removeBook: async (parent, { book }, context) => {
            console.log(context);
                if (context.user) {
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { savedBooks: { bookId: book.bookId } } },
                        { new: true }
                    );

                if(!updatedUser) {
                    console.log('could not find user')
                } 

                return updatedUser;
            }
            
            throw new AuthenticationError('Not logged in');
        },
    }

}

module.exports = resolvers;




