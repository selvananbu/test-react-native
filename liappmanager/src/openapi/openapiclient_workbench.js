import { Component } from 'react';
import axios from 'axios';

import OpenApiClient from './openapiclient';
import OpenApiException from './openapiexception';
import { MimeTypes } from './openapibody';
import OpenApiResponse from './openapiresponse';
import OpenApiClientArrayHelper from './openapiclientarrayhelper';
import { ensureAccessTokenIsValid, directDownloadConfig } from '../lilayoutauthentication/authutil';

var Qs = require('qs');

export const WORKBENCH_FILE_TYPE_SVG = "svg";
export const WORKBENCH_FILE_TYPE_PDF = "pdf";
export const WORKBENCH_FILE_TYPE_PNG = "png";
export const WORKBENCH_FILE_TYPE_XLSX = "xlsx";



class OpenApiClient_workbench extends OpenApiClient {

    constructor(site) {
        super(site, OpenApiClient_workbench.getServiceName());
    }

    static getClient(site) {
        var key = site + "." + OpenApiClient_workbench.getServiceName();
        var service = OpenApiClient.serviceMap.get(key);

        if(service == undefined)
        {
            service = new OpenApiClient_workbench(site);
            OpenApiClient.serviceMap.set(key, service);
        }
        return service;
    }

    static getServiceName() {
        return 'workbench';
    }


    GET_datasources(callback, siteType = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(siteType, true, [])) {
                    throw new OpenApiException("Parameter 'siteType' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(siteType !== null) queryParams['siteType'] = siteType;
                const config = {
                    url: self.getUrl(['datasources'], serializedParam),
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
                        self.logResponse('GET_datasources', response);
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
                        self.logResponse('GET_datasources', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['datasources'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_datasources', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_datasources', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_datasources', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_view_criteria(callback, workbenchId, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(workbenchId, false, [])) {
                    throw new OpenApiException("Parameter 'workbenchId' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(workbenchId !== null) queryParams['workbenchId'] = workbenchId;
                const config = {
                    url: self.getUrl(['view_criteria'], serializedParam),
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
                        self.logResponse('GET_view_criteria', response);
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
                        self.logResponse('GET_view_criteria', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['view_criteria'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_view_criteria', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_view_criteria', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_view_criteria', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_reports(callback, workbenchId = null, siteType = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(workbenchId, true, [])) {
                    throw new OpenApiException("Parameter 'workbenchId' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(siteType, true, [])) {
                    throw new OpenApiException("Parameter 'siteType' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(workbenchId !== null) queryParams['workbenchId'] = workbenchId;
                if(siteType !== null) queryParams['siteType'] = siteType;
                const config = {
                    url: self.getUrl(['reports'], serializedParam),
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
                        self.logResponse('GET_reports', response);
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
                        self.logResponse('GET_reports', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['reports'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_reports', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_reports', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_reports', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_reports_workbenchId_dataSource_configID_viewcritID_file_type(callback, workbenchId, dataSource, configID, viewcritID, file_type, triggerType = null, triggerValue = null, columnID = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(workbenchId, false, [])) {
                    throw new OpenApiException("Parameter 'workbenchId' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(dataSource, false, [])) {
                    throw new OpenApiException("Parameter 'dataSource' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(configID, false, [])) {
                    throw new OpenApiException("Parameter 'configID' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(viewcritID, false, [])) {
                    throw new OpenApiException("Parameter 'viewcritID' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(file_type, false, [])) {
                    throw new OpenApiException("Parameter 'file_type' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(triggerType, true, [])) {
                    throw new OpenApiException("Parameter 'triggerType' is not a valid number!");
                }
                
                if (!self.verifyParamIsStringArray(triggerValue, true, [])) {
                    throw new OpenApiException("Parameter 'triggerValue' is not a valid string array!");
                }
                
                if (!self.verifyParamIsInteger(columnID, true, [])) {
                    throw new OpenApiException("Parameter 'columnID' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(triggerType !== null) queryParams['triggerType'] = triggerType;
                if(triggerValue !== null) serializedParam['triggerValue'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(triggerValue, "STYLE_PIPEDELIMITED", "triggerValue", false);
                if(columnID !== null) queryParams['columnID'] = columnID;
                const config = {
                    url: self.getUrl(['reports', workbenchId, dataSource, configID, viewcritID, file_type], serializedParam),
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
                        self.logResponse('GET_reports_workbenchId_dataSource_configID_viewcritID_file_type', response);
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
                        self.logResponse('GET_reports_workbenchId_dataSource_configID_viewcritID_file_type', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'workbenchId': workbenchId,
                        'dataSource': dataSource,
                        'configID': configID,
                        'viewcritID': viewcritID,
                        'file_type': file_type,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['reports', workbenchId, dataSource, configID, viewcritID, file_type], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_reports_workbenchId_dataSource_configID_viewcritID_file_type', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_reports_workbenchId_dataSource_configID_viewcritID_file_type', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_reports_workbenchId_dataSource_configID_viewcritID_file_type', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_charts(callback, workbenchId = null, siteType = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(workbenchId, true, [])) {
                    throw new OpenApiException("Parameter 'workbenchId' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(siteType, true, [])) {
                    throw new OpenApiException("Parameter 'siteType' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(workbenchId !== null) queryParams['workbenchId'] = workbenchId;
                if(siteType !== null) queryParams['siteType'] = siteType;
                const config = {
                    url: self.getUrl(['charts'], serializedParam),
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
                        self.logResponse('GET_charts', response);
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
                        self.logResponse('GET_charts', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['charts'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_charts', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_charts', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_charts', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_charts_workbenchId_dataSource_configID_viewcritID_file_type(callback, workbenchId, dataSource, configID, viewcritID, file_type, triggerType = null, triggerValue = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(workbenchId, false, [])) {
                    throw new OpenApiException("Parameter 'workbenchId' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(dataSource, false, [])) {
                    throw new OpenApiException("Parameter 'dataSource' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(configID, false, [])) {
                    throw new OpenApiException("Parameter 'configID' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(viewcritID, false, [])) {
                    throw new OpenApiException("Parameter 'viewcritID' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(file_type, false, [])) {
                    throw new OpenApiException("Parameter 'file_type' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(triggerType, true, [])) {
                    throw new OpenApiException("Parameter 'triggerType' is not a valid number!");
                }
                
                if (!self.verifyParamIsStringArray(triggerValue, true, [])) {
                    throw new OpenApiException("Parameter 'triggerValue' is not a valid string array!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(triggerType !== null) queryParams['triggerType'] = triggerType;
                if(triggerValue !== null) serializedParam['triggerValue'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(triggerValue, "STYLE_PIPEDELIMITED", "triggerValue", false);
                const config = {
                    url: self.getUrl(['charts', workbenchId, dataSource, configID, viewcritID, file_type], serializedParam),
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
                        self.logResponse('GET_charts_workbenchId_dataSource_configID_viewcritID_file_type', response);
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
                        self.logResponse('GET_charts_workbenchId_dataSource_configID_viewcritID_file_type', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'workbenchId': workbenchId,
                        'dataSource': dataSource,
                        'configID': configID,
                        'viewcritID': viewcritID,
                        'file_type': file_type,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['charts', workbenchId, dataSource, configID, viewcritID, file_type], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_charts_workbenchId_dataSource_configID_viewcritID_file_type', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_charts_workbenchId_dataSource_configID_viewcritID_file_type', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_charts_workbenchId_dataSource_configID_viewcritID_file_type', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_pivots(callback, workbenchId = null, siteType = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(workbenchId, true, [])) {
                    throw new OpenApiException("Parameter 'workbenchId' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(siteType, true, [])) {
                    throw new OpenApiException("Parameter 'siteType' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(workbenchId !== null) queryParams['workbenchId'] = workbenchId;
                if(siteType !== null) queryParams['siteType'] = siteType;
                const config = {
                    url: self.getUrl(['pivots'], serializedParam),
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
                        self.logResponse('GET_pivots', response);
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
                        self.logResponse('GET_pivots', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['pivots'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_pivots', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_pivots', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_pivots', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_pivots_workbenchId_dataSource_configID_viewcritID_file_type(callback, workbenchId, dataSource, configID, viewcritID, file_type, triggerType = null, triggerValue = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(workbenchId, false, [])) {
                    throw new OpenApiException("Parameter 'workbenchId' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(dataSource, false, [])) {
                    throw new OpenApiException("Parameter 'dataSource' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(configID, false, [])) {
                    throw new OpenApiException("Parameter 'configID' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(viewcritID, false, [])) {
                    throw new OpenApiException("Parameter 'viewcritID' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(file_type, false, [])) {
                    throw new OpenApiException("Parameter 'file_type' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(triggerType, true, [])) {
                    throw new OpenApiException("Parameter 'triggerType' is not a valid number!");
                }
                
                if (!self.verifyParamIsStringArray(triggerValue, true, [])) {
                    throw new OpenApiException("Parameter 'triggerValue' is not a valid string array!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(triggerType !== null) queryParams['triggerType'] = triggerType;
                if(triggerValue !== null) serializedParam['triggerValue'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(triggerValue, "STYLE_PIPEDELIMITED", "triggerValue", false);
                const config = {
                    url: self.getUrl(['pivots', workbenchId, dataSource, configID, viewcritID, file_type], serializedParam),
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
                        self.logResponse('GET_pivots_workbenchId_dataSource_configID_viewcritID_file_type', response);
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
                        self.logResponse('GET_pivots_workbenchId_dataSource_configID_viewcritID_file_type', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'workbenchId': workbenchId,
                        'dataSource': dataSource,
                        'configID': configID,
                        'viewcritID': viewcritID,
                        'file_type': file_type,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['pivots', workbenchId, dataSource, configID, viewcritID, file_type], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_pivots_workbenchId_dataSource_configID_viewcritID_file_type', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_pivots_workbenchId_dataSource_configID_viewcritID_file_type', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_pivots_workbenchId_dataSource_configID_viewcritID_file_type', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
}

export default OpenApiClient_workbench;
