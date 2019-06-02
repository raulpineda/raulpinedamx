import React from "react";
import classNames from "classnames";
import "./Collapsible.scss";

class Collapsible extends React.PureComponent {
  state = {
    isExpanded: this.props.isRoot ? true : false
  };

  handleToggleExpanded() {
    if (this.props.isRoot) {
      return;
    }

    this.setState(state => ({
      isExpanded: !state.isExpanded
    }));
  }

  renderChild(child, index, parent) {
    return (
      <span className="Collapsible__child" key={`${parent}-child-${index}`}>
        {child}
        <span>,</span>
      </span>
    );
  }

  render() {
    const { children, title, type, isRoot } = this.props;
    const { isExpanded } = this.state;
    const className = classNames(
      "Collapsible",
      this.props.isRoot ? "Collapsible__root" : null,
      isExpanded ? "isExpanded" : null
    );

    if (!isExpanded) {
      return (
        <span
          className={className}
          onClick={this.handleToggleExpanded.bind(this)}
        >
          <span className="expand" />
          {`${title}${isRoot ? "=" : ":"} ${type === "object" ? "{" : "["}…${
            type === "object" ? "}" : "]"
          }`}
        </span>
      );
    }

    return (
      <>
        <span
          className={className}
          onClick={this.handleToggleExpanded.bind(this)}
        >
          <span className="collapse" />
          {`${title}${isRoot ? " =" : ":"} ${type === "object" ? "{" : "["}`}
        </span>
        {Array.isArray(children)
          ? children.map((child, index) =>
              this.renderChild(child, index, title)
            )
          : this.renderChild(children, 0, title)}
        <span>{`${type === "object" ? "}" : "]"}${isRoot ? ";" : ""}`}</span>
      </>
    );
  }
}

export default Collapsible;
