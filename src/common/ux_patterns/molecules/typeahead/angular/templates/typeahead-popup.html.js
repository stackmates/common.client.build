'use strict';

var multiline = require('multiline');

module.exports = multiline(function(){/*
<ul class="dropdown-menu" ng-show="isOpen()" ng-style="{top: position.top+'px', left: position.left+'px'}" style="display: block;" role="listbox" aria-hidden="{{!isOpen()}}">
    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)" role="option" id="{{match.id}}">
        <div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>
    </li>
</ul>
*/});
