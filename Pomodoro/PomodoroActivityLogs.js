/**  
 * The class provides methods to log and manage different timestamps related to the timer such as start time, pause time, break start time, done time, and exit time.
 *  It also provides a method to generate a timeline, which is an array of objects that includes the color and the elapsed time in seconds for each interval.
 * 
 * */
class PomodoroActvityLogDupe {

  static allLogs = [];


  constructor(task_id, jsonObj = null) {
    if (jsonObj) {

      this.task_id = jsonObj.task_id;

      this.startTimeStamp = jsonObj.startTimeStamp.map((elem) =>
      {
        return parseInt(elem)}
      );

      this.pauseTimeStamp = jsonObj.pauseTimeStamp.map((elem) =>
        parseInt(elem)
      );
      this.breakStartTimeStamp = jsonObj.breakStartTimeStamp.map((elem) =>
        parseInt(elem)
      );
      this.finishTimeStamp = jsonObj.finishTimeStamp.map((elem) =>
        parseInt(elem)
      );
      this.doneTimeStamp = jsonObj.doneTimeStamp.map((elem) => parseInt(elem));
      this.exitedTimeStamp = jsonObj.exitedTimeStamp.map((elem) =>
        parseInt(elem)
      );
      this.elapsedTimeSoFar = jsonObj.elapsedTimeSoFar;
      this.commencedDay = jsonObj.commencedDay;
      this.dim = '900';

    } else {
      this.task_id = task_id;
      this.startTimeStamp = [];
      this.pauseTimeStamp = [];
      this.breakStartTimeStamp = [];
      this.finishTimeStamp = [];
      this.doneTimeStamp = [];
      this.exitedTimeStamp = [];
      this.elapsedTimeSoFar;
      this.commencedDay = Date.now();
      this.dim = task_id;
      // this.checkAndSave();
      // console.log('PomodoroActvityLogDupe construcou  defualt this', this);
    }

    PomodoroActvityLogDupe.allLogs.push(this);
  }


  addStartTimeStamp(time) {
    this.startTimeStamp.push(time);
  }

  addPauseTimeStamp(time) {
    this.pauseTimeStamp.push(time);
    // console.log('Pause TimeStamp');
  }

  addBreakStartTimeStamp(time) {
    this.breakStartTimeStamp.push(time);
  }

  addDoneTimeStamp(time) {
    this.doneTimeStamp.push(time);
  }

  addExitTimeStamp(time) {
    this.exitedTimeStamp.push(time);
  }

  getAllTimeStamp() {
    let timeStamps = {
      startTimeStamp: this.startTimeStamp,
      pauseTimeStamp: this.pauseTimeStamp,
      breakStartTimeStamp: this.breakStartTimeStamp,
      finishTimeStamp: this.finishTimeStamp,
      doneTimeStamp: this.doneTimeStamp,
      exitedTimeStamp: this.exitedTimeStamp,
    };
    return timeStamps;
  }

  sortTimeStamps() {
    let timeStamps = this.getAllTimeStamp();
    let allTimeStamps = [];
    for (let key in timeStamps) {
      timeStamps[key].forEach((timestamp) => {
        allTimeStamps.push({ key, timestamp });
      });
    }
    allTimeStamps.sort((a, b) => a.timestamp - b.timestamp);
    return allTimeStamps;
  }

  generateTimeline() {
    // console.log('generatetimeline');
    let sortedTimestamps = this.sortTimeStamps();

    if (sortedTimestamps.length <= 1) return;
    
    let colorWidthArr = [];
    let endTime = sortedTimestamps[sortedTimestamps.length - 1].timestamp;
    let startTime = sortedTimestamps[0].timestamp;
    let totalTimeUnit = endTime - startTime;
    let totalWidth = this.dim / totalTimeUnit;
    // console.log('generatetimeline2', );
    for (let i = 0; i < sortedTimestamps.length - 1; i++) {
       
      let currentTimestamp = sortedTimestamps[i];
      let nextTimestamp = sortedTimestamps[i + 1];

      let secondsElapsed;
      let color;

      // console.log('generatetimeline2', currentTimestamp, nextTimestamp);

      if (currentTimestamp.key === 'startTimeStamp') {
        let timeDiff = nextTimestamp.timestamp - currentTimestamp.timestamp;
        secondsElapsed = timeDiff / 1000;
        color = 'blue';
      } else if (currentTimestamp.key === 'pauseTimeStamp') {
        let timeDiff = nextTimestamp.timestamp - currentTimestamp.timestamp;
        secondsElapsed = timeDiff / 1000;
        color = 'gray';
      } else if (currentTimestamp.key === 'breakStartTimeStamp') {
        let timeDiff = nextTimestamp.timestamp - currentTimestamp.timestamp;
        secondsElapsed = timeDiff / 1000;
        color = 'yellow';
      } else if (currentTimestamp.key === 'doneTimeStamp') {
        let timeDiff = nextTimestamp.timestamp - currentTimestamp.timestamp;
        secondsElapsed = timeDiff / 1000;
        color = 'green';
      } else if (currentTimestamp.key === 'exitedTimeStamp') {
        let timeDiff = nextTimestamp.timestamp - currentTimestamp.timestamp;
        secondsElapsed = timeDiff / 1000;
        color = 'red';
      }

      colorWidthArr.push({ color, secondsElapsed });
      // console.log(colorWidthArr);
      // prevTimestamp = currentTimestamp.timestamp;
    }
    this.elapsedTimeSoFar = colorWidthArr;
    return colorWidthArr;
  }

  toJsonObj() {
    obj = {
      task_id: this.task_id,
      startTimeStamp: this.startTimeStamp,
      pauseTimeStamp: this.pauseTimeStamp,
      breakStartTimeStamp: this.breakStartTimeStamp,
      finishTimeStamp: this.finishTimeStamp,
      doneTimeStamp: this.doneTimeStamp,
      exitedTimeStamp: this.exitedTimeStamp,
      elapsedTimeSoFar: this.elapsedTimeSoFar,
      commencedDay: this.commencedDay,
      dim: this.dim,
    };

    return obj;
  }
}

export default PomodoroActvityLogDupe;
