'use strict';


var KEY = require('../key_mapping');

/**
 * Contains ui-select "intelligence".
 *
 * The goal is to limit dependency on the DOM whenever possible and
 * put as much logic in the controller (instead of the link functions) as possible so it can be easily tested.
 */
module.exports = /*@ngInject*/
  function($scope, $element, $timeout, RepeatParser, uiSelectMinErr) {

    var ctrl = this;

    var EMPTY_SEARCH = '';

    ctrl.placeholder = undefined;
    ctrl.search = EMPTY_SEARCH;
    ctrl.activeIndex = 0;
    ctrl.activeMatchIndex = -1;
    ctrl.items = [];
    ctrl.selected = undefined;
    ctrl.open = false;
    ctrl.focus = false;
    ctrl.focusser = undefined; //Reference to input element used to handle focus events
    ctrl.disabled = undefined; // Initialized inside uiSelect directive link function
    ctrl.searchEnabled = undefined; // Initialized inside uiSelect directive link function
    ctrl.resetSearchInput = undefined; // Initialized inside uiSelect directive link function
    ctrl.refreshDelay = undefined; // Initialized inside uiSelectChoices directive link function
    ctrl.multiple = false; // Initialized inside uiSelect directive link function
    ctrl.disableChoiceExpression = undefined; // Initialized inside uiSelect directive link function

    ctrl.isEmpty = function() {
      return angular.isUndefined(ctrl.selected) || ctrl.selected === null || ctrl.selected === '';
    };

    var _searchInput = $element.querySelectorAll('input.ui-select-search');
    if (_searchInput.length !== 1) {
      throw uiSelectMinErr('searchInput', "Expected 1 input.ui-select-search but got '{0}'.", _searchInput.length);
    }

    // Most of the time the user does not want to empty the search input when in typeahead mode
    function _resetSearchInput() {
      if (ctrl.resetSearchInput) {
        ctrl.search = EMPTY_SEARCH;
        //reset activeIndex
        if (ctrl.selected && ctrl.items.length && !ctrl.multiple) {
          ctrl.activeIndex = ctrl.items.indexOf(ctrl.selected);
        }
      }
    }

    // When the user clicks on ui-select, displays the dropdown list
    ctrl.activate = function(initSearchValue, avoidReset) {
      if (!ctrl.disabled  && !ctrl.open) {
        if(!avoidReset) _resetSearchInput();
        ctrl.open = true;
        ctrl.activeMatchIndex = -1;

        ctrl.activeIndex = ctrl.activeIndex >= ctrl.items.length ? 0 : ctrl.activeIndex;

        // Give it time to appear before focus
        $timeout(function() {
          ctrl.search = initSearchValue || ctrl.search;
          _searchInput[0].focus();
        });
      }
    };

    ctrl.findGroupByName = function(name) {
      return ctrl.groups && ctrl.groups.filter(function(group) {
        return group.name === name;
      })[0];
    };

    ctrl.parseRepeatAttr = function(repeatAttr, groupByExp) {
      function updateGroups(items) {
        ctrl.groups = [];
        angular.forEach(items, function(item) {
          var groupFn = $scope.$eval(groupByExp);
          var groupName = angular.isFunction(groupFn) ? groupFn(item) : item[groupFn];
          var group = ctrl.findGroupByName(groupName);
          if(group) {
            group.items.push(item);
          }
          else {
            ctrl.groups.push({name: groupName, items: [item]});
          }
        });
        ctrl.items = [];
        ctrl.groups.forEach(function(group) {
          ctrl.items = ctrl.items.concat(group.items);
        });
      }

      function setPlainItems(items) {
        ctrl.items = items;
      }

      var setItemsFn = groupByExp ? updateGroups : setPlainItems;

      ctrl.parserResult = RepeatParser.parse(repeatAttr);

      ctrl.isGrouped = !!groupByExp;
      ctrl.itemProperty = ctrl.parserResult.itemName;

      // See https://github.com/angular/angular.js/blob/v1.2.15/src/ng/directive/ngRepeat.js#L259
      $scope.$watchCollection(ctrl.parserResult.source, function(items) {

        if (items === undefined || items === null) {
          // If the user specifies undefined or null => reset the collection
          // Special case: items can be undefined if the user did not initialized the collection on the scope
          // i.e $scope.addresses = [] is missing
          ctrl.items = [];
        } else {
          if (!angular.isArray(items)) {
            throw uiSelectMinErr('items', "Expected an array but got '{0}'.", items);
          } else {
            if (ctrl.multiple){
              //Remove already selected items (ex: while searching)
              var filteredItems = items.filter(function(i) {return ctrl.selected.indexOf(i) < 0;});
              setItemsFn(filteredItems);
            }else{
              setItemsFn(items);
            }
            ctrl.ngModel.$modelValue = null; //Force scope model value and ngModel value to be out of sync to re-run formatters

          }
        }

      });

      if (ctrl.multiple){
        //Remove already selected items
        $scope.$watchCollection('$select.selected', function(selectedItems){
          if (!selectedItems.length) return;
          var data = ctrl.parserResult.source($scope);
          var filteredItems = data.filter(function(i) {return selectedItems.indexOf(i) < 0;});
          setItemsFn(filteredItems);
          ctrl.sizeSearchInput();
        });
      }

    };

    var _refreshDelayPromise;

    /**
     * Typeahead mode: lets the user refresh the collection using his own function.
     *
     * See Expose $select.search for external / remote filtering https://github.com/angular-ui/ui-select/pull/31
     */
    ctrl.refresh = function(refreshAttr) {
      if (refreshAttr !== undefined) {

        // Debounce
        // See https://github.com/angular-ui/bootstrap/blob/0.10.0/src/typeahead/typeahead.js#L155
        // FYI AngularStrap typeahead does not have debouncing: https://github.com/mgcrea/angular-strap/blob/v2.0.0-rc.4/src/typeahead/typeahead.js#L177
        if (_refreshDelayPromise) {
          $timeout.cancel(_refreshDelayPromise);
        }
        _refreshDelayPromise = $timeout(function() {
          $scope.$eval(refreshAttr);
        }, ctrl.refreshDelay);
      }
    };

    ctrl.setActiveItem = function(item) {
      ctrl.activeIndex = ctrl.items.indexOf(item);
    };

    ctrl.isActive = function(itemScope) {
      return ctrl.items.indexOf(itemScope[ctrl.itemProperty]) === ctrl.activeIndex;
    };

    ctrl.isDisabled = function(itemScope) {
      var itemIndex = ctrl.items.indexOf(itemScope[ctrl.itemProperty]);
      var isDisabled = false;
      var item;

      if (itemIndex >= 0 && !angular.isUndefined(ctrl.disableChoiceExpression)) {
        item = ctrl.items[itemIndex];
        isDisabled = !!(itemScope.$eval(ctrl.disableChoiceExpression)); // force the boolean value
        item._uiSelectChoiceDisabled = isDisabled; // store this for later reference
      }

      return isDisabled;
    };

    // When the user clicks on an item inside the dropdown
    ctrl.select = function(item) {

      if (!item._uiSelectChoiceDisabled) {
        var locals = {};
        locals[ctrl.parserResult.itemName] = item;

        ctrl.onSelectCallback($scope, {
            $item: item,
            $model: ctrl.parserResult.modelMapper($scope, locals)
        });

        if(ctrl.multiple){
          ctrl.selected.push(item);
          ctrl.sizeSearchInput();
        } else {
          ctrl.selected = item;
        }
        ctrl.close();
      }
    };

    // Closes the dropdown
    ctrl.close = function() {
      if (ctrl.open) {
        _resetSearchInput();
        ctrl.open = false;
        $timeout(function(){
          ctrl.focusser[0].focus();
        },0,false);
      }
    };

    // Toggle dropdown
    ctrl.toggle = function(e) {
      if (ctrl.open) ctrl.close(); else ctrl.activate();
      e.preventDefault();
      e.stopPropagation();
    };

    // Remove item from multiple select
    ctrl.removeChoice = function(index){
      ctrl.selected.splice(index, 1);
      ctrl.activeMatchIndex = -1;
      ctrl.sizeSearchInput();
    };

    ctrl.getPlaceholder = function(){
      //Refactor single?
      if(ctrl.multiple && ctrl.selected.length) return;
      return ctrl.placeholder;
    };

    ctrl.sizeSearchInput = function(){
      var input = _searchInput[0],
          container = _searchInput.parent().parent()[0];
      _searchInput.css('width','10px');
      $timeout(function(){
        var newWidth = container.clientWidth - input.offsetLeft - 10;
        if(newWidth < 50) newWidth = container.clientWidth;
        _searchInput.css('width',newWidth+'px');
      }, 0, false);
    };

    function _handleDropDownSelection(key) {
      var processed = true;
      switch (key) {
        case KEY.DOWN:
          if (!ctrl.open && ctrl.multiple) ctrl.activate(false, true); //In case its the search input in 'multiple' mode
          else if (ctrl.activeIndex < ctrl.items.length - 1) { ctrl.activeIndex++; }
          break;
        case KEY.UP:
          if (!ctrl.open && ctrl.multiple) ctrl.activate(false, true); //In case its the search input in 'multiple' mode
          else if (ctrl.activeIndex > 0) { ctrl.activeIndex--; }
          break;
        case KEY.TAB:
          //TODO: Que hacemos en modo multiple?
          if (!ctrl.multiple) ctrl.select(ctrl.items[ctrl.activeIndex]);
          break;
        case KEY.ENTER:
          if(ctrl.open){
            ctrl.select(ctrl.items[ctrl.activeIndex]);
          } else {
            ctrl.activate(false, true); //In case its the search input in 'multiple' mode
          }
          break;
        case KEY.ESC:
          ctrl.close();
          break;
        default:
          processed = false;
      }
      return processed;
    }

    // Handles selected options in "multiple" mode
    function _handleMatchSelection(key){
      var caretPosition = _getCaretPosition(_searchInput[0]),
          length = ctrl.selected.length,
          // none  = -1,
          first = 0,
          last  = length-1,
          curr  = ctrl.activeMatchIndex,
          next  = ctrl.activeMatchIndex+1,
          prev  = ctrl.activeMatchIndex-1,
          newIndex = curr;

      if(caretPosition > 0 || (ctrl.search.length && key == KEY.RIGHT)) return false;

      ctrl.close();

      function getNewActiveMatchIndex(){
        switch(key){
          case KEY.LEFT:
            // Select previous/first item
            if(~ctrl.activeMatchIndex) return prev;
            // Select last item
            else return last;
            break;
          case KEY.RIGHT:
            // Open drop-down
            if(!~ctrl.activeMatchIndex || curr === last){
              ctrl.activate();
              return false;
            }
            // Select next/last item
            else return next;
            break;
          case KEY.BACKSPACE:
            // Remove selected item and select previous/first
            if(~ctrl.activeMatchIndex){
              ctrl.removeChoice(curr);
              return prev;
            }
            // Select last item
            else return last;
            break;
          case KEY.DELETE:
            // Remove selected item and select next item
            if(~ctrl.activeMatchIndex){
              ctrl.removeChoice(ctrl.activeMatchIndex);
              return curr;
            }
            else return false;
        }
      }

      newIndex = getNewActiveMatchIndex();

      if(!ctrl.selected.length || newIndex === false) ctrl.activeMatchIndex = -1;
      else ctrl.activeMatchIndex = Math.min(last,Math.max(first,newIndex));

      return true;
    }

    // Bind to keyboard shortcuts
    _searchInput.on('keydown', function(e) {

      var key = e.which;

      // if(~[KEY.ESC,KEY.TAB].indexOf(key)){
      //   //TODO: SEGURO?
      //   ctrl.close();
      // }

      $scope.$apply(function() {
        var processed = false;

        if(ctrl.multiple && KEY.isHorizontalMovement(key)){
          processed = _handleMatchSelection(key);
        }

        if (!processed && ctrl.items.length > 0) {
          processed = _handleDropDownSelection(key);
        }

        if (processed  && key != KEY.TAB) {
          //TODO Check si el tab selecciona aun correctamente
          //Crear test
          e.preventDefault();
          e.stopPropagation();
        }
      });

      if(KEY.isVerticalMovement(key) && ctrl.items.length > 0){
        _ensureHighlightVisible();
      }

    });

    _searchInput.on('blur', function() {
      $timeout(function() {
        ctrl.activeMatchIndex = -1;
        ctrl.activeIndex = 0;
      });
    });

    function _getCaretPosition(el) {
      if(angular.isNumber(el.selectionStart)) return el.selectionStart;
      // selectionStart is not supported in IE8 and we don't want hacky workarounds so we compromise
      else return el.value.length;
    }

    // See https://github.com/ivaynberg/select2/blob/3.4.6/select2.js#L1431
    function _ensureHighlightVisible() {
      var container = $element.querySelectorAll('.ui-select-choices-content');
      var choices = container.querySelectorAll('.ui-select-choices-row');
      if (choices.length < 1) {
        throw uiSelectMinErr('choices', "Expected multiple .ui-select-choices-row but got '{0}'.", choices.length);
      }

      var highlighted = choices[ctrl.activeIndex];
      var posY = highlighted.offsetTop + highlighted.clientHeight - container[0].scrollTop;
      var height = container[0].offsetHeight;

      if (posY > height) {
        container[0].scrollTop += posY - height;
      } else if (posY < highlighted.clientHeight) {
        if (ctrl.isGrouped && ctrl.activeIndex === 0)
          container[0].scrollTop = 0; //To make group header visible when going all the way up
        else
          container[0].scrollTop -= highlighted.clientHeight - posY;
      }
    }

    $scope.$on('$destroy', function() {
      _searchInput.off('keydown blur');
    });
  }
