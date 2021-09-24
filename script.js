const label = {
    view: "label",
    id: "header-label",
    label: "My App",
}

const mainListLabel = {
    view: "label",
    id: "main-list-label",
    label: "<span class='webix_icon wxi-check'></span> Connected",
    css: "main-list-label-style",
}

const button = {
    view: "button",
    id: "header-button",
    type: "icon",
    icon: "mdi mdi-account",
    label: "Profile",
    width: 150,
    css: "webix_transparent",
    click: () => {
        $$("myPopup").show();
    }
}

const list = {
    view: "list",
    id: "main-list",
    width: 250,
    template: "#title#",
    select: true,
    scroll: false,
    css: "main-list-style",
    data: [
      { id:1, title:"Dashboard" },
      { id:2, title:"Users" },
      { id:3, title:"Products" },
      { id:4, title:"Locations" },
    ]
  };

const datatable = {
    view: "datatable",
    id: "main-datatable",
    data: small_film_set,
    autoConfig: true,
    scrollX: false,
}

const form = {
    width: 300,
    view: "form",
    id: "main-form",
    elements: [
        { view:"template", template: "edit films", type:"section" },
        {
            margin: 10,
            rows: [
                { view:"text", label:"Title", id: "inpTitle", name: "title", invalidMessage: "Title must not be empty" },
                { view:"text", label:"Year", id: "inpYear", name: "year", invalidMessage: "Ent. year between 1970 and cur."},
                { view:"text", label:"Rating", id: "inpRating", name: "rating", invalidMessage: "Cannot be empty or 0"},
                { view:"text", label:"Votes", id: "inpVotes", name: "votes", invalidMessage: "Votes must be less than 100000"},
                {   
                    margin: 10,
                    cols: [
                        {
                            view: "button",
                            value: "Add new",
                            css: "webix_primary",
                            click: addItem
                        },
                        {
                            view: "button",
                            value: "Clear",
                            click: clearForm
                        }
                    ]
                }
            ]
        },
        {}
    ],
    rules: {
        title: webix.rules.isNotEmpty,
        year: (value) => {
            return (value > 1970 && value <= new Date().getFullYear());
        },
        votes: (value) => {
            return value < 100000;
        },
        rating: (value) => {
            return (value !== "" && value !== 0);
        }
    },
    on: {
        onValidationError:function(key){
            webix.message({text: `${key} field is incorrect`, type:"error"});
        }
    }
}

const mainFormId = "main-form";
const widthPopUp = 300;
const paddingXToolbar = 12;

function clearForm() {
    webix.confirm("Clear the form?")
    .then( () => {
        $$(mainFormId).clear();
    });
}

function addItem() {
    let res = $$(mainFormId).validate();
    if (res) {
        let itemData = $$(mainFormId).getValues();
        webix.message({text: "film info was added to table", type:"success"});
        $$("main-datatable").add(itemData);
        $$(mainFormId).clear();
    }
}

webix.ui({
    view:"popup",
    id:"myPopup",
    height: 72,
    width:300,
    position: function(state) { 
        state.left = document.documentElement.clientWidth - widthPopUp - paddingXToolbar;
        state.top = 40;
    },
    move: false,
    head:"My window",
    body:{
        view: "list",
        id: "pop-list",
        width: widthPopUp,
        template: "#title#",
        select: true,
        scroll: false,
        data: [
            { id:1, title:"Settings" },
            { id:2, title:"Log Out" },
        ]
    }
});

webix.ui({
    rows: [
        {
            view: "toolbar",
            id: "header",
            paddingX: paddingXToolbar,
            css: "webix_dark",
            cols: [label, button]
        },
        {
            id: "main",
            cols: [
            {
                // css: "menu",
                rows: [
                    list,
                    mainListLabel
                ]
            },
                {view: "resizer"}, 
                datatable,
                form
            ]
        },
        {   
            id: "footer",
            view: "template",
            template: "The software is provided by <a href='https://webix.com'>https://webix.com</a>. All rights reserved (c)",
            autoheight: true,
            css: "footer-style",
            align: "center"
        }
    ]
});