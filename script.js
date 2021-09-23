var label = {
    view: "label",
    id: "label",
    label: "My App",
    inputWidth:100,
    align: "left"
}

var button = {
    view: "button",
    type: "icon",
    icon: "mdi mdi-account",
    label: "Profile",
    width: 150,
    css: "webix_transparent",
    // align: "right"
}

var list = {
    view: "list",
    id: "main-list",
    width: 250,
    // height: 200,
    template: "#title#",
    select: true,
    scroll: false,
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
    // data: small_film_set,
    data: transformData(small_film_set),
    autoConfig: true,
    scrollX: false,
    scrollY: true
}

var form = {
    width: 300,
    view: "form",
    id: "main-form",
    elements: [
        // { view:"label", label:"EDIT FILMS" },
        { view:"template", template: "EDIT FILMS", type:"section" },
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
        }
    ]
}

function transformData(data) {
    return data.map((item) => {
        return {
            title: item.title,
            year: item.year,
            votes: item.votes,
            ratings: item.raitings,
            rank: item.rank,
        }
    })
};

webix.ui({
    // container: "root",
    rows: [
        {
            id: "header",
            paddingX: 12,
            cols: [label, button]
        },
        {
            // autoheight: true,
            // height: 600,
            id: "main",
            cols: [
                list, 
                {view: "resizer"}, 
                datatable, 
                {rows: [form, {}]}
            ]
        },
        {   
            id: "footer",
            view: "template",
            template: "The software is provided by <a href='https://webix.com'>https://webix.com</a>. All rights reserved (c)",
            autoheight: true,
            align: "center"
        }
    ]
});