import './chart/chart';
import './tree/tree';

import mainModule from './main-module';
import mainTemplate from './main.html!ng-template';

mainModule
    .component('filesTab', {
        templateUrl: mainTemplate.templateUrl,
        controllerAs: '$ctrl',
        controller: ['folderService', function(folderService) {
            this.status = false;
            folderService.load().then(() => this.status = true);
        }]
    })
    .factory('folderService', ['$http', '$q', function($http, $q) {
        let itemObject;
        let fileTypes = {};

        const extract = function(file) {
            return $http({
                url: `./resource/${file}.json`,
                method: 'GET',
                transformResponse: [(data) => eval(data)] // JSON.parse isn't supported since the provided .json files weren't formatted properly 
            });
        }

        const loadData = function(parent, file) {
            extract(file).then(({data}) => {
                if (!parent) {
                    itemObject = data;
                } else {
                    parent.children = data;
                }
                data.forEach(function(subData) {
                    if (subData.hasChildren) {
                        loadData(subData, subData.id);
                    }
                    subData.files.forEach(function(file) {
                        if (!fileTypes[file.type]) {
                            fileTypes[file.type] = 1;
                        } else { 
                            fileTypes[file.type]++;
                        }
                    });
                }); 
            });
        }

        return {
            load: function() {
                return $q(function(resolve, reject) {
                    loadData(null, 'server');
                    setTimeout(() => resolve(), 1000); // hacky, unreal fix since we can't determine exactly when loading is finished due to recursion
                });
            },

            getTypes: function() {
                return fileTypes;
            },

            get: function() {
                console.log(itemObject);
                console.log(fileTypes);
            }
        }
    }]);