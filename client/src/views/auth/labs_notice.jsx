/** @jsx React.DOM */
define(function() {
  var $ = require('jquery'),
			React = require('react'),
  		ReactView = require('views/base/react_view'),
      app = require('application');

  return ReactView.createBackboneClass({
    render: function() {
    	return (
        <div id="labs-notice" className="container">
          <div className="jumbotron">
            <div className="labs-icon"/>
            <p>
              Use of this mobile application is on an as-is, as-available basis and it not subject to Rally’s Service Level Agreement.
              Support of this mobile application, evolution of this application and even ongoing existence of this Rally Labs mobile application is not guaranteed.
            </p>
            <p><a className="btn btn-primary btn-lg accept" onClick={this.accept}>Accept</a> <a className="btn btn-lg reject" onClick={this.reject}>Reject</a></p>
          </div>
        </div>
      );
    },

    accept: function(event) {
      app.aggregator.recordAction({component: this, description: 'accepted labs notice'});
      this.publishEvent('accept');
      event.preventDefault();
    },

    reject: function(event) {
      app.aggregator.recordAction({component: this, description: 'rejected labs notice'});
      this.publishEvent('reject');
      event.preventDefault();
    }
  });
});