//http://bl.ocks.org/mbostock/3680999

function addD3SVGZoom(svg, mouseZoomArea_width,mouseZoomArea_height){
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

  //START
  svg.call(d3.behavior.zoom().scaleExtent([0, 8]).on("zoom", zoom));

  // //Getting the direct child "g" of the main "svg"
  // svg.selectAll('g').each(function(d,i){
  //   // console.log("svg.selectAll('g') EACH",d); //Strangely, select and selectAll selects 2 levels down, instead of the usual expected 1 level down
  // });
  // console.log("svg.select('g')", svg.select('g'), svg.select('g')[0].parentNode);
  // console.log("d3.select('g') ", d3.select('g'));
  // console.log("svg.selectAll  ", svg.selectAll('g'), svg.selectAll('g')[0].parentNode);
  // //Getting the correct element by getting the parent first then using d3.select
  // console.log("select the svg ", d3.select(svg[0][0].parentNode).attr('width'));
  // //root svg width is defined and has a value from the start, while tightestContainer-g width is generated and does not have a value until all attributes are generated
  // console.log( d3.select(svg.selectAll('g')[0].parentNode).attr('width')); //therefore this will give null at first (at the point when nothing has been generated)
  // console.log( d3.select(svg[0][0].parentNode).attr('width'));

  // var tightestContainer = svg.selectAll('g')[0].parentNode; //TEMPORARY
  // var tightestContainerBBox = tightestContainer.getBBox(); //var tightestContainerBoundingRect = tightestContainer.getBoundingClientRect();
  var sizeDefinedD3Container = d3.select(svg[0][0].parentNode);

  var width=mouseZoomArea_width ||sizeDefinedD3Container.attr('width') ||tightestContainerBBox.width;  var height=mouseZoomArea_height ||sizeDefinedD3Container.attr('height') ||tightestContainerBBox.height;
  svg.append('g')  //TEMPORARY //the svg from d3CollapsibleTree is at the level of one-appended-g, and the svg for d3SVGGeometricZooming is at the level of two-appended-g --> additional g-separation indicates that the rect (for zooming purposes) is clearly separate from the rest of the d3SVG
    .append("rect")
      .attr("class", "overlay") //this class "overlay" will work with CSS to make the rectangle transparent
      .attr("width", width)
      .attr("height", height);


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
