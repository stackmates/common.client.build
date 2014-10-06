'use strict';


module.exports = /*@ngInject*/
  function ($transition, $timeout, $document, $compile, $rootScope, $$stackedMap) {

    var OPENED_MODAL_CLASS = 'modal-open';

    var backdropDomEl, backdropScope;
    var openedWindows = $$stackedMap.createNew();
    var $modalStack = {};

    function backdropIndex() {
      var topBackdropIndex = -1;
      var opened = openedWindows.keys();
      for (var i = 0; i < opened.length; i++) {
        if (openedWindows.get(opened[i]).value.backdrop) {
          topBackdropIndex = i;
        }
      }
      return topBackdropIndex;
    }

    $rootScope.$watch(backdropIndex, function(newBackdropIndex){
      if (backdropScope) {
        backdropScope.index = newBackdropIndex;
      }
    });

    function removeModalWindow(modalInstance) {

      var body = $document.find('body').eq(0);
      var modalWindow = openedWindows.get(modalInstance).value;

      //clean up the stack
      openedWindows.remove(modalInstance);

      //remove window DOM element
      removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, 300, function() {
        modalWindow.modalScope.$destroy();
        body.toggleClass(OPENED_MODAL_CLASS, openedWindows.length() > 0);
        checkRemoveBackdrop();
      });
    }

    function checkRemoveBackdrop() {
        //remove backdrop if no longer needed
        if (backdropDomEl && backdropIndex() == -1) {
          var backdropScopeRef = backdropScope;
          removeAfterAnimate(backdropDomEl, backdropScope, 150, function () {
            backdropScopeRef.$destroy();
            backdropScopeRef = null;
          });
          backdropDomEl = undefined;
          backdropScope = undefined;
        }
    }

    function removeAfterAnimate(domEl, scope, emulateTime, done) {
      // Closing animation
      scope.animate = false;

      var transitionEndEventName = $transition.transitionEndEventName;
      if (transitionEndEventName) {
        // transition out
        var timeout = $timeout(afterAnimating, emulateTime);

        domEl.bind(transitionEndEventName, function () {
          $timeout.cancel(timeout);
          afterAnimating();
          scope.$apply();
        });
      } else {
        // Ensure this call is async
        $timeout(afterAnimating);
      }

      function afterAnimating() {
        if (afterAnimating.done) {
          return;
        }
        afterAnimating.done = true;

        domEl.remove();
        if (done) {
          done();
        }
      }
    }

    $document.bind('keydown', function (evt) {
      var modal;

      if (evt.which === 27) {
        modal = openedWindows.top();
        if (modal && modal.value.keyboard) {
          evt.preventDefault();
          $rootScope.$apply(function () {
            $modalStack.dismiss(modal.key, 'escape key press');
          });
        }
      }
    });

    $modalStack.open = function (modalInstance, modal) {

      openedWindows.add(modalInstance, {
        deferred: modal.deferred,
        modalScope: modal.scope,
        backdrop: modal.backdrop,
        keyboard: modal.keyboard
      });

      var body = $document.find('body').eq(0),
          currBackdropIndex = backdropIndex();

      if (currBackdropIndex >= 0 && !backdropDomEl) {
        backdropScope = $rootScope.$new(true);
        backdropScope.index = currBackdropIndex;
        var angularBackgroundDomEl = angular.element('<div modal-backdrop></div>');
        angularBackgroundDomEl.attr('backdrop-class', modal.backdropClass);
        backdropDomEl = $compile(angularBackgroundDomEl)(backdropScope);
        body.append(backdropDomEl);
      }

      var angularDomEl = angular.element('<div modal-window></div>');
      angularDomEl.attr({
        'template-url': modal.windowTemplateUrl,
        'window-class': modal.windowClass,
        'size': modal.size,
        'index': openedWindows.length() - 1,
        'animate': 'animate'
      }).html(modal.content);

      var modalDomEl = $compile(angularDomEl)(modal.scope);
      openedWindows.top().value.modalDomEl = modalDomEl;
      body.append(modalDomEl);
      body.addClass(OPENED_MODAL_CLASS);
    };

    $modalStack.close = function (modalInstance, result) {
      var modalWindow = openedWindows.get(modalInstance);
      if (modalWindow) {
        modalWindow.value.deferred.resolve(result);
        removeModalWindow(modalInstance);
      }
    };

    $modalStack.dismiss = function (modalInstance, reason) {
      var modalWindow = openedWindows.get(modalInstance);
      if (modalWindow) {
        modalWindow.value.deferred.reject(reason);
        removeModalWindow(modalInstance);
      }
    };

    $modalStack.dismissAll = function (reason) {
      var topModal = this.getTop();
      while (topModal) {
        this.dismiss(topModal.key, reason);
        topModal = this.getTop();
      }
    };

    $modalStack.getTop = function () {
      return openedWindows.top();
    };

    return $modalStack;
  }
