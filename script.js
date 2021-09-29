const mainFormId = "main-form";
const userListId = "Userslist";
const mainMultiviewProductsId = "Products";
const menuListId = "main-list";
const datatableId = "main-datatable";
const dashboardTabbar = "tabbar";
const userListHeadStyle = "user_list-head";
const userChartId = "user-chart";
const categories = [
  { id: 1, value: "Drama" },
  { id: 2, value: "Fiction" },
  { id: 3, value: "Comedy" },
  { id: 4, value: "Horror" },
];
const countryList = [
  { id: 1, value: "Germany" },
  { id: 2, value: "USA" },
  { id: 3, value: "Canada" },
  { id: 4, value: "France" },
  { id: 5, value: "China" },
  { id: 6, value: "Russia" },
  { id: 7, value: "Italy" },
  { id: 8, value: "Spain" },
];

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

const tabbar = {
  view: "tabbar",
  id: dashboardTabbar,
  value: "all",
  //value sets the ID of the necessary option from the options collection
  options: [
    { id: "all", value: "All" },
    { id: "old", value: "Old" },
    { id: "modern", value: "Modern" },
    { id: "new", value: "New" },
  ],
  on: {
    onAfterTabClick: () => {
      $$(datatableId).filterByAll();
    },
  },
};

const datatable = {
  view: "datatable",
  hover: "myHover",
  id: datatableId,
  url: "./data/data.js",
  columns: [
    {
      id: "rank",
      header: "#",
      css: "rank head_row cell-border-right",
      width: 50,
    },
    {
      id: "title",
      header: ["Film title", { content: "textFilter" }],
      fillspace: true,
      sort: "string",
    },
    {
      id: "categoryId",
      header: ["Category", { content: "selectFilter" }],
      collection: categories,
    },
    { id: "rating", header: ["Ratings", { content: "textFilter" }] },
    {
      id: "votes",
      header: ["Votes", { content: "textFilter" }],
      template: (item) => {
        return roundNumber(item.votes);
      },
    },
    { id: "year", header: "Year" },
    {
      id: "delete",
      header: "",
      css: "rank",
      template:
        "<span class ='webix_icon wxi-trash removeItemDatatable'></span>",
    },
  ],
  scrollX: false,
  select: true,
  onClick: {
    removeItemDatatable: function (e, id) {
      // console.log(this.getSelectedId(), "and id", id);
      const mainForm = $$(mainFormId);
      if (this.getSelectedId() && this.getSelectedId().row === id.row) {
        mainForm.clear();
        mainForm.clearValidation();
      }
      this.remove(id);
      //The return false line blocks further processing of a click action
      //(e.g. if selection is enabled, only clicks outside the active zone will select an item).
      return false;
    },
  },
  scheme: {
    $init: (obj) => {
      // console.log(obj);
      obj.categoryId = getRandomIntInclusive(1, 4);
    },
  },
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function roundNumber(num) {
  return Math.round(parseInt(num)).toString();
}

function clearForm() {
  const mainForm = $$(mainFormId);
  webix.confirm("Clear the form?").then(() => {
    mainForm.clear();
    $$(datatableId).unselectAll();
    mainForm.clearValidation();
  });
}

const btnSaveChanges = {
  view: "button",
  id: "btn-add-new-item",
  type: "form",
  label: "Save",
  css: "webix_primary",
  click: saveForm,
};

const btnClearForm = {
  view: "button",
  id: "btn-clear-form",
  label: "Clear",
  click: clearForm,
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
          rows: [
            {
              cols: [btnSaveChanges, btnClearForm],
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
      //здесь мб нужно что-то другое, что будет меньше ресурсов брать чем округление
      // (мб отбрасывание части строки вместе с запятой)
      return roundNumber(value) < 100000;
    },
    rating: (value) => {
      return webix.rules.isNotEmpty(value) && value != 0;
    },
  },
  on: {
    onChange: function () {
      this.save();
      //the method appears only when Form is bound
      //в нашем случае мы уже забайндили на мастера
    },
    onValidationError: function (key) {
      webix.message({ text: `${key} field is incorrect`, type: "error" });
    },
  },
};

function saveForm() {
  const form = $$(mainFormId);
  if (form.isDirty()) {
    if (!form.validate()) return false;
    form.save();
    webix.message({ text: "film info was saved", type: "success" });
    console.log("save");
  }
}

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
  },
};

const userChart = {
  view: "chart",
  id: userChartId,
  type: "bar",
  value: "#countCountry#",
  // label: "#age#",
  barWidth: 35,
  radius: 0,
  gradient: "falling",
  url: "./data/users.js",
  xAxis: {
    template: "#country#",
    title: "Country",
  },
  yAxis: {
    start: 0,
    end: 10,
    step: 2,
    //!!если будет больше 10 то не покажет, пофиксить потом нужно
  },
};

const userList = {
  view: "editlist",
  css: "user_list-style",
  id: userListId,
  editable: true,
  editor: "text",
  editValue: "name",
  autowidth: true,
  template:
    "#name# from #country#<span class='webix_icon wxi-close user-list-close'></span>",
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
    "data->onAfterFilter": updateTopFiveListItems,
    "data->onAfterSort": updateTopFiveListItems,
  },
  ready: updateTopFiveListItems,
  scheme: {
    // to process items when the data changes (includes initial loading as well).
    $change: (obj) => {
      if (obj.age > 26) {
        obj.$css = "young-users__highlight";
        // $$(userListId).clearCss(userListHeadStyle);
      }
    },
  },
  rules: {
    name: webix.rules.isNotEmpty,
  },
};

function updateTopFiveListItems() {
  const list = $$(userListId);
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
        {
          view: "button",
          value: "Add user",
          css: "webix_primary",
          id: "add_actor",
          width: 100,
          click: () => {
            const newUserName = "Lionel Messi";
            const idRandomCountry = getRandomIntInclusive(1, 8);
            const userAge = getRandomIntInclusive(1, 100);
            const userCountry = countryList[idRandomCountry - 1].value;
            //но может правильнее по id искать, если да, то юзанул бы find()

            $$(userListId).add({
              name: newUserName,
              age: userAge,
              country: userCountry,
            });
          },
        },
      ],
    },
    userList,
    userChart,
  ],
};

const mainMultiview = {
  cells: [
    {
      id: "Dashboard",
      rows: [
        {
          cols: [tabbar, {}],
        },
        {
          cols: [datatable, form],
        },
      ],
    },
    userView,
    treeTable,
    { id: "Admin" },
  ],
};

webix.ready(function () {
  webix.protoUI({ name: "editlist" }, webix.EditAbility, webix.ui.list);
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
  $$(mainFormId).bind($$(datatableId));
  $$(datatableId).registerFilter(
    $$(dashboardTabbar),
    {
      columnId: "year",
      compare: (value, filter) => {
        switch (filter) {
          case "all":
            return value;
          case "old":
            return value <= 1980;
          case "modern":
            return value > 1990;
          case "new":
            return value > 2010;
        }
      },
    },
    {
      getValue: (node) => node.getValue(),
      setValue: (node, value) => node.setValue(value),
    }
  );
  // const userChartView = $$(userChartId);
  $$(userChartId).sync($$(userListId), () => {
    $$(userChartId).group({
      by: "country",
      map: {
        countCountry: ["country", "count"],
      },
    });
  });
});
