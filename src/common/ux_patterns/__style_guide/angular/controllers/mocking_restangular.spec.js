// // sample jasmine test
// describe('Test', function(){
//     // the variables that we need in each unit test. TestUtils is a service containing common test methods
//     var httpBackend, Restangular, TestUtils, q, scope;

//     // first we initialize the required modules
//     beforeEach(function() {
//         // the module to be tested
//         module('someModuleContainingTheServiceToBeTested');
//         // the test utils module
//         module('someModuleContainingTestUtils');
//     });

//     // then we use the $injector to obtain the instances of the services we would like to mock/use
//     // but not of the service that we want to test
//     beforeEach(inject(function( _Restangular_, _$httpBackend_, _TestUtils_, $q, $rootScope) {
//         httpBackend = _$httpBackend_;
//         Restangular = _Restangular_;
//         TestUtils = _TestUtils_;
//         q = $q;
//         scope = $rootScope.$new();
//     }));

//     // a sample definition on which method we are about to test
//     describe('getNewRes test', function(){
//         // actual test implementation
//         it('A description of what should the method do', inject(function(SomeVariableService){
//             // set up a spy on Restangular, so we test with what parameters it was called, also allow the call to continue
//             spyOn(Restangular, 'one').andCallThrough();
//             // a mock to be returned from http. We would later expect our service to 'enhance' this mock with an additional property
//             var mockToReturn = {
//                 someProp: 'someValue',
//                 someOtherProp: 'someOtherValue'
//             };
//             // a parameter with which the http service we expect to be called
//             var someParameter = 'someParameter';
//             // httpBackend would append a "/" in front of a restangular call
//             httpBackend.expectGET('/someVariable', {
//                 someParameter: someParameter
//             })
//             // respond with the mock
//             .respond(mockToReturn);

//             // now call our service
//             var newRes = SomeVariableService.getNewRes(someParameter);

//             // handle restangular expectations
//             expect(Restangular.one).toHaveBeenCalledWith('someVariable');
//             // flush the backend to unproxy the restangular promise
//             httpBackend.flush();


//             // now follows the tricky part. The restangular promise has been unproxied by the httpBackend.flush call,
//             // but our promise, the one we return in the service, still hasn't been unproxied
//             // so, if we were to directly expect it to be unproxied, we are in for a surprise, it is a still a promise
//             // this took some fiddling, but I created a utility function that will do the unproxying for you:
//             newRes = TestUtils.resolvePromise(newRes, q, scope);

//             // expect the new object to have been 'enhanced' by the service
//             expect(newRes).toEqual({
//                 someProp: 'someValue',
//                 someOtherProp: 'someOtherValue',
//                 newlyCreatedProp : 'newlyCreatedProp'
//             });
//         }));
//     });
// });
