$(document).ready(function() {
    var zone = new FileDrop('dropzone', {input: false});

    // On Drag and Drop file upload
    zone.event('upload', function (e) {
      zone.eventFiles(e).each(function (file) {
        file.readData(
          function (str) {
            // Parse CSV
            var data = d3.csv.parseRows(str);

            // Render the table
            var table = tabulate(data.slice(1), data[0]);
            $('#data').DataTable({pageLength: 25});
          },
          function () { alert('Problem reading file.'); },
          'text'
        );
      });
    });

});

function tabulate(data, columns) {
    var table = d3.select("#data-tab").append("table").attr("id", "data").attr("class", "table table-striped table-hover"),
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
