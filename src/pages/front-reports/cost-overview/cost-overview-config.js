export const pageConfiguration = {

  'general-ledger':{
    reportsMenuButton:{
      label:'General Ledger',
      id:'general-ledger',
      href:'/cost-overview/general-ledger'
    },
    groupByButtons:[
      {'_id':1,'label':'Legal Entity','value':'SOURCE_LEGAL_ENTITY','selected':true},
      {'_id':2,'label':'Cost Centre','value':'SOURCE_COST_CENTRE'},
      {'_id':3,'label':'Nominal','value':'NOMINALS'}
    ],
    types:[
      {'id':1,'label':'Table',materialIcon:'grid_on','value':'table'},
      {'id':4,'label':'Donut',materialIcon:'donut_large','value':'donut'},
      {'id':5,'label':'Pie',materialIcon:'pie_chart_outlined','value':'pie','selected':true},
      {'id':6,'label':'Bar',materialIcon:'insert_chart','value':'bar'}],
  },
  'cost-pools':{
    reportsMenuButton:{
      label:'Cost Pools',
      id:'cost-pools',
      href:'/cost-overview/cost-pools'
    },
    types:[
      {'id':1,'label':'Table',materialIcon:'grid_on','value':'table'},
      {'id':4,'label':'Donut',materialIcon:'donut_large','value':'donut','selected':true},
      {'id':5,'label':'Pie',materialIcon:'pie_chart_outlined','value':'pie'},
      {'id':6,'label':'Bar',materialIcon:'insert_chart','value':'bar'}],
  },
  'cost-category':{
    reportsMenuButton:{
      label:'cost Category',
      id:'cost-category',
      href:'/cost-overview/cost-category'
    },
    types:[
      {'id':1,'label':'Table',materialIcon:'grid_on','value':'table'},
      {'id':4,'label':'Donut',materialIcon:'donut_large','value':'donut','selected':true},
      {'id':5,'label':'Pie',materialIcon:'pie_chart_outlined','value':'pie'},
      {'id':6,'label':'Bar',materialIcon:'insert_chart','value':'bar'}],
  },
  'functional':{
    reportsMenuButton:{
      label:'functional',
      id:'functional',
      href:'/cost-overview/functional'
    },
    groupByButtons:[
      {'_id':6,'label':'Functional Level 1','value':'ITFBLevel1','selected':true},
      {'_id':7,'label':'Functional Level 2','value':'ITFBLevel2'},
      {'_id':8,'label':'Functional Level 3','value':'ITFBLevel3'}
    ],
    types:[
      {'id':1,'label':'Table',materialIcon:'grid_on','value':'table'},
      {'id':4,'label':'Sunburst',materialIcon:'radio_button_checked','value':'sunburst','selected':true},
    ],
  },
  'service-list':{
    reportsMenuButton:{
      label:'service list',
      id:'service-list',
      href:'/cost-overview/service-list'
    },
    groupByButtons:[
      {'_id':9,'label':'Service Type','value':'SERVICE_TYPE','selected':true},
      {'_id':22,'label':'Service Group','value':'SERVICE_GROUP'},
      {'_id':11,'label':'Service Name','value':'SERVICE_NAME',disabled: true,selected: true}
    ],
    types:[
      {'id':1,'label':'Table',materialIcon:'grid_on','value':'table'},
      {'id':44,'label':'TreeMap',materialIcon:'view_quilt','value':'TreeMap'},
      {'id':4,'label':'Sunburst',materialIcon:'radio_button_checked','value':'sunburst','selected':true},
    ],
  }

};

export const reportsMenuSubLinks=[
  {'_id':1,'id':'general-ledger', href:'/cost-overview/general-ledger','label':'General Ledger'},
  {'_id':2,'id':'cost-pools', href:'/cost-overview/cost-pools','label':'Cost Pools'},
  {'_id':3,'id':'cost-category', href:'/cost-overview/cost-category','label':'Cost Category'},
  {'_id':4,'id':'functional', href:'/cost-overview/functional','label':'Functional'},
  {'_id':5,'id':'service-consumption',href:'/cost-overview/service-list','label':'Service List'},
  {'_id':6,'id':'service-consumption',href:'/cost-overview/service-consumption','label':'Service Consumption'}
];