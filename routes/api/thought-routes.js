// const router = require('express').Router();
// const {
//   getThoughts,
//   getSingleThought,
//   createThought,
//   updateThought,
//   deleteThought,
//   createReaction,
//   // deleteReaction,
// } = require('../../controllers/thoughtController');

// // /api/thought
// router.route('/').get(getThoughts).post(createThought);

// // /api/thoughts/:thoughtId
// router.route('/:thoughtId').get(getSingleThought).put(updateThought)
// // .delete(deleteReaction);

// router.route('/:thoughtId/reaction').post(createReaction);

// // router.route('/:thoughtId/reaction/:reactionId').put(deleteReaction);

// module.exports = router;


const router = require("express").Router();
const {
    getAllThoughts,
    getOneThought,
    addThought,
    addReaction,
    updateThought,
    deleteThought,
    deleteReaction
} = require("../../controllers/thought-controller");

// get all thoughts
router
    .route("/")
    .get(getAllThoughts)
    .post(addThought);

// get, update, and delete one thought by id
router
    .route("/:thoughtId")
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought);

// add reaction to thought
router
    .route("/:thoughtId/reactions")
    .post(addReaction);

// delete reaction from thought
router
    .route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction);

// exports
module.exports = router;
