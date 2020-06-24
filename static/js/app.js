function buildCharts(sampleid) {

    // Fetch the JSON data and console log it.
    // Must create a server in Bash and use Incognito Window
    // in browser or Shft + Ctrl + R to refresh browser and ignore cache. 
    d3.json("samples.json").then((incomingData) => {
        //    function otuPlot(id) {
        console.log(incomingData);

        // Use filter() to pass the function as its argument
        var samples = incomingData.samples;
        console.log(samples);
        //Filters through samples 
        var otuSamples = samples.filter(sample => sample.id==sampleid)[0];
        console.log(otuSamples, "This is working");
        // Use the map method with the arrow function to return all the filtered OTU's
        //var sample_values = otuSamples.map(samples => samples.name);
        // Use the map method with the arrow function to return all the filtered OTU metascores.
        //var otu_ids = otuSamples.map(samples => samples.metascore);
        var otu_ids = otuSamples.otu_ids.slice(0,10).reverse();
        var sample_values = otuSamples.sample_values.slice(0,10).reverse();
        // Check your filtered metascores
        console.log(otuSamples);
        console.log(sample_values);
        console.log(otu_ids);
        //Create a trace
        var trace1 = {
            x: sample_values,
            y: otu_ids,
            //text: otu_labels,
            type: "bar",
            orientation: "h"
        };
        //Create the data array for the plot
        var incomingData = [trace1];
        //Define the plot layout
        var layout = {
            title: "Top 10  Operational Taxonomic Units (OTUs)",
            barmode: "group",
            xaxis: { title: "Title" },
            yaxis: { title: "Metascore OTU's" }
        };
        //Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bar", incomingData, layout);
        
        //Bubble Charts 
        var trace2 = {
            x: otuSamples.otu_ids,
            y: otuSamples.sample_values,
            mode: 'markers',
            marker: {
                color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
                opacity: [1, 0.8, 0.6, 0.4],
                size: [40, 60, 80, 100]
              }
        };
        //Create the data array for the plot
        var incomingData = [trace2];
        //Define the plot layout
        var layout = {
            title: "Top 10  Operational Taxonomic Units (OTUs)",
            showlegend: false,
            height: 600,
            width: 600
        };
        //Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bubble", incomingData, layout);

    });
}
function buildMetadata(sampleid) {

    console.log(sampleid)
}

function init() {
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then((incomingData) => {
        var sampleNames = incomingData.names;

        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

    var firstSample= sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    });
}

function optionChanged(sampleid) {
    buildCharts(sampleid);
    buildMetadata(sampleid);
}

init(); 