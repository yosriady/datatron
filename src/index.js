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
                var parsedSample = typecastNumbers(sample);
                parsedData.push(parsedSample);
            });

            // Render the table
            $('#data_wrapper').remove();
            var columns = parsedData[0];
            var table = tabulate("data", parsedData.slice(1), columns);
            $('#data').DataTable({pageLength: 25});

            // Train classifier
            naiveBayesClassifier = new bayes.NaiveBayes({
              columns: parsedData[0],
              data: parsedData.slice(1),
              verbose: true
            });
            naiveBayesClassifier.train();
            console.log(naiveBayesClassifier);

            // render selects with id select-COLUMNNAME and options
            // TOFIX: HACK
            var blindColumns = _.without(columns, columns[columns.length - 1]);
            console.log(blindColumns);
            _.each(blindColumns, function(columnName, columnIndex){
                var control = select(columnName, _.uniq(_.pluck(parsedData, columnIndex)));
            })

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

    $( "#predict-btn" ).click(function() {
      var blindColumns = _.without(naiveBayesClassifier.columns, naiveBayesClassifier.columns[naiveBayesClassifier.columns.length -1]);
      console.log(blindColumns);
      var sample = _.map(blindColumns, function(columnName){
        var selectValue = $("#predict-"+columnName).val();
        if (!_.isEqual(selectValue, columnName)) {
            return selectValue;
        } else {
            return null;
        }
      })
      sample = typecastNumbers(sample);
      console.log(naiveBayesClassifier.predict(sample));
      // TODO: display vizualizations
    });

});

function select(columnName, values) {
    values.unshift(">Pick a " + columnName);
    var dropDown = d3.select("#predict-tab")
                    .append("select").attr("id", "predict-"+columnName).attr("class", "col-xs-3");
    var options = dropDown.selectAll('option').data(values.slice(1)); // Data join
    options.enter().append("option").text(function(d) { return d; });
    return dropDown;
}

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

function typecastNumbers(sample){
    return _.map(sample, function(attribute){
        var parsedAttribute;
        if (parsedAttribute = parseInt(attribute, 10)){
            return parsedAttribute;
        }
        return attribute;
    });
}