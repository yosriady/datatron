// node debug machineLearning_data.js;

// dt //from below
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
// dt.tree //from below
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


if(require){
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

// window.addEventListener('load',function(){
  debugger;
  dt.print();

  console.log("Classify : ", dt.classify(['(direct)','USA','yes',5]));

  dt.prune(1.0); // 1.0 : mingain.
  dt.print();


// });





