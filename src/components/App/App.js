import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components/macro';
import { noop } from 'lodash';
import Map from '../Map';
import Key from '../Key';
import { theme, dimensions, timing } from '../../context';
import { Wrapper } from './App.styles';

class App extends Component {
  state = {
    activePhase: null,
    activeTactic: null,
    tacticCount: 0,
    techniqueCount: 0,
    wrapperWidth: null,
    wrapperHeight: null,
    keyIsActive: true,
  };

  wrapperRef = React.createRef();

  _timeout = null;

  componentDidMount() {
    this._timeout = window.setTimeout(() => {
      this.setWrapperDimensions(
        dimensions.hexBoxWidth,
        dimensions.hexBoxHeight
      );
    }, 250);
  }

  componentWillUnmount() {
    window.clearTimeout(this._timeout);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      activePhase,
      activeTactic,
      tacticCount,
      techniqueCount,
    } = this.state;
    const {
      hexBoxWidth,
      hexBoxHeight,
      pillOffsetX,
      pillCalculatedHeight,
      pillMargin,
    } = dimensions;
    const width1 = hexBoxWidth;
    const width2 = hexBoxWidth + pillOffsetX;
    const width3 = hexBoxWidth + pillOffsetX * 2;

    // active phase is changing
    if (prevState.activePhase !== activePhase) {
      // if active phase is reset, width #1 (base hexBoxWidth)
      if (activePhase === null) {
        this.setWrapperDimensions(width1, hexBoxHeight);
        return;
      }
      // if active phase is changing and not resetting, width #2
      if (prevState.activePhase === null) {
        const height = tacticCount * (pillCalculatedHeight + pillMargin);
        this.setWrapperDimensions(width2, height);
        return;
      }
    }

    // active tactic is changing
    if (prevState.activeTactic !== activeTactic) {
      // if active tactic is reset, width #2
      if (activeTactic === null) {
        const height = tacticCount * (pillCalculatedHeight + pillMargin);
        this.setWrapperDimensions(width2, height);
        return;
      } else {
        const height =
          (techniqueCount > tacticCount ? techniqueCount : tacticCount) *
          (pillCalculatedHeight + pillMargin);
        this.setWrapperDimensions(width3, height);
        return;
      }
    }
  }

  setWrapperState = (wrapperWidth, wrapperHeight, cb = noop) => {
    this.setState(state => {
      return {
        wrapperWidth: wrapperWidth || state.wrapperWidth,
        wrapperHeight: wrapperHeight || state.wrapperHeight,
      };
    }, cb);
  };

  setDimensionsInDOM = (wrapperWidth, wrapperHeight, cb = noop) => {
    if (wrapperWidth || wrapperHeight) {
      const { current } = this.wrapperRef;
      current.style.height = wrapperHeight ? wrapperHeight + 'px' : '';
      current.style.width = wrapperWidth ? wrapperWidth + 'px' : '';
      cb(wrapperWidth, wrapperHeight);
    }
  };

  setWrapperDimensions = (wrapperWidth, wrapperHeight) => {
    if (wrapperWidth || wrapperHeight) {
      this.setWrapperState(wrapperWidth, wrapperHeight, () => {
        this.setDimensionsInDOM(
          this.state.wrapperWidth,
          this.state.wrapperHeight
        );
      });
    }
  };

  updateActivePhase = (activePhase = null, tacticCount = 0) => {
    this.setState(state => {
      if (state.activePhase !== activePhase) {
        return { activePhase, tacticCount, activeTactic: null };
      }
    });
  };

  updateActiveTactic = (activeTactic = null, techniqueCount = 0) => {
    this.setState(state => {
      if (state.activeTactic !== activeTactic) {
        return { activeTactic, techniqueCount };
      }
    });
  };

  toggleKey = () =>
    this.setState(({ keyIsActive }) => ({ keyIsActive: !keyIsActive }));

  render() {
    return (
      <ThemeProvider theme={{ ...theme, dimensions, timing }}>
        <Wrapper className="App" ref={this.wrapperRef}>
          <Map
            activePhase={this.state.activePhase}
            activeTactic={this.state.activeTactic}
            updateActivePhase={this.updateActivePhase}
            updateActiveTactic={this.updateActiveTactic}
          />
          <Key active={this.state.keyIsActive} toggle={this.toggleKey} />
        </Wrapper>
      </ThemeProvider>
    );
  }
}

export default App;
