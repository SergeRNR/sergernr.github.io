angular.module('TA')
.controller('AppController', [
    'filterTypes',
    'historyService',
    function (filterTypes, historyService) {
        // INITIAL STATE
        this.filterTypes = filterTypes;

        this.defaultFormData = {
            startDate: new Date(),
            endDate: new Date()
        };
        this.form = angular.copy(this.defaultFormData);

        this.setActiveType = (type) => {
            this.activeType = type;
        };

        // FORM PROCESSING
        this.search = (form) => {
            form.id = Date.now();
            form.type = this.activeType;
            historyService.add(form);
        };

        this.reset = () => {
            this.form = angular.copy(this.defaultFormData);
        };

        // HISTORY
        this.history = historyService.get();

        this.getHistoryTemplate = (record) => `components/${record.type}/${record.type}-history.html`;

        this.removeHistoryRecord = (id) => historyService.remove(id);
    }
]);
