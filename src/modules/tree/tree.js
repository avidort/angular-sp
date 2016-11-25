import mainModule from '../main-module';
import treeTemplate from './tree.html!ng-template';

mainModule
    .component('folderTree', {
        templateUrl: treeTemplate.templateUrl,
        controller: ['$scope', 'folderService', function($scope, folderService) {
          folderService.load();
          $scope.btn = function() {
            folderService.get();
          }
        }]
    });