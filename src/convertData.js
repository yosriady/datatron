//machineLearning refers to the machine_learning library from "npm install machine_learning;"
function convertData_machineLearning_to_d3(machineLearningDataType, machineLearningData){
  if(machineLearningDataType!='tree'){
    if(arguments.length>=2) //TEMPORARY SHORTCUT (meant to be without curly brackets)
      return {};
    //else //TEMPORARY SHORTCUT
    machineLearningData = arguments[0];
  }

  //machineLearningData has {data:Array, result:Array, tree:Object}
  var machineLearningData_tree = machineLearningData.tree?  machineLearningData.tree: machineLearningData;
  //Future: check if col,value,results,tb,fb exist

  var d3_decisionTree_tree = {};
  transformAttributes("START", machineLearningData_tree, d3_decisionTree_tree);
  return d3_decisionTree_tree;
}

function transformAttributes(nodeName, src_machineLearningTreeData, dst_d3TreeData){
  // console.log(nodeName, src_machineLearningTreeData, dst_d3TreeData);
  dst_d3TreeData.name = dst_d3TreeData.name ||nodeName;
  if(src_machineLearningTreeData['tb'] || src_machineLearningTreeData['fb']){
    dst_d3TreeData.children = dst_d3TreeData.children ||[]; //define .children as an array if there is no .children defined yet --> need to check and avoid overwrites because this function is likely called twice for each level due to recursion
  }

  var src_mlTreeData_branchNames = [];
  // ['tb','fb'].forEach(function(branchName){
  //   if(src_machineLearningTreeData[branchName]){
  //     src_mlTreeData_branchNames.push(branchName);
  //   }
  // });
  src_machineLearningTreeData['tb']?  src_mlTreeData_branchNames.push('tb'): '';
  src_machineLearningTreeData['fb']?  src_mlTreeData_branchNames.push('fb'): '';

  src_mlTreeData_branchNames.forEach(function(branchName){
    var d3Data_childNode = {};
    dst_d3TreeData.children.push(d3Data_childNode);

    var childNodeName = (branchName=='tb'?  '': "NOT ")+src_machineLearningTreeData.value  +" [col"+src_machineLearningTreeData.col+"]";
    transformAttributes(childNodeName, src_machineLearningTreeData[branchName], d3Data_childNode);
  });
}


