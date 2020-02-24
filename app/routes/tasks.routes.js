module.exports = (app) => {
    const usersController = require('../controllers/user.controller.js');
    app.post('/user', usersController.create);
    app.get('/user/:user_id', usersController.findOne);
    app.get('/users', usersController.findAll);
    app.put('/user/:user_id', usersController.update);
    app.delete('/user/:user_id', usersController.delete);

    const groupsController = require('../controllers/group.controller.js');
    app.post('/group', groupsController.create);
    app.get('/group/:group_id', groupsController.findOne);
    app.put('/group/:group_id', groupsController.update);
    app.delete('/group/:group_id', groupsController.delete);
    app.put('/group/:group_id/:user_id', groupsController.addUserToGroup);

    const projectsController = require('../controllers/project.controller.js');
    app.post('/project', projectsController.create);
    app.get('/project/:project_id', projectsController.findOne);
    app.put('/project/:project_id', projectsController.update);
    app.delete('/project/:project_id', projectsController.delete);
}
