const label = {
  view: "label",
  id: "header-label",
  label: "My App",
};

const mainListLabel = {
  view: "label",
  id: "main-list-label",
  label: "<span class='webix_icon wxi-check'></span> Connected",
  css: "main-list-label-style",
};

const button = {
  view: "button",
  id: "header-button",
  type: "icon",
  icon: "mdi mdi-account",
  label: "Profile",
  width: 150,
  css: "webix_transparent",
  click: () => {
    $$("myPopup").show($$("header-button").getNode());
  },
};

const list = {
  view: "list",
  id: "main-list",
  width: 250,
  // template: "#title#",
  select: true,
  on: {
    onAfterSelect: (id) => {
      $$(id).show();
    },
  },
  scroll: false,
  css: "main-list-style",
  data: ["Dashboard", "Users", "Products", "Admin"],
};

const datatable = {
  view: "datatable",
  columns: [
    //css in the first column is not working
    { id: "rank", header: "Rank", css: "rank", width: 50 },
    { id: "title", header: "Title", fillspace: true },
    { id: "year", header: "Year" },
    { id: "rating", header: "Ratings" },
    { id: "votes", header: "Votes" },
    {
      id: "delete",
      header: "",
      css: "rank",
      template:
        "<span class ='webix_icon wxi-trash removeItemDatatable'></span>",
      onClick: {
        removeItemDatatable: function (e, id) {
          this.removeItemDatatable(id);
          console.log(this);
          return false;
        },
      },
    },
  ],
  id: "main-datatable",
  url: "./data/data.js",
  autoConfig: true,
  // autowidth: true,
  scrollX: false,
  // onClick: {
  //   removeItemDatatable: function(e, id) {
  //     this.removeItemDatatable(id);
  //     console.log(this);
  //     return false;
  //   }
  // }
};

const mainFormId = "main-form";

const form = {
  width: 300,
  view: "form",
  id: mainFormId,
  elements: [
    { view: "template", template: "edit films", type: "section" },
    {
      margin: 10,
      rows: [
        {
          view: "text",
          label: "Title",
          id: "inpTitle",
          name: "title",
          invalidMessage: "Title must not be empty",
        },
        {
          view: "text",
          label: "Year",
          id: "inpYear",
          name: "year",
          invalidMessage: "Ent. year between 1970 and cur.",
        },
        {
          view: "text",
          label: "Rating",
          id: "inpRating",
          name: "rating",
          invalidMessage: "Cannot be empty or 0",
        },
        {
          view: "text",
          label: "Votes",
          id: "inpVotes",
          name: "votes",
          invalidMessage: "Votes must be less than 100000",
        },
        {
          margin: 10,
          cols: [
            {
              view: "button",
              value: "Add new",
              css: "webix_primary",
              click: addItem,
            },
            {
              view: "button",
              value: "Clear",
              click: clearForm,
            },
          ],
        },
      ],
    },
    {},
  ],
  rules: {
    title: webix.rules.isNotEmpty,
    year: (value) => {
      return value > 1970 && value <= new Date().getFullYear();
    },
    votes: (value) => {
      return value < 100000;
    },
    rating: (value) => {
      return value !== "" && value !== 0;
    },
  },
  on: {
    onValidationError: function (key) {
      webix.message({ text: `${key} field is incorrect`, type: "error" });
    },
  },
};

const treeTable = {
  view: "treetable",
  id: "Products",
  columns: [
    { id: "id", header: "", width: 50 },
    {
      id: "title",
      header: "Title",
      template: "{common.treetable()} #id#",
      fillspace: true,
    },
    { id: "price", header: "Price", width: 200 },
  ],
  // select: true,
  url: "./data/products.js",
};

const mainMultiview = {
  cells: [
    { id: "Dashboard", cols: [datatable, form] },
    { id: "Users" },
    treeTable,
    { id: "Admin" },
  ],
};

function clearForm() {
  const mainForm = $$(mainFormId);
  webix.confirm("Clear the form?").then(() => {
    mainForm.clear();
    mainForm.clearValidation();
  });
}

function addItem() {
  const mainForm = $$(mainFormId);
  let res = mainForm.validate();
  if (res) {
    let itemData = mainForm.getValues();
    webix.message({ text: "film info was added to table", type: "success" });
    $$("main-datatable").add(itemData);
    mainForm.clear();
  }
}
webix.ready(function () {
  webix.ui({
    view: "popup",
    id: "myPopup",
    width: 300,
    head: "My window",
    body: {
      view: "list",
      id: "pop-list",
      autoheight: true,
      template: "#title#",
      select: true,
      scroll: false,
      data: [
        { id: 1, title: "Settings" },
        { id: 2, title: "Log Out" },
      ],
    },
  });

  webix.ui({
    rows: [
      {
        view: "toolbar",
        id: "header",
        paddingX: 12,
        css: "webix_dark",
        cols: [label, button],
      },
      {
        id: "main",
        cols: [
          {
            // css: "menu",
            rows: [list, mainListLabel],
          },
          { view: "resizer" },
          mainMultiview,
        ],
      },
      {
        id: "footer",
        view: "template",
        template:
          "The software is provided by <a href='https://webix.com'>https://webix.com</a>. All rights reserved (c)",
        autoheight: true,
        css: "footer-style",
        align: "center",
      },
    ],
  });
});
