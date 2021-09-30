const filmCategoryCollection = new webix.DataCollection({
  url: "./data/categories.json",
});
const usersCollection = new webix.DataCollection({
  url: "./data/users.json",
});
export {filmCategoryCollection, usersCollection};