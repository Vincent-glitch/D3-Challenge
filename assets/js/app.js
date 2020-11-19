// @TODO: YOUR CODE HERE!
// automatic chart resize function
var svgWidth = 960;
var svgHeight = 600;

    
  // if the SVG area isn't empty when the browser loads,
  // remove it and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");

  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }


  var margin = {
    top: 20,
    bottom: 50,
    right: 50,
    left: 60
  };

  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

  // Append SVG element
  var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

  // Append group element
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Read CSV
  d3.csv("./assets/data/data.csv").then(function(data) {
    console.log(data);

    //Parse Data
    data.forEach(function(data){
        data.obesity = +data.obesity;
        data.income = +data.income;
        data.smokes = +data.smokes;
        data.age = +data.age;
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
    });

    //Create Scales
    var xLinearScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.age))
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.smokes)])
        .range([height, 0]);

    //Create Axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //Append Axes
    chartGroup.append("g")
        .classed("axis", true)
        .call(leftAxis);

    chartGroup.append("g")
        .classed("axis", true)
        .attr("transform", "translate(0, " + height + ")")
        .call(bottomAxis);



    //Append Circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "10")
        .attr("fill", "gold")
        .attr("stroke-width", "1")
        .attr("stroke", "black");


    //Append Circle text///there's probably a way to do this with circles??
        var textGroup = chartGroup.selectAll('.stateText')
        .data(data)
        .enter()
        .append('text')
        // .classed('stateText', true)
        .attr('dx', d => xLinearScale(d.age) - 5 )
        .attr('dy', d => yLinearScale(d.smokes) + 4)
        .attr('font-size', '10px')
        .text(function(d){return d.abbr});
      

    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    //X axis label
    var AgeLabel = labelsGroup.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", 30)
      .attr("y", 30)
      .text("Age (Median)");


    //Y axis label
    var SmokerLabel = labelsGroup.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("x", 300)
      .attr("y", -500)
      .attr("dy", "2em")
      .classed("axis=test", true)
      .attr("transform", "rotate(-90)")
      .text("Smokers (in %)");


    }).catch(function(error) {
      console.log(error);
    });
