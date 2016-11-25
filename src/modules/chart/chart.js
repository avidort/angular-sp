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
                    x: function(d) { return d.key; },
                    y: function(d) { return d.y; },
                    showLabels: true,
                    duration: 250,
                    labelThreshold: 0.01,
                    labelSunbeamLayout: true,
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
                $scope.data.push({key: type, y: types[type]});
            }
        }]
    });