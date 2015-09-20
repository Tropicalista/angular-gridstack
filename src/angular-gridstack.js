(function() {
  'use strict';

  angular.module('ui.gridstack', [])

  .controller('GridstackController', ['$scope', '$element', '$attrs',
      function($scope, $element, $attrs) {

        var gridstack = null;
        this.init = function(element, options) {
          gridstack = element.gridstack(options).data('gridstack');
          return gridstack;
        };

        this.removeItem = function(element){
          if (gridstack) {
            return gridstack.remove_widget(element, false);
          }
          return null;
        };

        this.addItem = function(element, x, y, width, height, auto) {
          if (gridstack) {
            return gridstack.add_widget(element, x, y, width, height, auto);
          }
          return null;
        };

  }])

  .directive("gridStack", [function () {
      return {
          restrict: "A",
          controller: 'GridstackController',
          scope: {
            serialize: '&',
            options: '='
          },
          link: function (scope, element, attrs, controller, ngModel) {

              controller.init(element, scope.options);

              element.on('change', function (e, items) {
                  scope.serialize();
              });

          }
      };
  }])

  .directive("gridstackItem", [function () {
      return {
          restrict: "A",
          controller: 'GridstackController',
          require: '^gridStack',
          scope: false,
          link: function (scope, element, attrs, controller) {
              attrs.$observe('gridstackItem', function(val) {
                var widget = controller.addItem(element, attrs.gsX, attrs.gsY, attrs.gsWidth, attrs.gsHeight, scope.$eval(attrs.gsAutoPosition));
              });
              element.bind('$destroy', function() {
                controller.removeItem(element);
              });
          }

      };
  }]);


})();
