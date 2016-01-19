'use strict';

describe('Directive: csSelect', function () {

  // load the directive's module and view
  beforeEach(module('tdpharmaClientApp'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    scope.rowCollection = [
        {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
        {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
        {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
    ];
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element(' \
      <table st-table="rowCollection" class="table"> \
        <thead> \
        <tr> \
          <th></th> \
          <th st-sort="firstName">first name</th> \
          <th st-sort="lastName">last name</th> \
          <th st-sort="birthDate">birth date</th> \
          <th st-sort="balance">balance</th> \
          <th>email</th> \
        </tr> \
        </thead> \
        <tbody> \
        <tr ng-repeat="row in rowCollection"> \
          <td cs-select="row"></td> \
          <td>{{row.firstName | uppercase}}</td> \
          <td>{{row.lastName}}</td> \
          <td>{{row.birthDate | date}}</td> \
          <td>{{row.balance | currency}}</td> \
          <td><a ng-href="mailto:{{row.email}}">email</a></td> \
        </tr> \
        </tbody> \
      </table>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toMatch(/LAURENT/);
  }));
});