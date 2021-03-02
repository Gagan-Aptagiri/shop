const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
global.appRoot = require.main.filename;
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartIem = require('./models/cart-item');


const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
   User.findByPk(1)
      .then(user => {
         req.user = user;
         next();
      })
      .catch(err => console.log(err));
});

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

/* Sequelize Associations */
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartIem });
Product.belongsToMany(Cart, { through: CartIem });

sequelize
   // .sync({ force: true }) Force recreation of tables
   .sync()
   .then(result => {
     return User.findByPk(1);
   })
   .then(user => {
      if (!user) {
        return User.create({ name: 'Gagan', email: 'gagan.aptagiri@gmail.com' });
      }
      return Promise.resolve(user);
   })
   .then(user => {
      // console.log(user);
       app.listen(3000);
   })
   .catch(err => {
      console.log(err);
   });