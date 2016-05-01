'use strict';

import angular from 'angular';
import moment from 'moment';

import availity from '../module';

const AvUserPermissionsResourceFactory = function(AvApiResource) {

  const AvUserPermissionsResource = function() {
    AvApiResource.call(this, {
      level: '/internal',
      version: '/v1',
      url: '/axi-user-permissions'
    });
    this.sessionDate = moment().toISOString();
  };

  angular.extend(AvUserPermissionsResource.prototype, AvApiResource.prototype, {

    afterQuery: function(response) {
      return response.data.axiUserPermissions ? response.data.axiUserPermissions : [];
    },

    getPermissions: function(permissionIds, region) {
      const self = this;
      return this.query({
        params: {
          permissionId: permissionIds,
          region: region,
          sessionDate: self.sessionDate
        }
      });
    }

  });

  return new AvUserPermissionsResource();

};

availity.core.factory('avUserPermissionsResource', AvUserPermissionsResourceFactory);

