import React from 'react';

import Popover from 'material-ui/Popover';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class PopoverPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  handleTouchTap(event){
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose(){
    this.setState({
      open: false,
    });
  }

  render() {
    const _this = this;
    const handleTouchTap = this.handleTouchTap.bind(this);
    const handleRequestClose = this.handleRequestClose.bind(this);

    return (
      <div>
        <button
          onClick={handleTouchTap}
          value="Click me"
        />
        <Popover
          open={_this.state.open}
          anchorEl={_this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={handleRequestClose}
        >
          <div>popover content</div>
        </Popover>
      </div>
    );
  }
}

PopoverPanel.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
