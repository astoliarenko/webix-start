import { roundNumber } from "../../reusableFunc/reusableFunc.js";
import { datatableId } from "./dashboard.js";

export const mainFormId = "main-form";

function saveForm() {
  const form = $$(mainFormId);
  if (form.isDirty() && form.validate()) {
    form.save();
    webix.message({ text: "film info was saved", type: "success" });
  }
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
  value: "Save",
  css: "webix_primary",
  click: saveForm,
};

const btnClearForm = {
  view: "button",
  id: "btn-clear-form",
  value: "Clear",
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
    votes: (value) => +roundNumber(value) < 100000,
    rating: (value) => webix.rules.isNotEmpty(value) && value !== "0",
  },
  on: {
    onValidationError: function (key) {
      webix.message({ text: `${key} field is incorrect`, type: "error" });
    },
  },
};

export default form;
