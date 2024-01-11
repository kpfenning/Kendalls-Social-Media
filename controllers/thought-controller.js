const { User, Thought } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },

    getThoughtById(req,res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: "No thought found with this id" });
                } else {
                    res.json(data);
                }
            })
            .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    
    updateThought(req,res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { new: true, runValidators: true })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: "No thought found with this id"});
            } else {
                res.json(user);
            }
        })
        .catch((err) => res.status(500).json(err));
    },

    deleteThought(req,res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: "No thought found with this id"});
                } else {
                    return User.findOneAndUpdate ({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId }}, { new: true });
                }
            })
            .then((user) => {
                if(!user) {
                    res.status(404).json({ message: "Thought deleted, but no user found with this id"});
                } else {
                    res.json({ message: "Thought deleted!"});
                }
            })
            .catch((err) => res.status(500).json(err));
    },

    createReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body }}, { new: true, runValidators: true })
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: "No thought found with this id"});
            } else {
                res.json(thought);
            }
        })
        .catch((err) => res.status(500).json(err));
    },

    deleteReaction (req,res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId}}}, { new: true, runValidators: true })
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: "No thought found with this id"});
            } else {
                res.json(thought);
            }
        })
        .catch((err) => res.status(500).json(err));
    }
   
};

    module.exports = thoughtController;
