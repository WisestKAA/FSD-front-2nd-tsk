import * as d3 from 'd3';
import 'd3-selection-multi';
import { boundClass } from 'autobind-decorator';

@boundClass
class DonutChart {
  constructor(elem, width = 120, height = 120, rating) {
    this._donut = elem;

    this._initStyleClasses();
    this._initDonutChart(width, height, rating);
  }

  _initStyleClasses() {
    this._styleClasses = {
      value: 'donut-chart__value',
      text: 'donut-chart__text',
      path: 'donut-chart__path'
    };
  }

  _initDonutChart(width, height, rating) {
    const radius = Math.min(width, height) / 2;

    this._svg = d3.select(this._donut)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    this._arcAttribute = d3.arc()
      .innerRadius((Math.min(width, height) / 2) * 0.90)
      .outerRadius(radius);

    const pie = d3.pie()
      .value((d) => {
        return d.value;
      })
      .sort(null)
      .padAngle(0.02);

    this._getGradients();

    const data = d3.entries(rating);
    this._paths = this._svg.selectAll('path')
      .data(pie(data))
      .enter()
      .append('g')
      .style('fill', (d, index) => {
        return `url(#gradient${index})`;
      })
      .append('path')
      .attrs({
        d: this._arcAttribute,
        fill: (d, index) => {
          return `url(#gradient${index})`;
        },
        class: this._styleClasses.path
      })
      .on('click', this._handlePathsClick);

    this._valueTextField = this._svg.append('text')
      .text(`${data[3].value}`)
      .attrs({
        class: this._styleClasses.value,
        dy: '-0.1em',
        fill: 'url(#gradient3)',
        'text-anchor': 'middle'
      });
    this._descriptionTextField = this._svg.append('text')
      .text('голосов')
      .attrs({
        class: this._styleClasses.text,
        dy: '1.3em',
        fill: 'url(#gradient3)',
        'text-anchor': 'middle'
      });
  }

  _getGradients() {
    this._initGradient(3, '#FFE39C', '#FFBA9C');
    this._initGradient(2, '#6FCF97', '#66D2EA');
    this._initGradient(1, '#BC9CFF', '#8BA4F9');
    this._initGradient(0, '#919191', '#3D4975');
  }

  _initGradient(id, startColor, endColor) {
    const gradient = this._svg.append('svg:defs')
      .append('svg:linearGradient')
      .attrs({
        id: `gradient${id}`,
        x1: '0%',
        y1: '0%',
        x2: '0%',
        y2: '100%',
        spreadMethod: 'pad'
      });
    gradient.append('svg:stop')
      .attrs({
        offset: '0%',
        'stop-color': startColor,
        'stop-opacity': 1
      });
    gradient.append('svg:stop')
      .attrs({
        offset: '100%',
        'stop-color': endColor,
        'stop-opacity': 1
      });
  }

  _handlePathsClick(dataObject, currentPath, paths) {
    const { data, index } = dataObject;
    this._valueTextField.style('fill', `url(#gradient${index})`)
      .text(`${data.value}`);
    this._descriptionTextField.style('fill', `url(#gradient${index})`)
      .text('голосов');
    this._paths.attr('d', this._arcAttribute);
    d3.select(paths[currentPath]).attr('d', this._arcAttribute);
  }
}

export default DonutChart;
