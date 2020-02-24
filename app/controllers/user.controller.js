const User = require('../models/user.model.js');

exports.create = (req, res) => {
    const user = new User({
        name: req.body.name || 'No name',
        email: req.body.email || 'No email',
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        groups: req.body.groups
    });

    user.save()
    .then(data => {
        res.status(201).send({message: "User successfully created", id: data._id}); // TODO: Check requirements and return the desired data
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occured while creating the user.'
        });
    });
};

exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users.map(user => ({id: user._id})));
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving users."
        });
    });
};


exports.findOne = (req, res) => {
    User.findById(req.params.user_id)
    .then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.user_id
            });
        }
        res.send({id: user._id, name: user.name, email: user.email});
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.user_id
            });
        }
        return res.status(500).send({
            message: "Error while retrieving user with id " + req.params.user_id
        });
    });
};

exports.update = (req, res) => {
    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.user_id, {
        name: req.body.name || 'No name',
        email: req.body.email || 'No email',
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        groups: req.body.groups
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.user_id
            });
        }
        res.send({message: "User successfully updated", id: user._id, name: user.name, email: user.email});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.user_id
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.user_id
        });
    });
};

exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.user_id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.user_id
            });
        }
        res.send({message: "User deleted successfully!", id: req.params.user_id});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.user_id
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.user_id
        });
    });
};

