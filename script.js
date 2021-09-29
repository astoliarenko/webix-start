import multiview from "./components/multiview/index.js";
import { mainFormId } from "./components/multiview/form.js";
import { userListId,userChartId } from "./components/multiview/users.js";
import { mainMultiviewProductsId } from "./components/multiview/products.js";

const menuListId = "main-list";
const datatableId = "main-datatable";
const dashboardTabbar = "tabbar";

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
    }
  },
  scroll: false,
  css: "main-list-style",
  data: ["Dashboard", "Users", mainMultiviewProductsId, "Admin"],
};
//------------------------------------

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
          multiview,
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
  // webix.debug({ events:true });
});
