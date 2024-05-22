import TimelineBlock from "./TimelineBlock.js";

function interpolateColor(color1, color2, factor) {
    let result = color1.slice();
    for (let i = 0; i < 3; i++) {
        result[i] = Math.round(color1[i] + factor * (color2[i] - color1[i]));
    }
    return result;
}

class HourTickBlock extends TimelineBlock {
    constructor(date) {
        super();
        this.startDate = date;

        this.endDate = new Date(date);
        // add 1 hour
        this.endDate.setHours(this.endDate.getHours() + 1);

        this.domElement = this.render();
    }

    render() {
        const block = document.createElement('div');
        block.className = 'hourTick';
        block.classList.add('timeline-block');
        
        // Generate a background color based on the time. Midnight is dark blue, midday is yellow.
        const hour = this.startDate.getHours();
        const darkBlue = [0, 0, 139]; // dark blue
        const yellow = [180, 180, 0]; // dark yellow
        
        // Calculate the interpolation factor to go from 0 to 1 to 0 over 24 hours
        let factor = hour < 12 ? hour / 12 : (24 - hour) / 12;
        
        const interpolatedColor = interpolateColor(darkBlue, yellow, factor);
        
        const backgroundColor = `rgba(${interpolatedColor[0]}, ${interpolatedColor[1]}, ${interpolatedColor[2]}, 1)`;
        
        block.style.backgroundColor = backgroundColor;

        return block;
    }
}

class HoursTicksRow {
    constructor(startTime, endTime) {
      this.startTime = startTime;
      this.endTime = endTime;
      this.domElement = this.render();
    }
  
    render() {
      const row = document.createElement('div');
      row.className = 'timeline-hoursticks-row';
      row.classList.add('timeline-row');
      row.classList.add('timeline-header-row');

      // start with startTime. this may not be a full day
      let currentDate = new Date(this.startTime);

      // loop until we reach endTime
      while (currentDate < this.endTime) {
        const block = new HourTickBlock(currentDate);
        block.positionBetween(this.startTime, this.endTime);
        row.appendChild(block.domElement);
        // add 1 hour
        currentDate.setHours(currentDate.getHours() + 1);
      }
      return row;
    }
    
  }

  export default HoursTicksRow;