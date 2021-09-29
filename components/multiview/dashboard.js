import form from "./form.js";
import { mainFormId } from "./form.js";
import { roundNumber, getRandomIntInclusive } from "../../reusableFunc/reusableFunc.js";

export const datatableId = "main-datatable";
export const tabbarId = "tabbar";

const categories = [
  { id: 1, value: "Drama" },
  { id: 2, value: "Fiction" },
  { id: 3, value: "Comedy" },
  { id: 4, value: "Horror" },
];

const tabbar = {
  view: "tabbar",
  id: tabbarId,
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

const dashboard = {
  id: "Dashboard",
  rows: [
    {
      cols: [tabbar, {}],
    },
    {
      cols: [datatable, form],
    },
  ],
};

export default dashboard;
