var label = {
    view: "label",
    id: "header-label",
    label: "My App",
}

var mainListLabel = {
    view: "label",
    id: "main-list-label",
    label: "<span class='webix_icon wxi-check'></span> Connected",
    css: "main-list-label-style",
}

var button = {
    view: "button",
    id: "header-button",
    type: "icon",
    icon: "mdi mdi-account",
    label: "Profile",
    width: 150,
    css: "webix_transparent",
}

var list = {
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

var datatable = {
    view: "datatable",
    id: "main-datatable",
    data: small_film_set,
    autoConfig: true,
    scrollX: false,
}

var form = {
    width: 300,
    view: "form",
    id: "main-form",
    elements: [
        { view:"template", template: "edit films", type:"section" },
        {
            margin: 10,
            rows: [
                { view:"text", label:"Title" },
                { view:"text", label:"Year" },
                { view:"text", label:"Ratings" },
                { view:"text", label:"Votes" },
                {   
                    margin: 10,
                    cols: [
                        {
                            view: "button",
                            value: "Add new",
                            css: "webix_primary"
                        },
                        {
                            view: "button",
                            value: "Clear",
                        }
                    ]
                }
            ]
        },
        {}
    ]
}

webix.ui({
    rows: [
        {
            view: "toolbar",
            id: "header",
            paddingX: 12,
            css: "webix_dark",
            cols: [label, button]
        },
        {
            id: "main",
            cols: [
            {
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