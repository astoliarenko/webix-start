import { filmCategoryCollection } from "../../collections/collections.js";
const btnSave = {
  view: "button",
  id: "btn_admin-add-new-item",
  type: "form",
  value: "Save",
  css: "webix_primary",
  click: saveForm,
};

const btnClear = {
  view: "button",
  id: "btn_admin-clear-form",
  value: "Clear",
  click: clearForm,
};

function saveForm() {
  const form = $$(adminFormId);
  if (form.isDirty() && form.validate()) {
    form.save();
    $$(adminDatatableId).unselectAll();
    //создать id
    webix.message({ text: "Category was saved", type: "success" });
  }
}

function clearForm() {
  const mainForm = $$(adminFormId);
  webix.confirm("Clear the form?").then(() => {
    mainForm.clear();
    $$(adminDatatableId).unselectAll();
    mainForm.clearValidation();
  });
}

export const adminDatatableId = "admin-datatable";
export const adminFormId = "admin-form";
const datatable = {
  view: "datatable",
  id: adminDatatableId,
  select: true,
  editable: true,
  columns: [
    {
      id: "id",
      header: "#",
    },
    {
      id: "value",
      header: "Category",
      fillspace: true,
      editor: "text",
    },
    {
      id: "delete",
      header: "",
      css: "rank",
      template:
        "<span class ='webix_icon wxi-trash removeItemDatatable'></span>",
    },
  ],
  onClick: {
    removeItemDatatable: function (e, id) {
      const mainForm = $$(adminFormId);
      if (this.getSelectedId() && this.getSelectedId().row === id.row) {
        mainForm.clear();
        mainForm.clearValidation();
      }
      filmCategoryCollection.remove(id);
      return false;
    },
  },
};

const form = {
  width: 300,
  view: "form",
  id: adminFormId,
  elements: [
    { view: "template", template: "edit categories", type: "section" },
    {
      margin: 10,
      rows: [
        {
          view: "text",
          label: "Category",
          id: "inpCategory",
          name: "value",
          invalidMessage: "Category is not correct",
        },
        {
          margin: 10,
          rows: [
            {
              cols: [btnSave, btnClear],
            },
          ],
        },
      ],
    },
    {},
  ],
  rules: {
    value: (value) => {
      const regexp = /[a-z]/i;
      let i = true;
      value.split("").forEach((item) => {
        if (!item.match(regexp)) {
          i = false;
        }
      });
      return i;
    },
  },
  on: {
    onValidationError: function (key) {
      webix.message({ text: `${key} field is incorrect`, type: "error" });
    },
  },
};

const admin = {
  id: "Admin",
  cols: [datatable, form],
};

export default admin;
