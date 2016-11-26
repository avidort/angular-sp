import mainModule from '../main-module';
import chartTemplate from './chart.html!ng-template';

mainModule
    .component('pieChart', {
        templateUrl: chartTemplate.templateUrl,
        controller: ['$scope', 'folderService', function($scope, folderService) {
            $scope.options = {
                chart: {
                    type: 'pieChart',
                    height: 400,
                    x: function(d) { return d.label; },
                    y: function(d) { return d.value; },
                    showLabels: false,
                    duration: 250,
                    labelThreshold: 0.01,
                    labelType: 'percent',
                    donut: true,
                    donutRatio: 0.35,
                    legend: {
                        margin: {
                            top: 5,
                            right: 180,
                            bottom: 5,
                            left: 0
                        }
                    }
                }
            };

            $scope.data = [];

            const types = folderService.getTypes();
            for (let type in types) {
                $scope.data.push({label: type, value: Number(types[type])});
            }
        }]
    });