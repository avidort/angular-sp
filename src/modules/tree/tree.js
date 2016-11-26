import mainModule from '../main-module';
import treeTemplate from './tree.html!ng-template';
import './tree.css!'

mainModule
    .component('folderTree', {
        templateUrl: treeTemplate.templateUrl,
        controller: ['$scope', 'folderService', function($scope, folderService) {
          $scope.toggle = function (scope) {
            scope.toggle();
          };

          $scope.collapseAll = function () {
            $scope.$broadcast('angular-ui-tree:collapse-all');
          };

          $scope.expandAll = function () {
            $scope.$broadcast('angular-ui-tree:expand-all');
          };

          const items = folderService.getItems();

          function getNodes(items, output) {
            if (!items) return output;

            let currentNodes = [];

            items.forEach(function(item) {
              let subNode = {
                id: item.id,
                title: item.name,
                nodes: []
              };

              item.files.forEach(function(file) {
                subNode.nodes.push({
                  id: 0,
                  title: file.name,
                  nodes: []
                });
              });

              if (item.hasChildren) {
                subNode.nodes = subNode.nodes.concat(getNodes(item.children, output));
              } else if (!item.files.length) {
                subNode.nodes.push({
                  id: -1,
                  title: '(No files)',
                  nodes: []
                })
              }

              currentNodes.push(subNode);
            });

            return currentNodes;
          }

          $scope.data = getNodes(items, {});
        }]
    });