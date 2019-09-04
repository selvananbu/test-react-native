import { Component } from 'react';
import axios from 'axios';

import OpenApiClient from './openapiclient';
import OpenApiException from './openapiexception';
import { MimeTypes } from './openapibody';
import OpenApiResponse from './openapiresponse';
import OpenApiClientArrayHelper from './openapiclientarrayhelper';
import { ensureAccessTokenIsValid, directDownloadConfig } from '../lilayoutauthentication/authutil';

var Qs = require('qs');




class OpenApiClient_query extends OpenApiClient {

    constructor(site) {
        super(site, OpenApiClient_query.getServiceName());
    }

    static getClient(site) {
        var key = site + "." + OpenApiClient_query.getServiceName();
        var service = OpenApiClient.serviceMap.get(key);

        if(service == undefined)
        {
            service = new OpenApiClient_query(site);
            OpenApiClient.serviceMap.set(key, service);
        }
        return service;
    }

    static getServiceName() {
        return 'query';
    }


    GET_columns_queryId_selectable(callback, queryId, siteCode = null, userCode = null, multisiteUser = null, avlOptions = null, altRootIdx = null, colsWithCachedChoices = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(queryId, false, [])) {
                    throw new OpenApiException("Parameter 'queryId' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(siteCode, true, [])) {
                    throw new OpenApiException("Parameter 'siteCode' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(userCode, true, [])) {
                    throw new OpenApiException("Parameter 'userCode' is not a valid string!");
                }
                
                
                if (!self.verifyParamIsIntegerArray(avlOptions, true, [])) {
                    throw new OpenApiException("Parameter 'avlOptions' is not a valid integer array!");
                }
                
                if (!self.verifyParamIsInteger(altRootIdx, true, [])) {
                    throw new OpenApiException("Parameter 'altRootIdx' is not a valid number!");
                }
                
                if (!self.verifyParamIsIntegerArray(colsWithCachedChoices, true, [])) {
                    throw new OpenApiException("Parameter 'colsWithCachedChoices' is not a valid integer array!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(siteCode !== null) queryParams['siteCode'] = siteCode;
                if(userCode !== null) queryParams['userCode'] = userCode;
                if(multisiteUser !== null) queryParams['multisiteUser'] = multisiteUser;
                if(avlOptions !== null) serializedParam['avlOptions'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(avlOptions, "STYLE_UNDEFINED", "avlOptions", true);
                if(altRootIdx !== null) queryParams['altRootIdx'] = altRootIdx;
                if(colsWithCachedChoices !== null) serializedParam['colsWithCachedChoices'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(colsWithCachedChoices, "STYLE_UNDEFINED", "colsWithCachedChoices", true);
                const config = {
                    url: self.getUrl(['columns', queryId, 'selectable'], serializedParam),
                    method: 'get',
                    responseType: 'arraybuffer',
                    headers: headers,
                    params: queryParams,
                    cancelToken: source.token,
                    paramsSerializer: function(params) {
                        return Qs.stringify(params, {arrayFormat: 'brackets'})
                    },
                    onUploadProgress: function (progressEvent) {
                        // console.log(progressEvent,'in progress');
                    },
                    onDownloadProgress: function (progressEvent) {
                        // console.log(progressEvent, 'completed');
                    }
                }
                if (activateDownloadManager) {
                    window.downloadManager[uniqueKey].cancel = source;
                    return axios.request(config)
                    .then(function(response) {
                        self.logResponse('GET_columns_queryId_selectable', response);
                        for (var key in window.downloadManager) {
                            if (uniqueKey === (key))
                            {
                                if (response.status === 200) {
                                    window.downloadManager[key].status = 0;
                                }
                                else {
                                    window.downloadManager[key].status = 2;
                                }
                            }
                        }

                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {

                        for (var key in window.downloadManager) {
                            if(uniqueKey === (key))
                            {
                                if (err.message === 'canceled') {
                                    window.downloadManager[key].status = 5;
                                }
                                else {
                                    window.downloadManager[key].status = 2;
                                }
                            }
                        }
                        self.logResponse('GET_columns_queryId_selectable', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'queryId': queryId,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['columns', queryId, 'selectable'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_columns_queryId_selectable', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_columns_queryId_selectable', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_columns_queryId_selectable', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_columns_queryId_restrictable(callback, queryId, siteCode = null, userCode = null, multisiteUser = null, avlOptions = null, altRootIdx = null, colsWithCachedChoices = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(queryId, false, [])) {
                    throw new OpenApiException("Parameter 'queryId' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(siteCode, true, [])) {
                    throw new OpenApiException("Parameter 'siteCode' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(userCode, true, [])) {
                    throw new OpenApiException("Parameter 'userCode' is not a valid string!");
                }
                
                
                if (!self.verifyParamIsIntegerArray(avlOptions, true, [])) {
                    throw new OpenApiException("Parameter 'avlOptions' is not a valid integer array!");
                }
                
                if (!self.verifyParamIsInteger(altRootIdx, true, [])) {
                    throw new OpenApiException("Parameter 'altRootIdx' is not a valid number!");
                }
                
                if (!self.verifyParamIsIntegerArray(colsWithCachedChoices, true, [])) {
                    throw new OpenApiException("Parameter 'colsWithCachedChoices' is not a valid integer array!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(siteCode !== null) queryParams['siteCode'] = siteCode;
                if(userCode !== null) queryParams['userCode'] = userCode;
                if(multisiteUser !== null) queryParams['multisiteUser'] = multisiteUser;
                if(avlOptions !== null) serializedParam['avlOptions'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(avlOptions, "STYLE_UNDEFINED", "avlOptions", true);
                if(altRootIdx !== null) queryParams['altRootIdx'] = altRootIdx;
                if(colsWithCachedChoices !== null) serializedParam['colsWithCachedChoices'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(colsWithCachedChoices, "STYLE_UNDEFINED", "colsWithCachedChoices", true);
                const config = {
                    url: self.getUrl(['columns', queryId, 'restrictable'], serializedParam),
                    method: 'get',
                    responseType: 'arraybuffer',
                    headers: headers,
                    params: queryParams,
                    cancelToken: source.token,
                    paramsSerializer: function(params) {
                        return Qs.stringify(params, {arrayFormat: 'brackets'})
                    },
                    onUploadProgress: function (progressEvent) {
                        // console.log(progressEvent,'in progress');
                    },
                    onDownloadProgress: function (progressEvent) {
                        // console.log(progressEvent, 'completed');
                    }
                }
                if (activateDownloadManager) {
                    window.downloadManager[uniqueKey].cancel = source;
                    return axios.request(config)
                    .then(function(response) {
                        self.logResponse('GET_columns_queryId_restrictable', response);
                        for (var key in window.downloadManager) {
                            if (uniqueKey === (key))
                            {
                                if (response.status === 200) {
                                    window.downloadManager[key].status = 0;
                                }
                                else {
                                    window.downloadManager[key].status = 2;
                                }
                            }
                        }

                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {

                        for (var key in window.downloadManager) {
                            if(uniqueKey === (key))
                            {
                                if (err.message === 'canceled') {
                                    window.downloadManager[key].status = 5;
                                }
                                else {
                                    window.downloadManager[key].status = 2;
                                }
                            }
                        }
                        self.logResponse('GET_columns_queryId_restrictable', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'queryId': queryId,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['columns', queryId, 'restrictable'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_columns_queryId_restrictable', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_columns_queryId_restrictable', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_columns_queryId_restrictable', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_triggerTypes_queryId(callback, queryId, siteCode = null, userCode = null, multisiteUser = null, avlOptions = null, altRootIdx = null, colsWithCachedChoices = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(queryId, false, [])) {
                    throw new OpenApiException("Parameter 'queryId' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(siteCode, true, [])) {
                    throw new OpenApiException("Parameter 'siteCode' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(userCode, true, [])) {
                    throw new OpenApiException("Parameter 'userCode' is not a valid string!");
                }
                
                
                if (!self.verifyParamIsIntegerArray(avlOptions, true, [])) {
                    throw new OpenApiException("Parameter 'avlOptions' is not a valid integer array!");
                }
                
                if (!self.verifyParamIsInteger(altRootIdx, true, [])) {
                    throw new OpenApiException("Parameter 'altRootIdx' is not a valid number!");
                }
                
                if (!self.verifyParamIsIntegerArray(colsWithCachedChoices, true, [])) {
                    throw new OpenApiException("Parameter 'colsWithCachedChoices' is not a valid integer array!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(siteCode !== null) queryParams['siteCode'] = siteCode;
                if(userCode !== null) queryParams['userCode'] = userCode;
                if(multisiteUser !== null) queryParams['multisiteUser'] = multisiteUser;
                if(avlOptions !== null) serializedParam['avlOptions'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(avlOptions, "STYLE_UNDEFINED", "avlOptions", true);
                if(altRootIdx !== null) queryParams['altRootIdx'] = altRootIdx;
                if(colsWithCachedChoices !== null) serializedParam['colsWithCachedChoices'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(colsWithCachedChoices, "STYLE_UNDEFINED", "colsWithCachedChoices", true);
                const config = {
                    url: self.getUrl(['triggerTypes', queryId], serializedParam),
                    method: 'get',
                    responseType: 'arraybuffer',
                    headers: headers,
                    params: queryParams,
                    cancelToken: source.token,
                    paramsSerializer: function(params) {
                        return Qs.stringify(params, {arrayFormat: 'brackets'})
                    },
                    onUploadProgress: function (progressEvent) {
                        // console.log(progressEvent,'in progress');
                    },
                    onDownloadProgress: function (progressEvent) {
                        // console.log(progressEvent, 'completed');
                    }
                }
                if (activateDownloadManager) {
                    window.downloadManager[uniqueKey].cancel = source;
                    return axios.request(config)
                    .then(function(response) {
                        self.logResponse('GET_triggerTypes_queryId', response);
                        for (var key in window.downloadManager) {
                            if (uniqueKey === (key))
                            {
                                if (response.status === 200) {
                                    window.downloadManager[key].status = 0;
                                }
                                else {
                                    window.downloadManager[key].status = 2;
                                }
                            }
                        }

                        callback(new OpenApiResponse(response));
                    })
                    .catch(function(err) {

                        for (var key in window.downloadManager) {
                            if(uniqueKey === (key))
                            {
                                if (err.message === 'canceled') {
                                    window.downloadManager[key].status = 5;
                                }
                                else {
                                    window.downloadManager[key].status = 2;
                                }
                            }
                        }
                        self.logResponse('GET_triggerTypes_queryId', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'queryId': queryId,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['triggerTypes', queryId], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_triggerTypes_queryId', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_triggerTypes_queryId', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_triggerTypes_queryId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
}

export default OpenApiClient_query;
