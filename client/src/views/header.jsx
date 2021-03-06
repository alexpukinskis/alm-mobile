/** @jsx React.DOM */
define(function() {
  var React = require('react'),
      moment = require('moment'),
      ReactView = require('views/base/react_view');

  return ReactView.createBackboneClass({
    getInitialState: function() {
      return {
        title: 'ALM Mobile'
      }
    },
    componentWillMount: function() {
      this.subscribeEvent('updatetitle', this._onTitleUpdate);
      this.subscribeEvent('dispatcher:dispatch', this._onDispatch);
      this.subscribeEvent('dispatcher:dispatch', this._onDispatch);
    },
    render: function() {
      var currentPage = this.getCurrentPage();
      return (
        <div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div className="row">
            <div className="col-xs-2 left-button">{ this.getLeftButton(currentPage) }</div>
            <div className="col-xs-7 title"><div className="ellipsis">{ this.state.title }</div></div>
            <div className="col-xs-3 right-button">
              <a href="#" className="right" onClick={ this._navigateToFn('search') }><i className="picto icon-search"></i></a>
              { this.getRightButton(currentPage) }
            </div>
          </div>
        </div>
      );
    },
    getLeftButton: function(currentPage) {
      if (_.contains(['/', '/userstories', '/defects', '/tasks', '/board', '/recentActivity'], currentPage)) {
        return <span/>;//this.makeButton('navigation', 'grid', 'left');
      } else {
        return this.makeButton('back', 'back', 'left');
      }
    },
    getRightButton: function(currentPage) {
      if (currentPage === '/settings') {
        return <div/>;
      } else {
        return this.makeButton('settings', 'gear', 'right');
      }
    },
    makeButton: function(target, icon, cls) {
      cls = cls || '';
      return (
        <a href="#" className={ cls } onClick={ this._navigateToFn(target) }>
          <i className={ "picto icon-" + icon }/>
        </a>
      );
    },
    _onTitleUpdate: function(title) {
      this.setState({ title: title });
    },
    _onDispatch: function() {
      if (this.isMounted()) {
        this.forceUpdate();
      }
    },
    getCurrentPage: function() {
      return window.location.pathname;
    },
    _navigateToFn: function(target) {
      return _.bind(function(e) { this._navigateTo(target, e); }, this);
    },
    _navigateTo: function(page, e) {
      if (page === 'back') {
        window.history.back();
      } else if (page === 'navigation') {
        this.publishEvent('navigation:show');
      } else {
        this.publishEvent('router:route', page);
      }
      e.preventDefault();
    }
  });

});