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

    updateUser(req,res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { new: true, runValidators: true })
        .then ((user) => {
            if (!user) {
                res.status(404).json({ message: "No user found with this id"});
            } else {
                res.json(user)
            }
        })
        .catch((err) => res.status(500).json(err));
    },
    
    deleteUser(req,res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => {
            if(!user) {
                res.status(404).json({ message: "No user found with this id"});
            } else {
                return Thought.deleteMany({ _id: { $in: user.thoughts }});
            }
        })
        .then(() => res.json({ message: "User and Thought Deleted" }))
        .catch((err) => res.status(500).json(err));
    },

    addFriend(req,res) {
        User.findOneAndUpdate({ _id: req.params.userId}, { $addToSet: { friends: req.params.friendId }}, { new: true, runValidators: true})
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: "No user found with this id"});
            } else {
                res.json(user)
            }
        })
        .catch((err) => res.status(500).json(err));
    },
    
    
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

