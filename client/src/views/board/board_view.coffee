define ->
  _ = require 'underscore'
  app = require 'application'
  utils = require 'lib/utils'
  hbs = require 'hbsTemplate'
  PageView = require 'views/base/page_view'
  ColumnView = require 'views/board/column_view'

  class BoardView extends PageView
    region: 'main'
    className: 'board row-fluid'
    template: hbs['board/templates/board']

    initialize: (options = {}) ->
      super
      @columns = options.columns
      @field = options.field

      @updateTitle app.session.getProjectName()

    afterRender: ->
      _.map @columns, (col) =>
        colView = new ColumnView autoRender: true, model: col, container: "#col-#{utils.toCssClass(col.get('value'))}"
        @subview colView
        @bubbleEvent colView, 'click', 'columnClick'

    getTemplateData: ->
      columns: _.invoke @columns, _.getAttribute('value')