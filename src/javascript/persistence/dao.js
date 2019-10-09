const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  age: Number
});

const User = mongoose.model('User', UserSchema, 'users');

let host = "localhost";
let port = 27017;
let db = "testdb";
let uri = `mongodb://${host}:${port}/${db}`;

module.exports = {
  connect: function() {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('connection to mongo open');
    });
  },

  saveUser: (user) => {
    let userToSave = new User({name: user.name, age: user.age});
    userToSave.save((err, user) => {
      if (err) console.error(`Couldn't save user: ${user}`);
    });
  },

  findAll: function() {
    return User.find({}, null).exec();
  },

  deleteById: function(id) {
    return User.deleteOne({"_id":id}, null).exec();
  },

  findByName: (name) => {
    return User.find({name: name}, null).exec();
  }

};
