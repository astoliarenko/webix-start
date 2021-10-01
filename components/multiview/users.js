import { getRandomIntInclusive } from "../../reusableFunc/reusableFunc.js";
import { usersCollection } from "../../collections/collections.js";

const userListHeadStyle = "user_list-head";
export const userChartId = "user-chart";
export const userListId = "Userslist";
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

const userChart = {
  view: "chart",
  id: userChartId,
  type: "bar",
  value: "#countCountry#",
  barWidth: 35,
  radius: 0,
  gradient: "falling",
  xAxis: {
    template: "#country#",
    title: "Country",
  },
  yAxis: {
    start: 0,
    end: 10,
    step: 2
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
  onClick: {
    "user-list-close": function (e, id) {
      usersCollection.remove(id);
      return false;
    },
  },
  rules: {
    name: webix.rules.isNotEmpty,
  },
};

const users = {
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
              $$(userListId).data.filter(
                (item) =>
                  value === item.name.toLowerCase().substring(0, value.length)
              );
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
            const idRandomCountry = getRandomIntInclusive(
              1,
              countryList.length
            );
            const userAge = getRandomIntInclusive(1, 100);
            const userCountry = countryList[idRandomCountry - 1].value;

            usersCollection.add({
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

export default users;
