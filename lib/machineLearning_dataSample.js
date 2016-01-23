// node debug machineLearning_data.js;

// dt (printed in NodeJS Command Line, by code below)
var theMachineLearningGeneratedDecisionTreeObject = {
  data: 
   [ [ 'slashdot', 'USA', 'yes', 18, 'None' ],
     [ 'google', 'France', 'yes', 23, 'Premium' ],
     [ 'digg', 'USA', 'yes', 24, 'Basic' ],
     [ 'kiwitobes', 'France', 'yes', 23, 'Basic' ],
     [ 'google', 'UK', 'no', 21, 'Premium' ],
     [ '(direct)', 'New Zealand', 'no', 12, 'None' ],
     [ '(direct)', 'UK', 'no', 21, 'Basic' ],
     [ 'google', 'USA', 'no', 24, 'Premium' ],
     [ 'slashdot', 'France', 'yes', 19, 'None' ],
     [ 'digg', 'USA', 'no', 18, 'None' ],
     [ 'google', 'UK', 'no', 18, 'None' ],
     [ 'kiwitobes', 'UK', 'no', 19, 'None' ],
     [ 'digg', 'New Zealand', 'yes', 12, 'Basic' ],
     [ 'slashdot', 'UK', 'no', 21, 'None' ],
     [ 'google', 'UK', 'yes', 18, 'Basic' ],
     [ 'kiwitobes', 'France', 'yes', 19, 'Basic' ] ],
  result: 
   [ 'None',
     'Premium',
     'Basic',
     'Basic',
     'Premium',
     'None',
     'Basic',
     'Premium',
     'None',
     'None',
     'None',
     'None',
     'Basic',
     'None',
     'Basic',
     'Basic' ],
  tree: 
   { col: 0,
     value: 'google',
     results: undefined,
     tb: 
      { col: 3,
        value: '21',
        results: undefined,
        tb: [Object],
        fb: [Object] },
     fb: 
      { col: 0,
        value: 'slashdot',
        results: undefined,
        tb: [Object],
        fb: [Object] } } };

// ------------------------------
// dt.tree (printed in NodeJS Command Line, by code below)
var theMachineLearningGeneratedDecisionTreeData = {
  col: 0,
  value: 'google',
  results: undefined,
  tb: 
   { col: 3,
     value: '21',
     results: undefined,
     tb: 
      { col: -1,
        value: undefined,
        results: [Object],
        tb: undefined,
        fb: undefined },
     fb: 
      { col: 2,
        value: 'no',
        results: undefined,
        tb: [Object],
        fb: [Object] } },
  fb: 
   { col: 0,
     value: 'slashdot',
     results: undefined,
     tb: 
      { col: -1,
        value: undefined,
        results: [Object],
        tb: undefined,
        fb: undefined },
     fb: 
      { col: 2,
        value: 'yes',
        results: undefined,
        tb: [Object],
        fb: [Object] } } };

  //Not printed above: the ending (leaf-node)
  //eg Start->Google->21
  //eg IsGoogleOrNot->Is21OrNot->is21
  var theMachineLearningGeneratedDecisionTreeData_leafNode = {
    col:-1,
    value:undefined,
    results:Object({Premium:3}), //This is actually the ClassLabel --> ClassLabel is "Premium" and the Number(Count) of Instances of Google->21->Premium is 3
    tb:undefined,
    fb:undefined,
  };

// dt.tree (printed by web-browser console.log(JSON.stringify(dt.tree)) function)
var theFullMachineLearningGeneratedDecisionTreeData = JSON.parse('{"col":0,"value":"google","tb":{"col":3,"value":"21","tb":{"col":-1,"results":{"Premium":3}},"fb":{"col":2,"value":"no","tb":{"col":-1,"results":{"None":1}},"fb":{"col":-1,"results":{"Basic":1}}}},"fb":{"col":0,"value":"slashdot","tb":{"col":-1,"results":{"None":3}},"fb":{"col":2,"value":"yes","tb":{"col":-1,"results":{"Basic":4}},"fb":{"col":3,"value":"21","tb":{"col":-1,"results":{"Basic":1}},"fb":{"col":-1,"results":{"None":3}}}}}}');

// ------------------------------
// > dt.print(); //from below
// < 0:google? 
// < T->
// < 3:21? 
// <   T->
// < { Premium: 3 }
// <   F->2:no? 
// <     T->
// < { None: 1 }
// <     F->{ Basic: 1 }
// < F->0:slashdot? 
// <   T->{ None: 3 }
// <   F->2:yes? 
// <     T->{ Basic: 4 }
// <     F->3:21? 
// <       T->
// < { Basic: 1 }
// <       F->
// < { None: 3 }

function isInNodeJSCommandLine(){
  return (typeof c !='undefined' && c.stdout && c.stdout.write);
}
if(typeof require != 'undefined'){
  var ml = require('machine_learning');
}

var data =[['slashdot','USA','yes',18],
           ['google','France','yes',23],
           ['digg','USA','yes',24],
           ['kiwitobes','France','yes',23],
           ['google','UK','no',21],
           ['(direct)','New Zealand','no',12],
           ['(direct)','UK','no',21],
           ['google','USA','no',24],
           ['slashdot','France','yes',19],
           ['digg','USA','no',18,],
           ['google','UK','no',18,],
           ['kiwitobes','UK','no',19],
           ['digg','New Zealand','yes',12],
           ['slashdot','UK','no',21],
           ['google','UK','yes',18],
           ['kiwitobes','France','yes',19]];
var result = ['None','Premium','Basic','Basic','Premium','None','Basic','Premium','None','None','None','None','Basic','None','Basic','Basic'];

var dt = new ml.DecisionTree({
    data : data,
    result : result
});

dt.build();
if(isInNodeJSCommandLine()){
  dt.print(); //only for nodeJS command line --> causes error on web-browser: Cannot read property 'write' of undefined
}
// debugger;
if(!isInNodeJSCommandLine()){
  console.log(dt.tree,'\n'
    +"JSON String\n"+JSON.stringify(dt.tree)
  );
}


console.log("Classify : ", dt.classify(['(direct)','USA','yes',5]));

dt.prune(1.0); // 1.0 : mingain.
if(isInNodeJSCommandLine()){
  dt.print(); //only for nodeJS command line --> causes error on web-browser: Cannot read property 'write' of undefined
}
if(!isInNodeJSCommandLine()){
  console.log(dt.tree,'\n'
    +"JSON String\n"+JSON.stringify(dt.tree)
  );
}




