const mainFormId = "main-form";
const userListId = "Userslist";
const mainMultiviewProductsId = "Products";
const menuListId = "main-list";

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
  id: menuListId,
  width: 250,
  select: true,
  on: {
    onAfterSelect: (id) => {
      $$(id).show();
    },
    // onAfterLoad: () => {
    //   $$(menuListId).select("Dashboard");
    // }
  },
  scroll: false,
  css: "main-list-style",
  data: ["Dashboard", "Users", mainMultiviewProductsId, "Admin"],
};

const datatable = {
  view: "datatable",
  hover: "myHover",
  columns: [
    { id: "rank", header: "", css: "rank head_row", width: 50 },
    {
      id: "title",
      header: ["Film title", { content: "textFilter" }],
      fillspace: true,
      sort: "string",
    },
    { id: "year", header: ["Released", { content: "textFilter" }] },
    { id: "rating", header: ["Ratings", { content: "textFilter" }] },
    {
      id: "votes",
      header: ["Votes", { content: "textFilter" }],
      template: (item) => {
        return Math.round(parseInt(item.votes)).toString();
      },
    },
    {
      id: "delete",
      header: "",
      css: "rank",
      template:
        "<span class ='webix_icon wxi-trash removeItemDatatable'></span>",
    },
  ],
  id: "main-datatable",
  url: "./data/data.js",
  // autowidth: true,
  scrollX: false,
  onClick: {
    removeItemDatatable: function (e, id) {
      this.remove(id);
      //The return false line blocks further processing of a click action
      //(e.g. if selection is enabled, only clicks outside the active zone will select an item).
      return false;
    },
  },
  // !!!!!!!!!!!!!!!!!!!_______________!!!!!!!!!!!!
};

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
  id: mainMultiviewProductsId,
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
};

const userChart = {
  view: "chart",
  type: "bar",
  value: "#age#",
  // label: "#age#",
  barWidth: 35,
  radius: 0,
  gradient: "falling",
  url: "./data/users.js",
  xAxis: {
    template: "#age#",
    title: "age",
  },
};

const userList = {
  view: "list",
  css: "user_list-style",
  id: userListId,
  autowidth: true,
  template: "#name# from #country#<span class='webix_icon wxi-close user-list-close'></span>",
  select: true,
  scrollX: false,
  maxHeight: 200,
  url: "./data/users.js",
  onClick: {
    "user-list-close": function (e, id) {
      this.remove(id);
      updateTopFiveListItems();
      return false;
    },
  },
  on: {
    onAfterRender: updateTopFiveListItems,
  },
};

function updateTopFiveListItems() {
  const list = $$(userListId);
  const userListHeadStyle = "user_list-head";
  const countOfListItems = list.count();
  const countTopItems = countOfListItems > 5 ? 5 : countOfListItems;
  list.clearCss(userListHeadStyle);
  for (let i = 0; i < countTopItems; i++) {
    list.addCss(list.data.order[i], userListHeadStyle);
  }
}

const userView = {
  id: "Users",
  rows: [
    {
      padding: 5,
      cols: [
        {
          view: "text",
          id: "inpFilter",
          name: "name",
          on: {
            onChange: (value) => {
              // $$("Userslist").data.filter((item) => item.name.toLowerCase().indexOf(value.toLowerCase(), 0) !== -1);
              $$(userListId).data.filter(
                (item) =>
                  value === item.name.toLowerCase().substring(0, value.length)
              );
              updateTopFiveListItems();
            },
          },
        },
        {
          view: "button",
          value: "Sort asc",
          css: "webix_primary",
          click: () => $$(userListId).sort("name", "asc"),
          width: 100,
        },
        {
          view: "button",
          value: "Sort desc",
          css: "webix_primary",
          click: () => $$(userListId).sort("name", "desc"),
          width: 100,
        },
      ],
    },
    userList,
    userChart,
  ],
};

const mainMultiview = {
  cells: [
    { id: "Dashboard", cols: [datatable, form] },
    userView,
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
  $$(menuListId).select("Dashboard");
});
