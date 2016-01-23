var _ = require('underscore');
var d3 = require('d3');
var bayes = require('node-bayes');

$(document).ready(function() {
    var zone = new FileDrop('dropzone', {input: false});
    var rawData;
    var parsedData = [];
    var naiveBayesClassifier;

    // On Drag and Drop file upload
    zone.event('upload', function (e) {
      zone.eventFiles(e).each(function (file) {
        file.readData(
          function (str) {
            // Parse CSV
            rawData = d3.csv.parseRows(str);

            // Typecast number strings to number
            _.each(rawData, function(sample){
                var parsedSample = _.map(sample, function(attribute){
                    var parsedAttribute;
                    if (parsedAttribute = parseInt(attribute, 10)){
                        return parsedAttribute;
                    }
                    return attribute;
                });
                parsedData.push(parsedSample);
            });

            // Render the table
            $('#data_wrapper').remove();
            var table = tabulate("data", parsedData.slice(1), parsedData[0]);
            $('#data').DataTable({pageLength: 25});

            // Train classifier
            naiveBayesClassifier = new bayes.NaiveBayes({
              columns: parsedData[0],
              data: parsedData.slice(1),
              verbose: true
            });
            naiveBayesClassifier.train();

            // Something else below

          },
          function () { alert('Problem reading file.'); },
          'text'
        );
      });
    });

    // Add new listeners
    $( "#nav-data" ).click(function() {
      alert( "Handler for .click() called." );
      console.log(naiveBayesClassifier);
    });

    $( "#nav-predict" ).click(function() {
      alert( "Handler for .click() called." );
      console.log(naiveBayesClassifier);
    });

});

// Table generator
function tabulate(table_id, data, columns) {
    var table = d3.select("#data-tab").append("table").attr("id", table_id).attr("class", "table table-striped table-hover"),
        thead = table.append("thead"),
        tbody = table.append("tbody");

    // Append the header row
    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
            .text(function(column) {
                return column;
            });

    // Create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

    // Create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(row) {
            return columns.map(function(column, index) {
                return {
                    column: column,
                    value: row[index]
                };
            });
        })
        .enter()
        .append("td")
            .text(function(d) { return d.value; });

    return table;
}
