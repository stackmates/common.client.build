'use strict';


module.exports = angular.module('app.evolvingpractices.directives', [
  'app.evolvingpractices.services',
])

.directive('stateful', require('./stateful_directive'))
.directive('textAndSub', require('./text_and_sub_directive'))
.directive('sizeCheck', require('./size_check_directive'))

;
