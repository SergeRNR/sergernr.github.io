app.service('ContactsModel', ['$http',
    function ($http) {
        var model = this,
            contacts = [
                {
                    id: 1,
                    fname: 'Serge',
                    lname: 'Melnikov',
                    dob: '1986-08-11',
                    tel: '375291054043'
                },
                {
                    id: 2,
                    fname: 'Ivan',
                    lname: 'Dymousky',
                    dob: '1988-04-27',
                    tel: '375291556644'
                },
                {
                    id: 3,
                    fname: 'Jimmy',
                    lname: 'Page',
                    dob: '1944-01-09',
                    tel: '555291556644'
                }
            ];

        model.getContacts = function () {
            return $http.get('/data/list.json')
                .then(function (data, status) {
                    return data;
                });
        };

        model.addContact = function (data) {

        };
    }
])
