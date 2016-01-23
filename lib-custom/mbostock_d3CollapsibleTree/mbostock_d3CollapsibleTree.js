function createD3CollapsibleDecisionTree(container_querySelectorStr, dataInput, inputType, isExpanded, isBoldFontForClassLabel){
    var jsonSrcPath, jsonDataStr, jsonDataObj;
    if(!inputType || inputType=='data'){
      jsonDataObj = dataInput;
      inputType = 'data';
    }
    else{
      if(inputType=='str'){} //Future: handle json str
      else if(inputType=='path' || inputType=='url'){} //Future: handle json path
    }

    if(typeof isBoldFontForClassLabel=='undefined'){
      isBoldFontForClassLabel = true;
    }

    //This Library is based on mbostock d3CollapsibleTree
    //CUSTOM modifications mades for dataInput and additional caption display
    var margin = {top: 20, right: 120, bottom: 20, left: 120},
        width = 10000 - margin.right - margin.left,  //### //originally 960
        height = 10000 - margin.top - margin.bottom; //### //originally 800

    var i = 0,
        duration = 750,
        root;

    var tree = d3.layout.tree()
        .size([height, width]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });

    var svg = d3.select(container_querySelectorStr).append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //CUSTOM
    switch(inputType){
      case 'data':
        processDataInput(null,dataInput); break;  ////d3.data(dataInput); break; //Note: d3.data is not a function --> d3.select('someElement').data([3,6,9]).style("font-size", function(d){ return d+"px"; });
      case "str":
        d3.json.parse(dataInput, processDataInput); break;
      case "path":
        d3.json(dataInput, processDataInput); break;
    }
    ////d3.json(jsonPath,
    function processDataInput(error, flare) { ////"http://bl.ocks.org"+"/mbostock/raw/4063550/flare.json";
      if (error) throw error;

      root = flare;
      root.x0 = height / 2;
      root.y0 = 0;

      function collapse(d) {
        if (d.children) {
          d._children = d.children;
          d._children.forEach(collapse);
          d.children = null;
        }
      }

      if(!isExpanded){//CUSTOM: start as collapsed(default) or expanded(if specified)
        root.children.forEach(collapse);
      }
      update(root);
    }; ////});

    d3.select(self.frameElement).style("height", "800px");

    function update(source) {

      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse(),
          links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach(function(d) { d.y = d.depth * 180; });

      // Update the nodes…
      var node = svg.selectAll("g.node")
          .data(nodes, function(d) { return d.id || (d.id = ++i); });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
          .on("click", click);

      nodeEnter.append("circle")
          .attr("r", 1e-6)
          .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeEnter.append("text")
          .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
          .attr("dy", ".35em")
          .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
          .text(function(d) { return d.name; })
          .style("fill-opacity", 1e-6);

      //CUSTOM: additional caption display
      nodeEnter.append("text")
          .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
          .attr("dy", "1.35em") //Future: dynamically set larger font size based on original font size
          .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
          .text(function(d) { return d.classLabelsText; })
          .style("fill-opacity", 1e-6)
          // .style("font-size", function(d){return "1em"}) //Future: dynamically set larger font size based on original font size
          .style("font-weight", isBoldFontForClassLabel? "bold":"initial" );
      //CUSTOM: additional caption display
      nodeEnter.append("text")
          .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
          .attr("dy", "2.35em") //Future: dynamically set larger font size based on original font size
          .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; }) //Future: dynamically set larger font size based on original font size
          .text(function(d) { return d.classMemberCount; })
          .style("fill-opacity", 1e-6)
          // .style("font-size", function(d){return "1em"}) //Future: dynamically set larger font size based on original font size
          .style("font-weight", isBoldFontForClassLabel? "bold":"initial" );


      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

      nodeUpdate.select("circle")
          .attr("r", 4.5)
          .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeUpdate.select("text")
          .style("fill-opacity", 1);
      //CUSTOM: additional caption display //the above select only selects the first "text"
      nodeUpdate.selectAll("text")
          .style("fill-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node.exit().transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
          .remove();

      nodeExit.select("circle")
          .attr("r", 1e-6);

      nodeExit.select("text")
          .style("fill-opacity", 1e-6);

      // Update the links…
      var link = svg.selectAll("path.link")
          .data(links, function(d) { return d.target.id; });

      // Enter any new links at the parent's previous position.
      link.enter().insert("path", "g")
          .attr("class", "link")
          .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
          });

      // Transition links to their new position.
      link.transition()
          .duration(duration)
          .attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
          .duration(duration)
          .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
          })
          .remove();

      // Stash the old positions for transition.
      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    // Toggle children on click.
    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }
}
