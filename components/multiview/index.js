import dashboard from "./dashboard.js";
import users from './users.js';
import products from './products.js';
import admin from './admin.js';

const mainMultiview = {
    cells: [
      dashboard,
      users,
      products,
      admin,
    ],
  };

  export default mainMultiview;