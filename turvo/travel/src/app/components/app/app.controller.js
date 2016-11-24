angular.module('TA')
.controller('AppController', [
    'filterTypes',
    'historyService',
    function (filterTypes, historyService) {
        let history = [
            {
                id: 1479999738239,
                type: 'flights',
                startDate: '2016-12-08T14:55:54.171Z',
                endDate: '2016-12-11T14:55:54.171Z',
                from: 'Madrid',
                to: 'Rio'
            },
            {
                id: 1479999738240,
                type: 'hotels',
                startDate: '2016-12-22T14:55:54.171Z',
                endDate: '2016-12-28T14:55:54.171Z',
                amenities: 4,
                location: 'Milan'
            },
            {
                id: 1479999738241,
                type: 'cars',
                startDate: '2016-11-26T14:55:54.171Z',
                endDate: '2016-11-28T14:55:54.171Z',
                carType: 'suv',
                location: 'NY'
            }
        ];

        // INITIAL STATE
        this.filterTypes = filterTypes;
        this.activeType = filterTypes[0].type;

        this.formData = {
            startDate: new Date(),
            endDate: new Date()
        };
        this.form = angular.copy(this.formData);

        // FORM PROCESSING
        this.setActiveType = (type) => {
            this.activeType = type;
        };

        this.search = (form) => {
            if (form) {
                console.log(form);
                // historyService.add(form);
            }
            history.forEach(record => historyService.add(record))
        };

        this.reset = () => {
            this.form = angular.copy(this.formData);
        };

        // HISTORY
        this.history = historyService.get();

        this.getHistoryTemplate = (record) => `components/${record.type}/${record.type}-history.html`;

        this.removeHistoryRecord = (id) => historyService.remove(id);
    }
]);
