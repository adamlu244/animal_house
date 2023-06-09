module.exports = {
  // add each model to your exports object here
  // so that you can use them in your express server api routers
  // for example, create a users.js file for a User model
  // and User: require('./user') here
  ...require('../client'),// adds key/values from order_item.js
  ...require('./users'), // adds key/values from order_item.js
  ...require('./animal_categories'), // adds key/values from order_item.js
  ...require('./animals'), // adds key/values from order_item.js
  ...require('./customer_orders'), // etc
  ...require('./order_items'), // etc
  ...require('./shipping')
};

// then, in your API, you'll require the appropriate model
// and use its database connectors
// ie User.getUserById(), where user.js had a module.exports
// that looked like this: module.exports = { getUserById, ... }
