'use strict';
var aerospikeClusterIP  = '127.0.0.1';
var aerospikeClusterPort = 3000;
exports.aerospikeConfig = function()    {
    return  {
        hosts: [ { addr: aerospikeClusterIP, port: aerospikeClusterPort } ]
    };
};
exports.aerospikeDBParams = function()  {
    return {
        defaultNamespace: 'test',
        defaultSet: 'test'
    };
};
