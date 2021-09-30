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

//формы и кнопку можно импортить из form.js, немного изменив функцию (изменить входные параметры) и перезаписав id кнопок
//ну и не забыть про message - заменить текст (те тоже параметром передать в функ можно)

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
      // console.log(this.getSelectedId(), "and id", id);
      const mainForm = $$(adminFormId);
      if (this.getSelectedId() && this.getSelectedId().row === id.row) {
        mainForm.clear();
        mainForm.clearValidation();
      }
      //   this.remove(id);
      //   filmCategoryCollection.remove($$(adminFormId).getSelectedId());
      filmCategoryCollection.remove(id);
      //желательно бы переназначить id по порядку после удаления элементе
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
        // {
        //   view: "text",
        //   label: "Id",
        //   id: "inpId",
        //   name: "id",
        //   invalidMessage: "Id must not be empty",
        // },
        {
          view: "text",
          label: "Category",
          id: "inpCategory",
          name: "value",
          invalidMessage: "Current category",
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
  //   rules: {
  //     id: webix.rules.isNotEmpty,
  //     value: (value) => {
  //       return value > 1970 && value <= new Date().getFullYear();
  //     },
  //   },
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
