const Group = require('../models/group.model.js');
const User = require('../models/user.model.js');

exports.create = (req, res) => {
    User.findById(req.body.owner)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.body.owner
            });
        } else {
            const group = new Group({
                name: req.body.name || 'No name',
                owner: user._id
            });
        
            group.save()
            .then(group => {
                console.log("Entered in group then");
                res.status(201).send({message: "Group successfully created", id: group._id});
            }).catch(err => {
                return res.status(500).send({
                    message: err.message || 'Some error occured while creating the group.'
                });
            });
        }
    }).catch(err => {
        // if (err.kind === 'ObjectId') {
        //     return res.status(404).send({
        //         message: 'User could not be found with id ' + req.body.owner
        //     });
        // }
    });
};

exports.findOne = (req, res) => {
    Group.findById(req.params.group_id)
    .then(group => {
        if (!group) {
            return res.status(404).send({
                message: "Group not found with id " + req.params.group_id
            });
        }
        res.send({id: group._id, name: group.name, owner: group.owner});
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Group not found with id " + req.params.group_id
            });
        }
        return res.status(500).send({
            message: "Error while retrieving group with id " + req.params.group_id
        });
    });
};

exports.update = (req, res) => {
    // Find group and update it with the request body
    // User.findById(req.body.owner)
    // .then(user => {
    //     if(!user) {
    //         return res.status(404).send({
    //             message: "User not found with id " + req.body.owner
    //         });
    //     } else {
    //         Group.findByIdAndUpdate(req.params.group_id, {
    //             name: req.body.name || 'No name',
    //             owner: user._id
    //         }, {new: true}).then(group => {
    //             if(!group) {
    //                 return res.status(404).send({
    //                     message: "Group not found with id " + req.params.group_id
    //                 });
    //             }
    //             res.send({message: "Group successfully updated", id: group._id, name: group.name, owner: group.owner});
    //         }).catch(err => {
    //             if(err.kind === 'ObjectId') {       // TODO: test if this is required or not
    //                 return res.status(404).send({
    //                     message: "Group not found with id " + req.params.group_id
    //                 });                
    //             }
    //             return res.status(500).send({
    //                 message: "Error updating group with id " + req.params.group_id
    //             });
    //         });
    //     }
    // });
    Group.findByIdAndUpdate(req.params.group_id, {
        name: req.body.name || 'No name',
        owner: req.body.owner
    }, {new: true}).then(group => {
        if(!group) {
            return res.status(404).send({
                message: "Group not found with id " + req.params.group_id
            });
        }
        res.send({message: "Group successfully updated", id: group._id, name: group.name, owner: group.owner});
    }).catch(err => {
        if(err.kind === 'ObjectId') {       // TODO: test if this is required or not
            return res.status(404).send({
                message: "Group not found with id " + req.params.group_id
            });                
        }
        return res.status(500).send({
            message: "Error updating group with id " + req.params.group_id
        });
    });
};

exports.delete = (req, res) => {
    Group.findByIdAndRemove(req.params.group_id)
    .then(group => {
        if(!group) {
            return res.status(404).send({
                message: "Group not found with id " + req.params.group_id
            });
        }
        res.send({message: "Group deleted successfully!", id: req.params.group_id});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Group not found with id " + req.params.group_id
            });                
        }
        return res.status(500).send({
            message: "Could not delete group with id " + req.params.group_id
        });
    });
};

exports.addUserToGroup = (req, res) => {
    Group.findByIdAndUpdate(req.params.group_id, {
        owner: req.params.user_id
    }, {new: true})
    .then(group => {
        if(!group) {
            return res.status(404).send({
                message: "Group not found with id " + req.params.group_id
            });
        }

        // User.findById(req.params.user_id)
        // .then(user => {
        //     if(!user) {
        //         return res.status(404).send({
        //             message: "User with id " + req.params.user_id + " not found"
        //         });
        //     }

        //     // user.groups.push(group);
        //     // user.update()
        //     // .catch(err => {
        //     //     return res.status(500).send({
        //     //         message: err.message || 'Some error occured while adding group to user.'
        //     //     });
        //     // });

        //     // group.owner = user._id;
        //     // group.update()
        //     // .catch(err => {
        //     //     return res.status(500).send({
        //     //         message: err.message || "Some error occured while changing group's owner."
        //     //     });
        //     // });
        // }).catch(err => {
        //     if(err.kind === 'ObjectId') {
        //         return res.status(404).send({
        //             message: "User not found with id " + req.params.user_id
        //         });                
        //     }
        //     return res.status(500).send({
        //         message: "Error updating user " + req.params.user_id 
        //         + " and group with id " + req.params.group_id
        //     });
        // });

        res.send({message: "User successfully added into a group", id: group.owner});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Group not found with id " + req.params.group_id
            });                
        }
        console.log(err);
        return res.status(500).send({
            message: "Error updating group with id " + req.params.group_id
        });
    });
};


