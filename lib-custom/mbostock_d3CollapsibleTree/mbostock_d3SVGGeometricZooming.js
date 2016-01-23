//http://bl.ocks.org/mbostock/3680999

function addD3SVGZoom(svg){
  // var svg = d3.select("body").append("svg")
  //     .attr("width", width)
  //     .attr("height", height)
  //   .append("g")
  //     .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom))
  //   .append("g");

  // svg.append("rect")
  //     .attr("class", "overlay")
  //     .attr("width", width)
  //     .attr("height", height);

  // svg.selectAll("circle")
  //     .data(data)
  //   .enter().append("circle")
  //     .attr("r", 2.5)
  //     .attr("transform", function(d) { return "translate(" + d + ")"; });

  // function zoom() {
  //   svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  // }


  svg.call(d3.behavior.zoom().scaleExtent([0, 8]).on("zoom", zoom))
  .append("g");

  // svg.append("rect")
  //     .attr("class", "overlay")
  //     .attr("width", width)
  //     .attr("height", height);

  //get original transform
  //TEMPORARY: can only handle translate  //Future: can handle other types of transform
  var origTransform = JSON.parse('{'+  '"'+svg.attr('transform').replace('(',"\":[").replace(')',"]")  +'}');
  // console.log("svg.attr('transform')",svg.attr('transform'));
  // console.log("svg origTransform",origTransform);

  function zoom() {
    console.log("d3.event.translate",d3.event.translate);
    svg.attr("transform", "translate(" + sumArray(origTransform['translate'], d3.event.translate) + ")scale(" + d3.event.scale + ")");
  }
  function sumArray(arr1, arr2){ //pArgs
    var finalArr = [];
    var shortestArrayLength = Math.min(arr1.length, arr2.length);
    var longestArrayLength = Math.max(arr1.length, arr2.length);
    var longestArray = (arr1.length>arr2.length? arr1: arr2);
    for(var i=0; i<shortestArrayLength; ++i){
      finalArr.push(arr1[i]+arr2[i]);
    }
    for(var i=shortestArrayLength; i<longestArray.length; ++i){
      finalArr.push(longestArray[i]);
    }
    return finalArr;
  }

  return svg;
}
