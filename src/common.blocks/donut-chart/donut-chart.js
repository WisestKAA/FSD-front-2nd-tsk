import * as d3 from "d3";
import "d3-selection-multi";

class DonutChart{
    constructor(elem, width=120, height=120, rating) {
        this.donut = elem;        

        this.initStyleClasses();
        this.initDonutChart(width, height, rating);
    }

    initStyleClasses(){
        this.styleClasses = {
            value: "donut-chart__value",
            text: "donut-chart__text",
            path: "donut-chart__path",
        };
    }

    initDonutChart(width, height, rating){
        var radius = Math.min(width, height) / 2 ;
        
        this.svg = d3.select(this.donut)
            .append("svg")
                .attr("width", width)
                .attr("height", height)
            .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        
        this.arcAttribute = d3.arc()            
            .innerRadius((Math.min(width, height) /2) * 0.90)
            .outerRadius(radius);

        this.pie = d3.pie()
            .value(function(d) {return d.value;})
            .sort(null)
            .padAngle(0.02);;

        this.getGradients()

        
        this.data = d3.entries(rating);
        this.paths = this.svg.selectAll("path")
            .data(this.pie(this.data))
            .enter()
            .append("g")
                .style("fill", (d, index) => `url(#gradient${index})`)
            .append("path")
                .attrs({
                    d: this.arcAttribute,
                    fill: (d, index) => `url(#gradient${index})`,
                    class: this.styleClasses.path,
                })
            .on("click", this.handlePathsClick.bind(this));
        
        
        
        this.valueTextField = this.svg.append("text")
            .text(`${this.data[3].value}`)
            .attrs({
              class: this.styleClasses.value,
              dy: "-0.1em",
              fill: `url(#gradient3)`,
              "text-anchor": "middle",
            });
        this.descriptionTextField = this.svg.append("text")
            .text("голосов")
            .attrs({
              class: this.styleClasses.text,
              dy: "1.3em",
              fill: `url(#gradient3)`,
              "text-anchor": "middle",
            });
    }

    getGradients(){
        this.initGradient(3, "#FFE39C", "#FFBA9C");
        this.initGradient(2, "#6FCF97", "#66D2EA");
        this.initGradient(1, "#BC9CFF", "#8BA4F9");
        this.initGradient(0, "#919191", "#3D4975");
    }

    initGradient(id, startColor, endColor){
        var gradient = this.svg.append("svg:defs")
            .append("svg:linearGradient")
            .attrs({
                id: `gradient${id}`,
                x1: "0%",
                y1: "0%",
                x2: "0%",
                y2: "100%",
                spreadMethod: "pad",
            });
        gradient.append("svg:stop")
        .attrs({
            offset: "0%",
            "stop-color": startColor,
            "stop-opacity": 1,
        });
        gradient.append("svg:stop")
        .attrs({
            offset: "100%",
            "stop-color": endColor,
            "stop-opacity": 1,
        });
    }

    handlePathsClick(dataObject, currentPath, paths) {
        const { data, index } = dataObject;
        this.valueTextField.style("fill", `url(#gradient${index})`)
          .text(`${data.value}`);
        this.descriptionTextField.style("fill", `url(#gradient${index})`)
          .text("голосов");
        this.paths.attr("d", this.arcAttribute);
        d3.select(paths[currentPath]).attr("d", this.arcAttribute);
    }
}

$(document).ready(() => {
    const width = 124;
    const height = 120;
    var rating = {        
        bad: 0,
        satisfact: 260,
        normal: 260,
        good: 520,
    };
    
    const donutChart = document.querySelectorAll(".donut-chart");
    donutChart.forEach((val =>{
        new DonutChart(val, width, height, rating);
    }));
});