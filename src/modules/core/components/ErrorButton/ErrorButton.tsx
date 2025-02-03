import { Component } from 'react';
import styles from './ErrorButton.module.css';

class ErrorButton extends Component {
  state = {
    throwError: false,
  };

  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Something went wrong');
    }

    return (
      <button className={styles.errorButton} onClick={this.handleClick}>
        Error Button
      </button>
    );
  }
}

export default ErrorButton;
