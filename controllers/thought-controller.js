// const {User, Thought} = require('../models');

// module.exports = {
//     getThoughts (req, res) {
//         Thought.find()
//             .then((thought) => res.status(200).json(thought))
//             .catch ((err) => res.status(500).json(err));
// },

// getSingleThought(req, res) {
//     Thought.findOne({_id:req.params.thoughtId})
//     .then((thought) =>
//     !thought
//         ?res.status(400).json({message: 'No thought found with this ID'})
//         : res.status(200).json(thought)
//     .catch((err) => res.status(500).json(err)))
// },

// createThought(req, res) {
//     Thought.create (req.body)
//     .then((thought) => {
//         return User.findOneAndUpdate(
//            {_id: req.body.userId},
//            {$addToSet: {thought: thought._id}},
//            { new: true }
//         );
//     })
//     .then (userThought =>
//     !userThought
//     ? res.status(400).json ({message: 'No user found with that ID'})
//     : res.status(200).json(userThought)
//     )
//     .catch((err) => res.status(400).json(err));
   
// },

// updateThought(req, res) {
//     Thought.findOneAndUpdate(
//         {_id: req.params.thoughtId },
//         {...req.body},
//         {new:true}, 
//     )
//     .then((result) =>
//         !result
//             ? res.status(400).json({message: 'uh oh, something went wrong'})
//             :res.json(result)
//     )
//     .catch((err) => res.status(500).json(err));

// },
// deleteThought (req, res) {
//         Thought.findOneAndDelete({_id:req.params.thoughtId})
//             .then((thought) => {
//                 return User.findOneAndUpdate(
//                     {_id: thought.userId},
//                     {$pull: {thoughts: thoughts._id}},
//                 );
                
//                 })
//             .then(() => res.json({message: 'Thoughts associated with this user has been deleted'}))
//             .catch((err) => res.status(500).json(err));

// },
// createReaction (req, res) {
//     Thought.findOneAndUpdate
//     ({_id:req.params.thoughtId},
//     {$push: {reactions: req.body} },
//     {new: true}
//     )
//     .then((thought) => 
//             !thought
//                 ?res.status(400).json({ message: 'No thought found with that ID'})
//                 :res.json(thought)
//     )
            
        
//      .catch((err) => res.status(500).json(err));

// },

// // deleteReaction (req, res) {
// //     Thought.findOneAndupdate({_id:req.params.friendIdid});
// //         $pull: {reactions : {_id: req.params._id} };
// //         req.status(200).json(deletedUser);
// //     } catch (err) {
// //     res.status(500).json(err);
// //     }
// //  });
// // }

// // deleteReaction (req, res) {
// //     Thought.findOneAndDelete({_id:req.params.thoughtId})
// //         {_id: req.params.thoughtId }
// //         {$pull: {reactions: {reactionId: req.params.reactionId } }}
// //         {new : true} 

// //             );
// } 

const { Thought, User } = require("../models");

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought
            .find({})
            .select("-__v")
            .sort({ createdAt: -1})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }, 

    // get ONE thought by id
    getOneThought({ params }, res) {
        Thought
            .findOne({ _id: params.thoughtId })
            .select("-__v")
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id! "})
                    return;
                };    
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }, 

    // add thought
    addThought({ body }, res) {
        Thought
            .create(body)
            .then(dbThoughtData => {
                return User.findOneAndUpdate(
                    { _id: body.userId }, 
                    { $push: { thought: dbThoughtData._id } }, 
                    { new: true }
                );
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: "Thought created, but no user found with this id!" });
                };
                res.json({ message: "Thought created successfully!" });        
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // add reaction to thought
    addReaction({ params, body }, res) {
        Thought
            .findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body } },
                { new: true, runValidators: true }
            )
            .select("-__v")
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id! "})
                    return;
                };    
                res.json({ message: "Reaction created successfully!" });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // update thought by id
    updateThought({ params, body }, res) {
        Thought
            .findOneAndUpdate(
                { _id: params.thoughtId },
                body, 
                { 
                    new: true,
                    runValidators: true
                }
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id! "});
                    return;
                };    
                res.json({ message: "Thought updated successfully!" });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // delete thought by id
    deleteThought({ params }, res) {
        Thought
            .findOneAndRemove({ _id: params.thoughtId })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id! "});
                    return;
                };    
                return User.findOneAndUpdate(
                    { thoughts: params.thoughtId }, 
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: "Thought deleted but no user found with this id!" });
                };
                res.json({ message: "Thought deleted successfully! "});
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // delete reaction by id
    deleteReaction({ params }, res) {
        Thought
            .findOneAndUpdate(
                { _id: params.thoughtId }, 
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true, runValidators: true }
            )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id! "})
                    return;
                };    
                res.json({ message: "Reaction deleted successfully!" });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
};

// exports
module.exports = thoughtController;