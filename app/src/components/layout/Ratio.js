import * as React from 'react';

type Props = {|
  x: number,
  y: number,
  children: (resp: { width: number, height: number }) => React$Element<any>
|};

type State = {|
  width: number,
  height: number,
|};

export default class Ratio extends React.Component<Props, State> {
  state = {
    width: 0,
    height: 0
  }

  // TODO: This can likely be simplified...
  getComputedDimensions = ({ x, y }: Props) => {
    let { width, height } = this.refs.container.getBoundingClientRect();
    
    width = height * x / y;

    // Check that the dimensions aren't larger than the possible area.
    if (height > window.innerHeight) {
      height = window.innerHeight;
      width = height * x / y;
    } else if (width > window.innerWidth) {
      width = window.innerWidth;
      height = width * x / y;
    }

    return { width, height };
  };

  componentDidMount() {
    this.handleResize();

    window.addEventListener('resize', this.handleResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false);
  }

  handleResize = () => {
    this.setState(this.getComputedDimensions(this.props));
  };

  render() {
    const { width, height } = this.state;

    return (
      <div ref="container" className="full-height">
        {this.props.children({ width, height })}
      </div>
    );
  }
}
