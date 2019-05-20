import React from "react";
import { differenceInSeconds, differenceInYears, addYears } from "date-fns";

function calculateAge(birthday, now) {
  const years = differenceInYears(now, birthday);
  const seconds = differenceInSeconds(now, addYears(birthday, years));
  const secondsThisYear = differenceInSeconds(
    addYears(birthday, years + 1),
    addYears(birthday, years)
  );
  return `${(years + seconds / secondsThisYear).toPrecision(12)}`;
}

class AgeCalculator extends React.PureComponent {
  static defaultProps = {
    birthday: new Date("1988-12-24T21:00:00-06:00"),
  };

  state = {
    age: calculateAge(this.props.birthday, Date.now()),
  };

  componentWillMount() {
    setInterval(this.updateAge.bind(this), 1000);
  }

  updateAge() {
    const { birthday } = this.props;

    this.setState({
      age: calculateAge(birthday, Date.now()),
    });
  }

  render() {
    return this.state.age;
  }
}

export default AgeCalculator;
