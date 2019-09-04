import { Component } from 'react';
import axios from 'axios';

import OpenApiClient from './openapiclient';
import OpenApiException from './openapiexception';
import { MimeTypes } from './openapibody';
import OpenApiResponse from './openapiresponse';
import OpenApiClientArrayHelper from './openapiclientarrayhelper';
import { ensureAccessTokenIsValid, directDownloadConfig } from '../lilayoutauthentication/authutil';

var Qs = require('qs');

export const PROD_VIEW_DATA_TYPE_SVG = "svg";
export const PROD_VIEW_DATA_TYPE_TABLE = "table";
export const PROD_VIEW_DATA_TYPE_XLSX = "xlsx";
export const PROD_VIEW_DATE_MODE_DELIVERY = "Delivery";
export const PROD_VIEW_DATE_MODE_BATCHPLANNED = "BatchPlanned";
export const PROD_VIEW_DATE_MODE_IGCAPA = "IGCapa";
export const PROD_VIEW_DATE_MODE_CUTCAPA = "CutCapa";
export const PROD_VIEW_PREPROD_STATE_WHATEVER = "Whatever";
export const PROD_VIEW_PREPROD_STATE_CUTTINGSTARTEDONLY = "CuttingStartedOnly";
export const PROD_VIEW_PREPROD_STATE_CUTTINGNOTSTARTEDONLY = "CuttingNotStartedOnly";
export const PROD_VIEW_PREPROD_STATE_CUTTINGNOTFINISHEDONLY = "CuttingNotFinishedOnly";
export const PROD_VIEW_PREPROD_STATE_ALLREADY = "AllReady";
export const PROD_VIEW_PREPROD_STATE_SPACERMISSINGONLY = "SpacerMissingOnly";
export const PROD_VIEW_PREPROD_STATE_GEORGIANMISSING = "GeorgianMissing";
export const PROD_VIEW_PREPROD_STATE_NOTPRODUCEDCOMPLETELY = "NotProducedCompletely";
export const PROD_VIEW_VIEWPOINT_OVERVIEWIG = "OverviewIG";
export const PROD_VIEW_VIEWPOINT_DETAILSIG = "DetailsIG";
export const PROD_VIEW_VIEWPOINT_OVERVIEWBENDER = "OverviewBender";
export const PROD_VIEW_VIEWPOINT_DETAILSBENDER = "DetailsBender";
export const PROD_VIEW_VIEWPOINT_OVERVIEWCUTTING = "OverviewCutting";
export const PROD_VIEW_VIEWPOINT_DETAILSCUTTING = "DetailsCutting";
export const PROD_VIEW_VIEWPOINT_OVERVIEWASM = "OverviewASM";
export const PROD_VIEW_VIEWPOINT_DETAILSASM = "DetailsASM";
export const PROD_VIEW_VIEWPOINT_AVAILABLEIGINASM = "AvailableIGinASM";



class OpenApiClient_prod_view extends OpenApiClient {

    constructor(site) {
        super(site, OpenApiClient_prod_view.getServiceName());
    }

    static getClient(site) {
        var key = site + "." + OpenApiClient_prod_view.getServiceName();
        var service = OpenApiClient.serviceMap.get(key);

        if(service == undefined)
        {
            service = new OpenApiClient_prod_view(site);
            OpenApiClient.serviceMap.set(key, service);
        }
        return service;
    }

    static getServiceName() {
        return 'prod_view';
    }


    GET_machine_parts(callback, machineID = null, alarm_only = null, offline_only = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(machineID, true, [])) {
                    throw new OpenApiException("Parameter 'machineID' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(alarm_only, true, [])) {
                    throw new OpenApiException("Parameter 'alarm_only' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(offline_only, true, [])) {
                    throw new OpenApiException("Parameter 'offline_only' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(machineID !== null) queryParams['machineID'] = machineID;
                if(alarm_only !== null) queryParams['alarm_only'] = alarm_only;
                if(offline_only !== null) queryParams['offline_only'] = offline_only;
                const config = {
                    url: self.getUrl(['machine_parts'], serializedParam),
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
                        self.logResponse('GET_machine_parts', response);
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
                        self.logResponse('GET_machine_parts', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['machine_parts'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_machine_parts', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_machine_parts', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_machine_parts', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_machine_parts_machineID_part_now(callback, machineID, part, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(machineID, false, [])) {
                    throw new OpenApiException("Parameter 'machineID' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(part, false, [])) {
                    throw new OpenApiException("Parameter 'part' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['machine_parts', machineID, part, 'now'], serializedParam),
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
                        self.logResponse('GET_machine_parts_machineID_part_now', response);
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
                        self.logResponse('GET_machine_parts_machineID_part_now', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'machineID': machineID,
                        'part': part,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['machine_parts', machineID, part, 'now'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_machine_parts_machineID_part_now', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_machine_parts_machineID_part_now', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_machine_parts_machineID_part_now', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_machine_parts_machineID_part_gauges_data_type(callback, machineID, part, data_type, gauge_name, from_timestamp = null, to_timestamp = null, show_3d = null, show_legend = null, show_own_axis = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(machineID, false, [])) {
                    throw new OpenApiException("Parameter 'machineID' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(part, false, [])) {
                    throw new OpenApiException("Parameter 'part' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(data_type, false, [])) {
                    throw new OpenApiException("Parameter 'data_type' is not a valid string!");
                }
                
                if (!self.verifyParamIsStringArray(gauge_name, false, [])) {
                    throw new OpenApiException("Parameter 'gauge_name' is not a valid string array!");
                }
                
                if (!self.verifyParamIsString(from_timestamp, true, [])) {
                    throw new OpenApiException("Parameter 'from_timestamp' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(to_timestamp, true, [])) {
                    throw new OpenApiException("Parameter 'to_timestamp' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(show_3d, true, [])) {
                    throw new OpenApiException("Parameter 'show_3d' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(show_legend, true, [])) {
                    throw new OpenApiException("Parameter 'show_legend' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(show_own_axis, true, [])) {
                    throw new OpenApiException("Parameter 'show_own_axis' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(gauge_name !== null) serializedParam['gauge_name'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(gauge_name, "STYLE_PIPEDELIMITED", "gauge_name", false);
                if(from_timestamp !== null) queryParams['from_timestamp'] = from_timestamp;
                if(to_timestamp !== null) queryParams['to_timestamp'] = to_timestamp;
                if(show_3d !== null) queryParams['show_3d'] = show_3d;
                if(show_legend !== null) queryParams['show_legend'] = show_legend;
                if(show_own_axis !== null) queryParams['show_own_axis'] = show_own_axis;
                const config = {
                    url: self.getUrl(['machine_parts', machineID, part, 'gauges', data_type], serializedParam),
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
                        self.logResponse('GET_machine_parts_machineID_part_gauges_data_type', response);
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
                        self.logResponse('GET_machine_parts_machineID_part_gauges_data_type', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'machineID': machineID,
                        'part': part,
                        'data_type': data_type,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['machine_parts', machineID, part, 'gauges', data_type], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_machine_parts_machineID_part_gauges_data_type', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_machine_parts_machineID_part_gauges_data_type', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_machine_parts_machineID_part_gauges_data_type', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_machine_parts_machineID_part_outstanding_maintenances_data_type(callback, machineID, part, data_type, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(machineID, false, [])) {
                    throw new OpenApiException("Parameter 'machineID' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(part, false, [])) {
                    throw new OpenApiException("Parameter 'part' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(data_type, false, [])) {
                    throw new OpenApiException("Parameter 'data_type' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['machine_parts', machineID, part, 'outstanding_maintenances', data_type], serializedParam),
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
                        self.logResponse('GET_machine_parts_machineID_part_outstanding_maintenances_data_type', response);
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
                        self.logResponse('GET_machine_parts_machineID_part_outstanding_maintenances_data_type', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'machineID': machineID,
                        'part': part,
                        'data_type': data_type,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['machine_parts', machineID, part, 'outstanding_maintenances', data_type], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_machine_parts_machineID_part_outstanding_maintenances_data_type', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_machine_parts_machineID_part_outstanding_maintenances_data_type', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_machine_parts_machineID_part_outstanding_maintenances_data_type', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_machine_parts_machineID_part_day_counts_data_type(callback, machineID, part, data_type, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(machineID, false, [])) {
                    throw new OpenApiException("Parameter 'machineID' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(part, false, [])) {
                    throw new OpenApiException("Parameter 'part' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(data_type, false, [])) {
                    throw new OpenApiException("Parameter 'data_type' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['machine_parts', machineID, part, 'day_counts', data_type], serializedParam),
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
                        self.logResponse('GET_machine_parts_machineID_part_day_counts_data_type', response);
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
                        self.logResponse('GET_machine_parts_machineID_part_day_counts_data_type', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'machineID': machineID,
                        'part': part,
                        'data_type': data_type,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['machine_parts', machineID, part, 'day_counts', data_type], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_machine_parts_machineID_part_day_counts_data_type', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_machine_parts_machineID_part_day_counts_data_type', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_machine_parts_machineID_part_day_counts_data_type', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_gauge_texts_langID3(callback, langID3, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(langID3, false, [])) {
                    throw new OpenApiException("Parameter 'langID3' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['gauge_texts', langID3], serializedParam),
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
                        self.logResponse('GET_gauge_texts_langID3', response);
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
                        self.logResponse('GET_gauge_texts_langID3', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'langID3': langID3,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['gauge_texts', langID3], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_gauge_texts_langID3', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_gauge_texts_langID3', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_gauge_texts_langID3', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_prod_view_layouts(callback, machineID = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(machineID, true, [])) {
                    throw new OpenApiException("Parameter 'machineID' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(machineID !== null) queryParams['machineID'] = machineID;
                const config = {
                    url: self.getUrl(['prod_view_layouts'], serializedParam),
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
                        self.logResponse('GET_prod_view_layouts', response);
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
                        self.logResponse('GET_prod_view_layouts', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['prod_view_layouts'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_prod_view_layouts', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_prod_view_layouts', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_prod_view_layouts', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_prod_view_layouts_layoutID(callback, layoutID, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(layoutID, false, [])) {
                    throw new OpenApiException("Parameter 'layoutID' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['prod_view_layouts', layoutID], serializedParam),
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
                        self.logResponse('GET_prod_view_layouts_layoutID', response);
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
                        self.logResponse('GET_prod_view_layouts_layoutID', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'layoutID': layoutID,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['prod_view_layouts', layoutID], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_prod_view_layouts_layoutID', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_prod_view_layouts_layoutID', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_prod_view_layouts_layoutID', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_control_center_viewpoints_viewpoint(callback, viewpoint, from_timestamp = null, to_timestamp = null, line_number = null, batch = null, preprod_state = null, date_mode = null, order = null, group_plan_mode = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(viewpoint, false, [])) {
                    throw new OpenApiException("Parameter 'viewpoint' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(from_timestamp, true, [])) {
                    throw new OpenApiException("Parameter 'from_timestamp' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(to_timestamp, true, [])) {
                    throw new OpenApiException("Parameter 'to_timestamp' is not a valid string!");
                }
                
                if (!self.verifyParamIsIntegerArray(line_number, true, [])) {
                    throw new OpenApiException("Parameter 'line_number' is not a valid integer array!");
                }
                
                if (!self.verifyParamIsIntegerArray(batch, true, [])) {
                    throw new OpenApiException("Parameter 'batch' is not a valid integer array!");
                }
                
                if (!self.verifyParamIsString(preprod_state, true, [])) {
                    throw new OpenApiException("Parameter 'preprod_state' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(date_mode, true, [])) {
                    throw new OpenApiException("Parameter 'date_mode' is not a valid string!");
                }
                
                if (!self.verifyParamIsIntegerArray(order, true, [])) {
                    throw new OpenApiException("Parameter 'order' is not a valid integer array!");
                }
                
                if (!self.verifyParamIsInteger(group_plan_mode, true, [])) {
                    throw new OpenApiException("Parameter 'group_plan_mode' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(from_timestamp !== null) queryParams['from_timestamp'] = from_timestamp;
                if(to_timestamp !== null) queryParams['to_timestamp'] = to_timestamp;
                if(line_number !== null) serializedParam['line_number'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(line_number, "STYLE_PIPEDELIMITED", "line_number", false);
                if(batch !== null) serializedParam['batch'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(batch, "STYLE_PIPEDELIMITED", "batch", false);
                if(preprod_state !== null) queryParams['preprod_state'] = preprod_state;
                if(date_mode !== null) queryParams['date_mode'] = date_mode;
                if(order !== null) serializedParam['order'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(order, "STYLE_PIPEDELIMITED", "order", false);
                if(group_plan_mode !== null) queryParams['group_plan_mode'] = group_plan_mode;
                const config = {
                    url: self.getUrl(['control_center_viewpoints', viewpoint], serializedParam),
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
                        self.logResponse('GET_control_center_viewpoints_viewpoint', response);
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
                        self.logResponse('GET_control_center_viewpoints_viewpoint', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'viewpoint': viewpoint,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['control_center_viewpoints', viewpoint], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_control_center_viewpoints_viewpoint', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_control_center_viewpoints_viewpoint', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_control_center_viewpoints_viewpoint', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_control_center_layouts(callback, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['control_center_layouts'], serializedParam),
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
                        self.logResponse('GET_control_center_layouts', response);
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
                        self.logResponse('GET_control_center_layouts', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['control_center_layouts'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_control_center_layouts', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_control_center_layouts', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_control_center_layouts', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
}

export default OpenApiClient_prod_view;
