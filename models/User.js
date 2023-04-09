// const { Schema, model, isEmail } = require('mongoose');
// // const validator = require('validator');

// // Schema to create User model
// const userSchema = new Schema(
//   {
//     username:
//     {
//       type:String,
//       required: true,
//       unique: true,
//       trim: true

//     },

//     email:
//     {
//       type:String,
//       required: true,
//       unique: true,
//       match: /.+\@.+\..+/,
//       // validate: {
//       //   validator: validator.isEmail,
//       //   message: 'not a valid email'
//       // }

//     },

//     thoughts: [{
//       type: Schema.Types.ObjectId,
//       ref:'Thought'
//     }],
//     friends: [{
//       type: Schema.Types.ObjectId,
//       ref:'User'
//     }],
    
  
    
//   },
//   {
//     // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
//     // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
//     toJSON: {
//       virtuals: true,
//     },
//     id: false,
//   }
// );

// // Create a virtual property `fullName` that gets and sets the user's full name
// userSchema
//   .virtual('friendCount')
//   // Getter
//   .get(function () {
//     return this.friends.length;
//   });

// // Initialize our User model
// const User = model('user', userSchema);

// module.exports = User;


const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        username: {
            type: String, 
            required: true, 
            unique: true, 
            trim: true
        }, 
        email: {
            type: String, 
            required: true, 
            unique: true, 
            match: [/.+@.+\..+/, 'Please enter a valid email address!']
        }, 
        thoughts: [
            {
                type: Schema.Types.ObjectId, 
                ref: "Thought"
            }
        ], 
        friends: [
            {
                type: Schema.Types.ObjectId, 
                ref: "User"
            }
        ]
    }, 
    {
        toJSON: {
            virtuals: true, 
            getters: true
        }, 
        id: false
    }
);

UserSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});

const User = model("User", UserSchema);

// exports 
module.exports = User;

