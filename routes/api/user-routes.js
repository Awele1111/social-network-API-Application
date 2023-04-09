// const router = require('express').Router();
// const {
//   getUsers,
//   getSingleUser,
//   createUser,
//   updateUser,
//   deleteUser,
//   // addFriend,
//   // removeFriend,
// } = require('../../controllers/userController');

// router.route('/').get(getUsers).post(createUser);

// router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// // router.route('/:userId/friends/:friendId').post(addFriend).put(removeFriend);

// module.exports = router;


const router = require("express").Router();
const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    addFriend,
    deleteUser,
    deleteFriend
} = require("../../controllers/user-controller");

// get and create users
router
    .route("/")
    .get(getAllUsers)
    .post(createUser);

// get, update, and delete a single user
router
    .route("/:id")
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

// add or delete friend from a user
router
    .route("/:id/friends/:friendId")
    .post(addFriend)
    .delete(deleteFriend);

// exports
module.exports = router;