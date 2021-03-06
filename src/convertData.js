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
  transformAttributes_machineLearning_to_d3("START", machineLearningData_tree, d3_decisionTree_tree);
  return d3_decisionTree_tree;
}

function transformAttributes_machineLearning_to_d3(nodeName, src_machineLearningTreeData, dst_d3TreeData){
  // console.log(nodeName, src_machineLearningTreeData, dst_d3TreeData);
  dst_d3TreeData.name = dst_d3TreeData.name ||nodeName;
  if(src_machineLearningTreeData['tb'] || src_machineLearningTreeData['fb']){
    dst_d3TreeData.children = dst_d3TreeData.children ||[]; //define .children as an array if there is no .children defined yet --> need to check and avoid overwrites because this function is likely called twice for each level due to recursion
  }
  if(src_machineLearningTreeData['results']!=undefined){
      var treeLeafNode_classLabelResults = src_machineLearningTreeData['results'];
      var finalClassLabelNames = [];
      var finalClassMemberCount = -1; //initially set as an invalid count number
      for(var classLabelName in treeLeafNode_classLabelResults){
        finalClassLabelNames.push(classLabelName);
        var classMemberCount = treeLeafNode_classLabelResults[classLabelName];

        if(finalClassMemberCount!=null && finalClassMemberCount!=classMemberCount){
          console.warn(classLabelName,":","finalClassMemberCount != classMemberCount -->",finalClassMemberCount,classMemberCount);
        }
        if(classMemberCount>=finalClassMemberCount){
          finalClassMemberCount = classMemberCount;
        }
      }
      dst_d3TreeData.classLabelsText = "Class: "+ finalClassLabelNames.join(", ")+"";
      dst_d3TreeData.classMemberCount = "Count: "+finalClassMemberCount;
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

    var childNodeName = "Attribute: "+  (branchName=='tb'?  '': "NOT ")+src_machineLearningTreeData.value;//  +" [col"+src_machineLearningTreeData.col+"]";
    transformAttributes_machineLearning_to_d3(childNodeName, src_machineLearningTreeData[branchName], d3Data_childNode);
  });
}



function supplementData_machineLearning(machineLearningDataType, machineLearningData){
  if(machineLearningDataType!='tree'){
    if(arguments.length>=2) //TEMPORARY SHORTCUT (meant to be without curly brackets)
      return {};
    //else //TEMPORARY SHORTCUT
    machineLearningData = arguments[0];
  }

  //machineLearningData has {data:Array, result:Array, tree:Object}
  var machineLearningData_tree = machineLearningData.tree?  machineLearningData.tree: machineLearningData;
  //Future: check if col,value,results,tb,fb exist

  add_calculate_cumulativeChildNodesMemberCount(machineLearningData_tree);
  //Future: add_calculate_informationGain
  return machineLearningData;
}

//Future: Refactor. This function is very similar to the first function
function add_calculate_cumulativeChildNodesMemberCount(machineLearningTreeNode){
  var cumulativeChildNodesMemberCount = 0;

  if(machineLearningTreeNode['tb']){  cumulativeChildNodesMemberCount += add_calculate_cumulativeChildNodesMemberCount(machineLearningTreeNode['tb']);  }
  if(machineLearningTreeNode['fb']){  cumulativeChildNodesMemberCount += add_calculate_cumulativeChildNodesMemberCount(machineLearningTreeNode['fb']);  }
  if(!(machineLearningTreeNode['tb'] || machineLearningTreeNode['fb'])){
    if(cumulativeChildNodesMemberCount>0){console.warn("machine_learning member count");}
    treeLeafNode_classLabelResults = machineLearningTreeNode['results'];

    var finalClassMemberCount = -1; //initially set as an invalid count number
    for(var classLabelName in treeLeafNode_classLabelResults){
      var classMemberCount = treeLeafNode_classLabelResults[classLabelName];

      if(finalClassMemberCount!=null && finalClassMemberCount!=classMemberCount){
        console.warn(classLabelName,":","finalClassMemberCount != classMemberCount -->",finalClassMemberCount,classMemberCount);
      }
      if(classMemberCount>=finalClassMemberCount){
        finalClassMemberCount = classMemberCount;
      }
    }
    cumulativeChildNodesMemberCount = finalClassMemberCount;
  }
  machineLearningTreeNode['cumulativeChildNodesMemberCount'] = cumulativeChildNodesMemberCount;
  return cumulativeChildNodesMemberCount;
}

function add_calculate_informationGain(machineLearningTreeNode){
}
function formula_decisionTree_informationGain(){
}
function formula_decisionTree_informationGainRatio(){
}


