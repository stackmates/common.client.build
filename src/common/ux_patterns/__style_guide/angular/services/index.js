'use strict';

module.exports = angular.module('app.evolving.services', [

])

.value('DessertValues',    require('./dessert_values'))
.value('DessertLog',       require('./dessert_log'))

.factory('DessertManager', require('./dessert_manager'))
.factory('DessertService', require('./dessert_service'))


;
