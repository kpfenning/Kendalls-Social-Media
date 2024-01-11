const { User, Thought } = require('../models');


const userController = {
    getAllUsers(req, res) {
        User.find({})
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    getUserById(req,res) {
        User.findOne({ _id: req.params.userId })
            .populate("thoughts")
            .populate("friends")
            .select("-__v")
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: "No user found with this id"});
                } else {
                    res.json(user)
                }
            })
            .catch((err) => res.status(500).json(err));
                
    },
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch(err => res.json(err));
    },


    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                 res.status(404).json({ message: 'No user found with this id' });
                 return;
             }
             res.json(dbUserData);
         })
         .catch(err => res.json(err));
        },
    deleteUser({ params }, res) {
        Thought.deleteMany({ userId: params.id })
        .then(() => {
            User.findOneAndDelete({ userId: params.id })
            .then(dbUserData => {
                 if (!dbUserData) {
                     res.status(404).json({ message: 'No user found with this id' });
                     return;
                 }
                 res.json(dbUserData);
             })
            })
            .catch(err => res.json(err));
        },
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                 res.status(404).json({ message: 'No user found with this id' });
                 return;
             }
             res.json(dbUserData);
         })
         .catch((err) => res.json(err));
        },
        deleteFriend({ params }, res) {
            User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true }
            )
            .then((dbUserData) => {
                if (!dbUserData) {
                     res.status(404).json({ message: 'No user found with this id' });
                     return;
                 }
                 res.json(dbUserData);
             })
             .catch((err) => res.json(err));
        }
};

module.exports = userController;

