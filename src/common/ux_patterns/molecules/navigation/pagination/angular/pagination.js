'use strict';

module.exports = angular.module('sm.molecules.angular.pagination', [])

.constant('paginationConfig', {
  itemsPerPage: 10,
  boundaryLinks: false,
  directionLinks: true,
  firstText: 'First',
  previousText: 'Previous',
  nextText: 'Next',
  lastText: 'Last',
  rotate: true
})

.constant('pagerConfig', {
  itemsPerPage: 10,
  previousText: '« Previous',
  nextText: 'Next »',
  align: true
})

.controller('PaginationController', require('./controllers/pagination_controller'))

.directive('pagination', require('./directives/pagination_directive'))
.directive('pager', require('./directives/pager_directive'))

;
