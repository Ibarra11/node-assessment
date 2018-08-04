var data = require('./userData.json');
module.exports = {
    users: (req,res) =>{
        let {age, lastname, email, favorites} = req.query;
        if(age){
            res.send(data.filter(user => user.age < age))
        }
        else if(lastname){
            res.send(data.filter(user => user.last_name === lastname))
        }
        else if(email){
            res.send(data.filter(user => user.email === email))
        }
        else if(favorites){
            res.send(data.filter(user => user.favorites.indexOf(favorites) !== -1));
        }
        else{
            res.send(data);
        }
        
    },
    getUser: (req, res) =>{
        let {userId} = req.params;
        let user = data.filter(user => user.id === +userId)[0];
        (user ? res.send(user) : res.status(404).json(null))
    },
    getAdmins: (req, res) =>{
        res.send(data.filter(user => user.type === 'admin'))
    },
    getNonAdmins: (req, res) =>{
        res.send(data.filter(user => user.type !== 'admin'))
    },
    getUserByType: (req, res) =>{
        let {userType} = req.params;
        res.send(data.filter(user => user.type === userType));
    },
    updateUser: (req, res) =>{
        let {userId} = req.params;
        let{id, first_name, last_name, email, gender, language, age, city, state, type, favorites} = req.body;
        data.forEach((user,index) =>{
            if(user.id === +userId){
                data[index] = {id, first_name, last_name, email, gender, language, age, city, state, type, favorites};  
            }
        })
        res.send(data);
    },
    addUser: (req, res) =>{
        let {first_name, last_name, email, gender, language, age, city, state, type, favorites} = req.body;
        let id = data.length + 1;
        data.push({id, first_name, last_name, email, gender, language, age, city, state, type, favorites});
        res.send(data);
    },
    deleteUser: (req, res) =>{
        let {userId} = req.params;
        let index = data.findIndex(user => user.id === +userId );
        data.splice(index, 1);
        res.send(data);
    }
}