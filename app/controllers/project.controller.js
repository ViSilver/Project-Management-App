const Project = require('../models/project.model.js');
// const User = require('../models/user.model.js');

exports.create = (req, res) => {
    var projectType;

    if (req.body.members.length > 1) {
        projectType = 'Group';
    } else {
        projectType = 'Personal';
    }

    const project = new Project({
        name: req.body.name || 'No name',
        description: req.body.description || 'No description',
        type: projectType,
        members: req.body.members
    });

    project.save()
    .then(project => {
        res.status(201).send({message: "Project successfully created", id: project._id});
    }).catch(err => {
        return res.status(500).send({
            message: err.message || 'Some error occured while creating the project.'
        });
    });
};

exports.findOne = (req, res) => {
    Project.findById(req.params.project_id)
    .then(project => {
        if (!project) {
            return res.status(404).send({
                message: "Project not found with id " + req.params.project_id
            });
        }
        res.send({
            id: project._id,
            name: project.name,
            description: project.description,
            type: project.type,
            members: project.members
        });
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Project not found with id " + req.params.project_id
            });
        }
        return res.status(500).send({
            message: "Error while retrieving project with id " + req.params.project_id
        });
    });
};

exports.update = (req, res) => {
    var projectType;

    if (req.body.members.length > 1) {
        projectType = 'Group';
    } else {
        projectType = 'Personal';
    }

    Project.findByIdAndUpdate(req.params.project_id, {
        name: req.body.name || 'No name',
        description: req.body.description || 'No description',
        type: projectType,
        members: req.body.members
    }, {new: true}).then(project => {
        if(!project) {
            return res.status(404).send({
                message: "Project not found with id " + req.params.project_id
            });
        }
        res.send({
            message: "Project successfully updated", 
            id: project._id, 
            name: project.name, 
            description: project.description,
            type: project.type,
            members: project.members
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {       // TODO: test if this is required or not
            return res.status(404).send({
                message: "Project not found with id " + req.params.project_id
            });                
        }
        return res.status(500).send({
            message: "Error updating project with id " + req.params.project_id
        });
    });
};

exports.delete = (req, res) => {
    Project.findByIdAndRemove(req.params.project_id)
    .then(project => {
        if(!project) {
            return res.status(404).send({
                message: "Project not found with id " + req.params.project_id
            });
        }
        res.send({message: "Project deleted successfully!", id: req.params.project_id});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Project not found with id " + req.params.project_id
            });                
        }
        return res.status(500).send({
            message: "Could not delete project with id " + req.params.project_id
        });
    });
};
