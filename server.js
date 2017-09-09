const express = require('express');
const app = express();
const path = require('path');

const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_db');

const User = conn.define('user', {
  name: conn.Sequelize.STRING
});

const Thing = conn.define('thing', {
  name: conn.Sequelize.STRING
});

User.hasMany(Thing);

conn.sync({ force: true })
  .then(()=> {
    return Promise.all([
      User.create({ name: 'Moe'}),
      User.create({ name: 'Larry'}),
      User.create({ name: 'Curly'}),
      Thing.create({ name: 'foo'}),
      Thing.create({ name: 'bar'}),
      Thing.create({ name: 'bazz'})
    ])
    .then(([ moe, larry, curly, foo, bar, bazz ]) => {
      return Promise.all([
        moe.addThing(foo),
        larry.addThing(bar),
        curly.addThing(bazz)
      ]);
    });
  });

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/users', (req, res, next)=> {
  User.findAll()
    .then( users => res.send(users))
    .catch(next);
});

app.get('/api/users/:id', (req, res, next)=> {
  User.findById(req.params.id, { include: [ Thing ]})
    .then( user => res.send(user))
    .catch(next);
});



app.listen(process.env.PORT || 3000);
