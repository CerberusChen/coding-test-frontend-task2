import React, { SyntheticEvent } from "react";

export default class Countdown extends React.Component<
  {
    date: Date;
  },
  {
    date: Date;
    now: Date;
    inputDate?: string;
    errorMsg?: string;
  }
> {
  timerID: NodeJS.Timeout | undefined;
  constructor(props: { date: Date }) {
    super(props);
    this.state = {
      date: props.date || new Date(Date.now() + 86400000),
      now: new Date(),
      errorMsg: "",
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      now: new Date(),
    });
  }

  setInputDate(e: SyntheticEvent<HTMLInputElement>) {
    e.preventDefault();
    const value = (e.target as HTMLInputElement).value;
    if (/^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/.test(value)) {
      this.setState({
        date: new Date(value),
        errorMsg: "",
      });
    } else {
      this.setState({
        errorMsg: "Please input Date string like YYYY-MM-DD",
      });
    }
  }

  render(): React.ReactNode {
    let diff = this.state.date.getTime() - this.state.now.getTime();
    diff = Math.floor(diff / 1000);
    const seconds = diff % 60;
    diff = Math.floor(diff / 60);
    const minutes = diff % 60;
    diff = Math.floor(diff / 60);
    const hours = diff % 24;
    diff = Math.floor(diff / 24);
    const days = diff;
    return (
      <div>
        <h1>Countdown target: {this.state.date.toISOString()}</h1>
        <p>
          Remaining: {days}days, {hours}hours, {minutes}minutes, {seconds}
          seconds
        </p>
        <div>
          <input
            type="text"
            style={{ color: "black" }}
            placeholder="Input new target date"
            onChange={this.setInputDate.bind(this)}
          />
        </div>
        <div>
          <p style={{ color: "red" }}>{this.state.errorMsg}</p>
        </div>
      </div>
    );
  }
}
