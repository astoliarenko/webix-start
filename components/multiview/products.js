export const mainMultiviewProductsId = "Products";

const treeTable = {
    view: "treetable",
    id: mainMultiviewProductsId,
    editable: true,
    columns: [
      { id: "id", header: "", width: 50 },
      {
        id: "title",
        header: "Title",
        template: "{common.treetable()} #title#",
        //было id в template вместо title, невнимателен
        fillspace: true,
        editor: "text",
      },
      { id: "price", header: "Price", width: 200, editor: "text" },
    ],
    url: "./data/products.js",
    scrollX: false,
    select: "cell",
    //enable sell selection
    on: {
      onAfterLoad: function () {
        //this = $$(mainMultiviewProductsId) in this case
        this.openAll();
      },
    },
    rules: {
      title: webix.rules.isNotEmpty,
      price: (price) => !isNaN(price),
      //прайс должен быть только у нижнего файла, потом пофиксить
    },
  };

  export default treeTable;