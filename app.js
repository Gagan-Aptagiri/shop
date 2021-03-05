const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Utils
global.appRoot = require.main.filename;

//Models
const User = require('./models/user');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

//Routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('6042486e5635263bf075d322')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://gags:gags123@alpha.tlchy.mongodb.net/shop?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )
  .then((result) => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Gags',
          email: 'gags@test.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
    console.log('Connected to the database.')
  })
  .catch((err) => {
    console.log(err);
  });