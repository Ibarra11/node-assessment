const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
const usersCtrl = require('./usersCtrl');


app.use(bodyParser.json());

app.get('/api/users', usersCtrl.users);
app.get('/api/users/:userId', usersCtrl.getUser);
app.get('/api/admins', usersCtrl.getAdmins);
app.get('/api/nonadmins', usersCtrl.getNonAdmins);
app.get('/api/user_type/:userType', usersCtrl.getUserByType);
app.post('/api/users', usersCtrl.addUser);
app.put('/api/users/:userId', usersCtrl.updateUser);
app.delete('/api/users/:userId', usersCtrl.deleteUser)


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))