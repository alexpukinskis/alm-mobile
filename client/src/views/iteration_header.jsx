/** @jsx React.DOM */
define(function() {
  var React = require('react');
  var moment = require('moment');
  var app = require('application');
  var ReactView = require('views/base/react_view');

  return ReactView.createBackboneClass({
    render: function() {
      var iteration = app.session.get('iteration') && app.session.get('iteration').toJSON(),
          iterationHeader = <div/>;
      if (iteration && this.props.visible) {
        iterationHeader = (
          <div className="iteration-header">
            <dl className="dl-horizontal">
              <dt>Iteration:</dt>
              <dd className="name">{iteration.Name}</dd>
              <dd className="dates">{moment(iteration.StartDate).format('L')} - {moment(iteration.EndDate).format('L')}</dd>
            </dl>
          </div>
        );
      }
      return iterationHeader;
    }
  });

});