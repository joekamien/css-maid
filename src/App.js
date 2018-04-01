import React, { Component } from 'react';
import { injectGlobal } from 'react-emotion';
import GithubCorner from 'react-github-corner';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { parseCSS } from './utils/parser';
import {
  Wrapper,
  Header,
  TextArea,
  Button,
  Container,
  ButtonsRow,
} from './components';

const whitespaceType = Object.freeze({
  space: ' ',
  tab: '\t',
});

class App extends Component {
  state = {
    userStyles: '',
    formattedStyles: '',
    numberOfIndents: 2,
    indentType: whitespaceType.space,
  };

  handleInput = e => {
    this.setState({ userStyles: e.target.value });
  };

  handleNumberOfIndentsChange = e => {
    const parsedValue = parseInt(e.target.value, 10);
    if (isNaN(parsedValue) || parsedValue < 0) return;
    this.setState({ numberOfIndents: parsedValue });
  };

  formatCSS = () => {
    if (this.state.userStyles.trim() === '') return false;

    const indentString = this.state.indentType.repeat(this.state.numberOfIndents);
    const formattedStyles = parseCSS(this.state.userStyles, indentString);
    this.setState({ formattedStyles });
  };

  render() {
    return (
      <Wrapper>
        <Header>CSS MAID</Header>
        <Container>
          <TextArea
            placeholder="Your CSS goes here"
            value={this.state.userStyles}
            onChange={this.handleInput}
          />
          <TextArea
            placeholder="Any changes will appear here"
            value={this.state.formattedStyles}
          />
        </Container>
        <ButtonsRow>
          <Button onClick={this.formatCSS}>Format</Button>

          <CopyToClipboard text={this.state.formattedStyles}>
            <Button>Copy to clipboard</Button>
          </CopyToClipboard>

          <input type="text" value={this.state.numberOfIndents} onChange={this.handleNumberOfIndentsChange} />
        </ButtonsRow>

        <GithubCorner
          href="https://github.com/DimitrisNL/css-maid"
          bannerColor="#e684ae"
        />
      </Wrapper>
    );
  }
}

export default App;

injectGlobal`
  * {
    box-sizing:border-box;
  }

  body {
    margin: 0;
    padding: 0;

    height: 100vh;
    width: 100vw;

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  #root {
    width: 100%;
    height: 100%;
  }
`;
