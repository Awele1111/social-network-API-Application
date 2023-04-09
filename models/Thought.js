// const { Schema, model } = require('mongoose');
// // const validator = require('validator');
// // const moment = require('moment');
// const reactionSchema = require('./Reaction');


// const thoughtSchema = new Schema(
//   {
//     thoughtText:
//     {
//       type:String,
//       required: true,
//       minlength: 1,
//       maxlength: 280

//     },

//     createdAt:
//     {
//       type: Date,
//       default: Date.now(),
//       get: dateFormat,

//     },

//     username:
//     {
//         type:String,
//         required: true 
//     },

//     reactions:[reactionSchema],
    
  
    
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

// function dateFormat(date) {
//     moment(date).format('DD-MM-YYYY')
// }

// // Create a virtual property `fullName` that gets and sets the user's full name
// thoughtSchema
//   .virtual('reactionCount')
//   // Getter
//   .get(function () {
//     return this.reactions.length;
//   })
  

// // Initialize our User model
// const Thought = model('thought', thoughtSchema);

// module.exports = Thought;

const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => Types.ObjectId()
        }, 
        reactionBody: {
            type: String, 
            required: true, 
            maxLength: 280
        }, 
        username: {
            type: String, 
            required: true
        }, 
        createdAt: {
            type: Date, 
            default: Date.now, 
            get: createdAtVal => dateFormat(createdAtVal)
        }
    }, 
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required: true, 
            minlength: 1, 
            maxlength: 280
        }, 
        createdAt: {
            type: Date, 
            default: Date.now, 
            get: createdAtVal => dateFormat(createdAtVal)
        }, 
        username: {
            type: String, 
            required: true
        }, 
        reactions: [ReactionSchema]
    }, 
    {
        toJSON: {
            virtuals: true, 
            getters: true
        }, 
        id: false
    }
)

ThoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

// exports
module.exports = Thought;
