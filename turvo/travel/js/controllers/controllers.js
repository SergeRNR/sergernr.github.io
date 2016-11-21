app.controller('ContactListCtrl', ['$scope', 'ContactsModel', 'contactList',
    function ($scope, ContactsModel, contactList) {
        $scope.sortType = 'fname'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.searchText = '';     // set the default search/filter term

        $scope.list = contactList.data;
    }
]);

app.controller('ContactAddCtrl', ['$scope', 'ContactsModel',
    function ($scope, ContactsModel) {
        $scope.new = {};
        $scope.error = {};

        $scope.add = function () {
            if ($scope.contactForm.$valid) {
                ContactsModel.addContact($scope.new);
            }
        };
    }
]);