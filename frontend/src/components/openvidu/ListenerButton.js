import React from "react";

class ListenerButton extends React.Component {
  state = {
    show: false,
  };

  handleMove = (e) => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;

    e.target.style.setProperty("--x", `${x}px`);
    e.target.style.setProperty("--y", `${y}px`);
  };

  handleStart = (event) => {
    // event.preventDefault();

    this.props.onStart();
  };

  render() {
    return (
      <button
        {...this.props}
        className="voicerecog-btn"
        onClick={this.handleStart}
        // onMouseMove={this.handleMove}
      >
        <img className="voicerecog" src="/voicerecog.png"></img>
        {/* <span>{this.props.buttonText}</span> */}
      </button>
    );
  }
}

// ListenerButton.defaultProps = {
//   buttonText: "Click me to listen",
// };

export default ListenerButton;
