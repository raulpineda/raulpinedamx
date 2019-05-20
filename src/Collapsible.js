import React from "react";
import classNames from "classnames";
import "./Collapsible.scss";

class Collapsible extends React.PureComponent {
  state = {
    isExpanded: false,
  };

  handleToggleExpanded() {
    this.setState(state => ({
      isExpanded: !state.isExpanded,
    }));
  }

  renderChild(child) {
    const className = classNames(
      "Collapsible__child",
      `Collapsible__level${this.props.depthClass + 1}`
    );

    return (
      <span className={className}>
        {child}
        <span>,</span>
      </span>
    );
  }

  render() {
    const { children, title, type } = this.props;
    const { isExpanded } = this.state;
    const className = classNames(
      "Collapsible",
      `Collapsible__level${this.props.depthClass}`,
      isExpanded ? "isExpanded" : null
    );

    if (!isExpanded) {
      return (
        <span
          className={className}
          onClick={this.handleToggleExpanded.bind(this)}
        >
          <span className="expand" />
          {`${title}: ${type === "object" ? "{" : "["} ... ${
            type === "object" ? "}" : "]"
          },`}
        </span>
      );
    }

    return (
      <>
        <span
          className={className}
          onClick={this.handleToggleExpanded.bind(this)}
        >
          <span className="contract" />
          {`${title}: ${type === "object" ? "{" : "["}`}
        </span>
        {children.map(child => this.renderChild(child))}
        <span className={this.props.depthClass}>{`${
          type === "object" ? "}" : "]"
        },`}</span>
      </>
    );
  }
}

export default Collapsible;
