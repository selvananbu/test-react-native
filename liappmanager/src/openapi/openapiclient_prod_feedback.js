import { Component } from 'react';
import axios from 'axios';

import OpenApiClient from './openapiclient';
import OpenApiException from './openapiexception';
import { MimeTypes } from './openapibody';
import OpenApiResponse from './openapiresponse';
import OpenApiClientArrayHelper from './openapiclientarrayhelper';
import { ensureAccessTokenIsValid, directDownloadConfig } from '../lilayoutauthentication/authutil';

var Qs = require('qs');

export const PROD_FEEDBACK_ENTITY_BATCH = "batch";
export const PROD_FEEDBACK_ENTITY_ORDER = "order";
export const PROD_FEEDBACK_ENTITY_UF = "uf";
export const PROD_FEEDBACK_ENTITY_RACK = "rack";
export const PROD_FEEDBACK_ENTITY_OPTIMISATION = "optimisation";
export const PROD_FEEDBACK_ENTITY_DELIVERY = "delivery";
export const PROD_FEEDBACK_READY_UNDO_READY = "ready";
export const PROD_FEEDBACK_READY_UNDO_UNDO = "undo";



class OpenApiClient_prod_feedback extends OpenApiClient {

    constructor(site) {
        super(site, OpenApiClient_prod_feedback.getServiceName());
    }

    static getClient(site) {
        var key = site + "." + OpenApiClient_prod_feedback.getServiceName();
        var service = OpenApiClient.serviceMap.get(key);

        if(service == undefined)
        {
            service = new OpenApiClient_prod_feedback(site);
            OpenApiClient.serviceMap.set(key, service);
        }
        return service;
    }

    static getServiceName() {
        return 'prod_feedback';
    }


    GET_delivery_racks_rackID(callback, rackID, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(rackID, false, [])) {
                    throw new OpenApiException("Parameter 'rackID' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['delivery_racks', rackID], serializedParam),
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
                        self.logResponse('GET_delivery_racks_rackID', response);
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
                        self.logResponse('GET_delivery_racks_rackID', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'rackID': rackID,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['delivery_racks', rackID], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_delivery_racks_rackID', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_delivery_racks_rackID', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_delivery_racks_rackID', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_delivery_racks_rackID_clear(callback, rackID, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(rackID, false, [])) {
                    throw new OpenApiException("Parameter 'rackID' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['delivery_racks', rackID, 'clear'], serializedParam),
                    method: 'patch',
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
                        self.logResponse('PATCH_delivery_racks_rackID_clear', response);
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
                        self.logResponse('PATCH_delivery_racks_rackID_clear', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'rackID': rackID,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['delivery_racks', rackID, 'clear'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_delivery_racks_rackID_clear', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_delivery_racks_rackID_clear', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_delivery_racks_rackID_clear', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_delivery_racks_rackID_location_location(callback, rackID, location, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(rackID, false, [])) {
                    throw new OpenApiException("Parameter 'rackID' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(location, false, [])) {
                    throw new OpenApiException("Parameter 'location' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['delivery_racks', rackID, 'location', location], serializedParam),
                    method: 'patch',
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
                        self.logResponse('PATCH_delivery_racks_rackID_location_location', response);
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
                        self.logResponse('PATCH_delivery_racks_rackID_location_location', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'rackID': rackID,
                        'location': location,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['delivery_racks', rackID, 'location', location], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_delivery_racks_rackID_location_location', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_delivery_racks_rackID_location_location', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_delivery_racks_rackID_location_location', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_delivery_racks_rackID_outgoing(callback, rackID, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(rackID, false, [])) {
                    throw new OpenApiException("Parameter 'rackID' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['delivery_racks', rackID, 'outgoing'], serializedParam),
                    method: 'patch',
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
                        self.logResponse('PATCH_delivery_racks_rackID_outgoing', response);
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
                        self.logResponse('PATCH_delivery_racks_rackID_outgoing', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'rackID': rackID,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['delivery_racks', rackID, 'outgoing'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_delivery_racks_rackID_outgoing', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_delivery_racks_rackID_outgoing', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_delivery_racks_rackID_outgoing', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_delivery_racks_rackID_incoming(callback, rackID, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(rackID, false, [])) {
                    throw new OpenApiException("Parameter 'rackID' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['delivery_racks', rackID, 'incoming'], serializedParam),
                    method: 'patch',
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
                        self.logResponse('PATCH_delivery_racks_rackID_incoming', response);
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
                        self.logResponse('PATCH_delivery_racks_rackID_incoming', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'rackID': rackID,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['delivery_racks', rackID, 'incoming'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_delivery_racks_rackID_incoming', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_delivery_racks_rackID_incoming', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_delivery_racks_rackID_incoming', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_delivery_racks_rackID_print(callback, rackID, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(rackID, false, [])) {
                    throw new OpenApiException("Parameter 'rackID' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['delivery_racks', rackID, 'print'], serializedParam),
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
                        self.logResponse('GET_delivery_racks_rackID_print', response);
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
                        self.logResponse('GET_delivery_racks_rackID_print', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'rackID': rackID,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['delivery_racks', rackID, 'print'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_delivery_racks_rackID_print', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_delivery_racks_rackID_print', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_delivery_racks_rackID_print', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_delivery_racks_rackID_pdf(callback, rackID, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(rackID, false, [])) {
                    throw new OpenApiException("Parameter 'rackID' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['delivery_racks', rackID, 'pdf'], serializedParam),
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
                        self.logResponse('GET_delivery_racks_rackID_pdf', response);
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
                        self.logResponse('GET_delivery_racks_rackID_pdf', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'rackID': rackID,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['delivery_racks', rackID, 'pdf'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_delivery_racks_rackID_pdf', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_delivery_racks_rackID_pdf', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_delivery_racks_rackID_pdf', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_delivery_racks_rackID_add_to_delivery(callback, rackID, deliveryID = null, route = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(rackID, false, [])) {
                    throw new OpenApiException("Parameter 'rackID' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(deliveryID, true, [])) {
                    throw new OpenApiException("Parameter 'deliveryID' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(route, true, [])) {
                    throw new OpenApiException("Parameter 'route' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(deliveryID !== null) queryParams['deliveryID'] = deliveryID;
                if(route !== null) queryParams['route'] = route;
                const config = {
                    url: self.getUrl(['delivery_racks', rackID, 'add_to_delivery'], serializedParam),
                    method: 'patch',
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
                        self.logResponse('PATCH_delivery_racks_rackID_add_to_delivery', response);
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
                        self.logResponse('PATCH_delivery_racks_rackID_add_to_delivery', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'rackID': rackID,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['delivery_racks', rackID, 'add_to_delivery'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_delivery_racks_rackID_add_to_delivery', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_delivery_racks_rackID_add_to_delivery', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_delivery_racks_rackID_add_to_delivery', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_todo_lists(callback, order = null, item = null, barcode = null, batch = null, visualUF = null, deliveryID = null, optimisationID = null, stepID = null, machineID = null, rackID = null, externalBarcode = null, allowOtherMachines = null, chkMissPrevStepRdy = null, loadRemakeMaterial = null, matType = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(order, true, [])) {
                    throw new OpenApiException("Parameter 'order' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(item, true, [])) {
                    throw new OpenApiException("Parameter 'item' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(barcode, true, [])) {
                    throw new OpenApiException("Parameter 'barcode' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(batch, true, [])) {
                    throw new OpenApiException("Parameter 'batch' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(visualUF, true, [])) {
                    throw new OpenApiException("Parameter 'visualUF' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(deliveryID, true, [])) {
                    throw new OpenApiException("Parameter 'deliveryID' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(optimisationID, true, [])) {
                    throw new OpenApiException("Parameter 'optimisationID' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(stepID, true, [])) {
                    throw new OpenApiException("Parameter 'stepID' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(machineID, true, [])) {
                    throw new OpenApiException("Parameter 'machineID' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(rackID, true, [])) {
                    throw new OpenApiException("Parameter 'rackID' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(externalBarcode, true, [])) {
                    throw new OpenApiException("Parameter 'externalBarcode' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(allowOtherMachines, true, [])) {
                    throw new OpenApiException("Parameter 'allowOtherMachines' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(chkMissPrevStepRdy, true, [])) {
                    throw new OpenApiException("Parameter 'chkMissPrevStepRdy' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(loadRemakeMaterial, true, [])) {
                    throw new OpenApiException("Parameter 'loadRemakeMaterial' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(matType, true, [])) {
                    throw new OpenApiException("Parameter 'matType' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(order !== null) queryParams['order'] = order;
                if(item !== null) queryParams['item'] = item;
                if(barcode !== null) queryParams['barcode'] = barcode;
                if(batch !== null) queryParams['batch'] = batch;
                if(visualUF !== null) queryParams['visualUF'] = visualUF;
                if(deliveryID !== null) queryParams['deliveryID'] = deliveryID;
                if(optimisationID !== null) queryParams['optimisationID'] = optimisationID;
                if(stepID !== null) queryParams['stepID'] = stepID;
                if(machineID !== null) queryParams['machineID'] = machineID;
                if(rackID !== null) queryParams['rackID'] = rackID;
                if(externalBarcode !== null) queryParams['externalBarcode'] = externalBarcode;
                if(allowOtherMachines !== null) queryParams['allowOtherMachines'] = allowOtherMachines;
                if(chkMissPrevStepRdy !== null) queryParams['chkMissPrevStepRdy'] = chkMissPrevStepRdy;
                if(loadRemakeMaterial !== null) queryParams['loadRemakeMaterial'] = loadRemakeMaterial;
                if(matType !== null) queryParams['matType'] = matType;
                const config = {
                    url: self.getUrl(['todo_lists'], serializedParam),
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
                        self.logResponse('GET_todo_lists', response);
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
                        self.logResponse('GET_todo_lists', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['todo_lists'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_todo_lists', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_todo_lists', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_todo_lists', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_todo_lists_entity_entityID_worksteps_stepID_ready_undo(callback, entity, entityID, stepID, ready_undo, machineID, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(entity, false, [])) {
                    throw new OpenApiException("Parameter 'entity' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(entityID, false, [])) {
                    throw new OpenApiException("Parameter 'entityID' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(stepID, false, [])) {
                    throw new OpenApiException("Parameter 'stepID' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(ready_undo, false, [])) {
                    throw new OpenApiException("Parameter 'ready_undo' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(machineID, false, [])) {
                    throw new OpenApiException("Parameter 'machineID' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(machineID !== null) queryParams['machineID'] = machineID;
                const config = {
                    url: self.getUrl(['todo_lists', entity, entityID, 'worksteps', stepID, ready_undo], serializedParam),
                    method: 'patch',
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
                        self.logResponse('PATCH_todo_lists_entity_entityID_worksteps_stepID_ready_undo', response);
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
                        self.logResponse('PATCH_todo_lists_entity_entityID_worksteps_stepID_ready_undo', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'entity': entity,
                        'entityID': entityID,
                        'stepID': stepID,
                        'ready_undo': ready_undo,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['todo_lists', entity, entityID, 'worksteps', stepID, ready_undo], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_todo_lists_entity_entityID_worksteps_stepID_ready_undo', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_todo_lists_entity_entityID_worksteps_stepID_ready_undo', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_todo_lists_entity_entityID_worksteps_stepID_ready_undo', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_actuals_entity(callback, entity, machineID, stepID = null, allowOtherMachines = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(entity, false, [])) {
                    throw new OpenApiException("Parameter 'entity' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(machineID, false, [])) {
                    throw new OpenApiException("Parameter 'machineID' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(stepID, true, [])) {
                    throw new OpenApiException("Parameter 'stepID' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(allowOtherMachines, true, [])) {
                    throw new OpenApiException("Parameter 'allowOtherMachines' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(machineID !== null) queryParams['machineID'] = machineID;
                if(stepID !== null) queryParams['stepID'] = stepID;
                if(allowOtherMachines !== null) queryParams['allowOtherMachines'] = allowOtherMachines;
                const config = {
                    url: self.getUrl(['actuals', entity], serializedParam),
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
                        self.logResponse('GET_actuals_entity', response);
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
                        self.logResponse('GET_actuals_entity', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'entity': entity,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['actuals', entity], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_actuals_entity', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_actuals_entity', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_actuals_entity', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_ready(callback, order, item, pane, component, pieceCount, stepID, machineID, rackID = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(order, false, [])) {
                    throw new OpenApiException("Parameter 'order' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(item, false, [])) {
                    throw new OpenApiException("Parameter 'item' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pane, false, [])) {
                    throw new OpenApiException("Parameter 'pane' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(component, false, [])) {
                    throw new OpenApiException("Parameter 'component' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pieceCount, false, [])) {
                    throw new OpenApiException("Parameter 'pieceCount' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(stepID, false, [])) {
                    throw new OpenApiException("Parameter 'stepID' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(machineID, false, [])) {
                    throw new OpenApiException("Parameter 'machineID' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(rackID, true, [])) {
                    throw new OpenApiException("Parameter 'rackID' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(machineID !== null) queryParams['machineID'] = machineID;
                if(rackID !== null) queryParams['rackID'] = rackID;
                const config = {
                    url: self.getUrl(['orders', order, item, pane, component, pieceCount, 'worksteps', stepID, 'ready'], serializedParam),
                    method: 'patch',
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
                        self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_ready', response);
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
                        self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_ready', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'order': order,
                        'item': item,
                        'pane': pane,
                        'component': component,
                        'pieceCount': pieceCount,
                        'stepID': stepID,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['orders', order, item, pane, component, pieceCount, 'worksteps', stepID, 'ready'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_ready', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_ready', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_ready', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_undo(callback, order, item, pane, component, pieceCount, stepID, machineID, rackID = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(order, false, [])) {
                    throw new OpenApiException("Parameter 'order' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(item, false, [])) {
                    throw new OpenApiException("Parameter 'item' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pane, false, [])) {
                    throw new OpenApiException("Parameter 'pane' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(component, false, [])) {
                    throw new OpenApiException("Parameter 'component' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pieceCount, false, [])) {
                    throw new OpenApiException("Parameter 'pieceCount' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(stepID, false, [])) {
                    throw new OpenApiException("Parameter 'stepID' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(machineID, false, [])) {
                    throw new OpenApiException("Parameter 'machineID' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(rackID, true, [])) {
                    throw new OpenApiException("Parameter 'rackID' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(machineID !== null) queryParams['machineID'] = machineID;
                if(rackID !== null) queryParams['rackID'] = rackID;
                const config = {
                    url: self.getUrl(['orders', order, item, pane, component, pieceCount, 'worksteps', stepID, 'undo'], serializedParam),
                    method: 'patch',
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
                        self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_undo', response);
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
                        self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_undo', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'order': order,
                        'item': item,
                        'pane': pane,
                        'component': component,
                        'pieceCount': pieceCount,
                        'stepID': stepID,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['orders', order, item, pane, component, pieceCount, 'worksteps', stepID, 'undo'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_undo', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_undo', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_worksteps_stepID_undo', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_orders_order_item_pane_component_pieceCount_remake_reason(callback, order, item, pane, component, pieceCount, reason, machineID = null, stepID = null, remakePane = null, remakeComponent = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(order, false, [])) {
                    throw new OpenApiException("Parameter 'order' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(item, false, [])) {
                    throw new OpenApiException("Parameter 'item' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pane, false, [])) {
                    throw new OpenApiException("Parameter 'pane' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(component, false, [])) {
                    throw new OpenApiException("Parameter 'component' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pieceCount, false, [])) {
                    throw new OpenApiException("Parameter 'pieceCount' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(reason, false, [])) {
                    throw new OpenApiException("Parameter 'reason' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(machineID, true, [])) {
                    throw new OpenApiException("Parameter 'machineID' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(stepID, true, [])) {
                    throw new OpenApiException("Parameter 'stepID' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(remakePane, true, [])) {
                    throw new OpenApiException("Parameter 'remakePane' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(remakeComponent, true, [])) {
                    throw new OpenApiException("Parameter 'remakeComponent' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(machineID !== null) queryParams['machineID'] = machineID;
                if(stepID !== null) queryParams['stepID'] = stepID;
                if(remakePane !== null) queryParams['remakePane'] = remakePane;
                if(remakeComponent !== null) queryParams['remakeComponent'] = remakeComponent;
                const config = {
                    url: self.getUrl(['orders', order, item, pane, component, pieceCount, 'remake', reason], serializedParam),
                    method: 'patch',
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
                        self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_remake_reason', response);
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
                        self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_remake_reason', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'order': order,
                        'item': item,
                        'pane': pane,
                        'component': component,
                        'pieceCount': pieceCount,
                        'reason': reason,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['orders', order, item, pane, component, pieceCount, 'remake', reason], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_remake_reason', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_remake_reason', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_remake_reason', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_orders_order_item_pane_component_pieceCount_add_quality_check(callback, order, item, pane, component, pieceCount, machineID = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(order, false, [])) {
                    throw new OpenApiException("Parameter 'order' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(item, false, [])) {
                    throw new OpenApiException("Parameter 'item' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pane, false, [])) {
                    throw new OpenApiException("Parameter 'pane' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(component, false, [])) {
                    throw new OpenApiException("Parameter 'component' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pieceCount, false, [])) {
                    throw new OpenApiException("Parameter 'pieceCount' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(machineID, true, [])) {
                    throw new OpenApiException("Parameter 'machineID' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(machineID !== null) queryParams['machineID'] = machineID;
                const config = {
                    url: self.getUrl(['orders', order, item, pane, component, pieceCount, 'add_quality_check'], serializedParam),
                    method: 'patch',
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
                        self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_add_quality_check', response);
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
                        self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_add_quality_check', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'order': order,
                        'item': item,
                        'pane': pane,
                        'component': component,
                        'pieceCount': pieceCount,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['orders', order, item, pane, component, pieceCount, 'add_quality_check'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_add_quality_check', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_add_quality_check', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_add_quality_check', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_orders_order_item_pane_component_pieceCount_remove_quality_check(callback, order, item, pane, component, pieceCount, machineID = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(order, false, [])) {
                    throw new OpenApiException("Parameter 'order' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(item, false, [])) {
                    throw new OpenApiException("Parameter 'item' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pane, false, [])) {
                    throw new OpenApiException("Parameter 'pane' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(component, false, [])) {
                    throw new OpenApiException("Parameter 'component' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pieceCount, false, [])) {
                    throw new OpenApiException("Parameter 'pieceCount' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(machineID, true, [])) {
                    throw new OpenApiException("Parameter 'machineID' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(machineID !== null) queryParams['machineID'] = machineID;
                const config = {
                    url: self.getUrl(['orders', order, item, pane, component, pieceCount, 'remove_quality_check'], serializedParam),
                    method: 'patch',
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
                        self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_remove_quality_check', response);
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
                        self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_remove_quality_check', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'order': order,
                        'item': item,
                        'pane': pane,
                        'component': component,
                        'pieceCount': pieceCount,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['orders', order, item, pane, component, pieceCount, 'remove_quality_check'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_remove_quality_check', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_remove_quality_check', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_remove_quality_check', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_orders_order_item_pane_component_pieceCount_assign_rack(callback, order, item, pane, component, pieceCount, rackID, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(order, false, [])) {
                    throw new OpenApiException("Parameter 'order' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(item, false, [])) {
                    throw new OpenApiException("Parameter 'item' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pane, false, [])) {
                    throw new OpenApiException("Parameter 'pane' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(component, false, [])) {
                    throw new OpenApiException("Parameter 'component' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pieceCount, false, [])) {
                    throw new OpenApiException("Parameter 'pieceCount' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(rackID, false, [])) {
                    throw new OpenApiException("Parameter 'rackID' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(rackID !== null) queryParams['rackID'] = rackID;
                const config = {
                    url: self.getUrl(['orders', order, item, pane, component, pieceCount, 'assign_rack'], serializedParam),
                    method: 'patch',
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
                        self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_assign_rack', response);
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
                        self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_assign_rack', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'order': order,
                        'item': item,
                        'pane': pane,
                        'component': component,
                        'pieceCount': pieceCount,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['orders', order, item, pane, component, pieceCount, 'assign_rack'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_assign_rack', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_assign_rack', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_orders_order_item_pane_component_pieceCount_assign_rack', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_orders_order_item_pieceCount_add_to_delivery(callback, order, item, pieceCount, deliveryID = null, route = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(order, false, [])) {
                    throw new OpenApiException("Parameter 'order' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(item, false, [])) {
                    throw new OpenApiException("Parameter 'item' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pieceCount, false, [])) {
                    throw new OpenApiException("Parameter 'pieceCount' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(deliveryID, true, [])) {
                    throw new OpenApiException("Parameter 'deliveryID' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(route, true, [])) {
                    throw new OpenApiException("Parameter 'route' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(deliveryID !== null) queryParams['deliveryID'] = deliveryID;
                if(route !== null) queryParams['route'] = route;
                const config = {
                    url: self.getUrl(['orders', order, item, pieceCount, 'add_to_delivery'], serializedParam),
                    method: 'patch',
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
                        self.logResponse('PATCH_orders_order_item_pieceCount_add_to_delivery', response);
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
                        self.logResponse('PATCH_orders_order_item_pieceCount_add_to_delivery', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'order': order,
                        'item': item,
                        'pieceCount': pieceCount,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['orders', order, item, pieceCount, 'add_to_delivery'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_orders_order_item_pieceCount_add_to_delivery', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_orders_order_item_pieceCount_add_to_delivery', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_orders_order_item_pieceCount_add_to_delivery', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_delivery_lists(callback, route, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(route, false, [])) {
                    throw new OpenApiException("Parameter 'route' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(route !== null) queryParams['route'] = route;
                const config = {
                    url: self.getUrl(['delivery_lists'], serializedParam),
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
                        self.logResponse('GET_delivery_lists', response);
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
                        self.logResponse('GET_delivery_lists', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['delivery_lists'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_delivery_lists', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_delivery_lists', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_delivery_lists', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    POST_delivery_lists(callback, route, stock = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(route, false, [])) {
                    throw new OpenApiException("Parameter 'route' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(stock, true, [])) {
                    throw new OpenApiException("Parameter 'stock' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(route !== null) queryParams['route'] = route;
                if(stock !== null) queryParams['stock'] = stock;
                const config = {
                    url: self.getUrl(['delivery_lists'], serializedParam),
                    method: 'post',
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
                        self.logResponse('POST_delivery_lists', response);
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
                        self.logResponse('POST_delivery_lists', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['delivery_lists'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('POST_delivery_lists', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('POST_delivery_lists', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('POST_delivery_lists', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_delivery_lists_deliveryID(callback, deliveryID, route = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(deliveryID, false, [])) {
                    throw new OpenApiException("Parameter 'deliveryID' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(route, true, [])) {
                    throw new OpenApiException("Parameter 'route' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(route !== null) queryParams['route'] = route;
                const config = {
                    url: self.getUrl(['delivery_lists', deliveryID], serializedParam),
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
                        self.logResponse('GET_delivery_lists_deliveryID', response);
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
                        self.logResponse('GET_delivery_lists_deliveryID', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'deliveryID': deliveryID,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['delivery_lists', deliveryID], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_delivery_lists_deliveryID', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_delivery_lists_deliveryID', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_delivery_lists_deliveryID', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_delivery_lists_deliveryID_clear(callback, deliveryID, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(deliveryID, false, [])) {
                    throw new OpenApiException("Parameter 'deliveryID' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['delivery_lists', deliveryID, 'clear'], serializedParam),
                    method: 'patch',
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
                        self.logResponse('PATCH_delivery_lists_deliveryID_clear', response);
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
                        self.logResponse('PATCH_delivery_lists_deliveryID_clear', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'deliveryID': deliveryID,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['delivery_lists', deliveryID, 'clear'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_delivery_lists_deliveryID_clear', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_delivery_lists_deliveryID_clear', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_delivery_lists_deliveryID_clear', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_delivery_lists_deliveryID_outgoing(callback, deliveryID, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(deliveryID, false, [])) {
                    throw new OpenApiException("Parameter 'deliveryID' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['delivery_lists', deliveryID, 'outgoing'], serializedParam),
                    method: 'patch',
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
                        self.logResponse('PATCH_delivery_lists_deliveryID_outgoing', response);
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
                        self.logResponse('PATCH_delivery_lists_deliveryID_outgoing', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'deliveryID': deliveryID,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['delivery_lists', deliveryID, 'outgoing'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_delivery_lists_deliveryID_outgoing', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_delivery_lists_deliveryID_outgoing', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_delivery_lists_deliveryID_outgoing', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_delivery_lists_deliveryID_print(callback, deliveryID, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(deliveryID, false, [])) {
                    throw new OpenApiException("Parameter 'deliveryID' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['delivery_lists', deliveryID, 'print'], serializedParam),
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
                        self.logResponse('GET_delivery_lists_deliveryID_print', response);
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
                        self.logResponse('GET_delivery_lists_deliveryID_print', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'deliveryID': deliveryID,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['delivery_lists', deliveryID, 'print'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_delivery_lists_deliveryID_print', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_delivery_lists_deliveryID_print', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_delivery_lists_deliveryID_print', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_delivery_lists_deliveryID_pdf(callback, deliveryID, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(deliveryID, false, [])) {
                    throw new OpenApiException("Parameter 'deliveryID' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['delivery_lists', deliveryID, 'pdf'], serializedParam),
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
                        self.logResponse('GET_delivery_lists_deliveryID_pdf', response);
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
                        self.logResponse('GET_delivery_lists_deliveryID_pdf', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'deliveryID': deliveryID,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['delivery_lists', deliveryID, 'pdf'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_delivery_lists_deliveryID_pdf', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_delivery_lists_deliveryID_pdf', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_delivery_lists_deliveryID_pdf', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_reason_codes(callback, group_no = null, station_key = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(group_no, true, [])) {
                    throw new OpenApiException("Parameter 'group_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(station_key, true, [])) {
                    throw new OpenApiException("Parameter 'station_key' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(group_no !== null) queryParams['group_no'] = group_no;
                if(station_key !== null) queryParams['station_key'] = station_key;
                const config = {
                    url: self.getUrl(['reason_codes'], serializedParam),
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
                        self.logResponse('GET_reason_codes', response);
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
                        self.logResponse('GET_reason_codes', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['reason_codes'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_reason_codes', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_reason_codes', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_reason_codes', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_materials(callback, mat_type = null, mat_id = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(mat_type, true, [])) {
                    throw new OpenApiException("Parameter 'mat_type' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(mat_id, true, [])) {
                    throw new OpenApiException("Parameter 'mat_id' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(mat_type !== null) queryParams['mat_type'] = mat_type;
                if(mat_id !== null) queryParams['mat_id'] = mat_id;
                const config = {
                    url: self.getUrl(['materials'], serializedParam),
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
                        self.logResponse('GET_materials', response);
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
                        self.logResponse('GET_materials', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['materials'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_materials', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_materials', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_materials', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_materials_mat_barcode(callback, mat_barcode, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(mat_barcode, false, [])) {
                    throw new OpenApiException("Parameter 'mat_barcode' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['materials', mat_barcode], serializedParam),
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
                        self.logResponse('GET_materials_mat_barcode', response);
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
                        self.logResponse('GET_materials_mat_barcode', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'mat_barcode': mat_barcode,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['materials', mat_barcode], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_materials_mat_barcode', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_materials_mat_barcode', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_materials_mat_barcode', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_materials_mat_barcode_emptied(callback, mat_barcode, stock_name = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(mat_barcode, false, [])) {
                    throw new OpenApiException("Parameter 'mat_barcode' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(stock_name, true, [])) {
                    throw new OpenApiException("Parameter 'stock_name' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(stock_name !== null) queryParams['stock_name'] = stock_name;
                const config = {
                    url: self.getUrl(['materials', mat_barcode, 'emptied'], serializedParam),
                    method: 'patch',
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
                        self.logResponse('PATCH_materials_mat_barcode_emptied', response);
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
                        self.logResponse('PATCH_materials_mat_barcode_emptied', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'mat_barcode': mat_barcode,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['materials', mat_barcode, 'emptied'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_materials_mat_barcode_emptied', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_materials_mat_barcode_emptied', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_materials_mat_barcode_emptied', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_machines_machineID_materials(callback, machineID, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(machineID, false, [])) {
                    throw new OpenApiException("Parameter 'machineID' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['machines', machineID, 'materials'], serializedParam),
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
                        self.logResponse('GET_machines_machineID_materials', response);
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
                        self.logResponse('GET_machines_machineID_materials', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'machineID': machineID,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['machines', machineID, 'materials'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_machines_machineID_materials', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_machines_machineID_materials', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_machines_machineID_materials', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PUT_machines_machineID_materials(callback, body, machineID, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                if (!self.verifyParamIsInteger(machineID, false, [])) {
                    throw new OpenApiException("Parameter 'machineID' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['machines', machineID, 'materials'], serializedParam),
                    method: 'put',
                    data: body.getContent(),
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
                        self.logResponse('PUT_machines_machineID_materials', response);
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
                        self.logResponse('PUT_machines_machineID_materials', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'machineID': machineID,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['machines', machineID, 'materials'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PUT_machines_machineID_materials', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PUT_machines_machineID_materials', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PUT_machines_machineID_materials', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_transport_loads(callback, deliv_area = null, transport_id = null, days = null, weeks = null, months = null, max_count = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(deliv_area, true, [])) {
                    throw new OpenApiException("Parameter 'deliv_area' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(transport_id, true, [])) {
                    throw new OpenApiException("Parameter 'transport_id' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(days, true, [])) {
                    throw new OpenApiException("Parameter 'days' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(weeks, true, [])) {
                    throw new OpenApiException("Parameter 'weeks' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(months, true, [])) {
                    throw new OpenApiException("Parameter 'months' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(max_count, true, [])) {
                    throw new OpenApiException("Parameter 'max_count' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(deliv_area !== null) queryParams['deliv_area'] = deliv_area;
                if(transport_id !== null) queryParams['transport_id'] = transport_id;
                if(days !== null) queryParams['days'] = days;
                if(weeks !== null) queryParams['weeks'] = weeks;
                if(months !== null) queryParams['months'] = months;
                if(max_count !== null) queryParams['max_count'] = max_count;
                const config = {
                    url: self.getUrl(['transport_loads'], serializedParam),
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
                        self.logResponse('GET_transport_loads', response);
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
                        self.logResponse('GET_transport_loads', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['transport_loads'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_transport_loads', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_transport_loads', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_transport_loads', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    POST_transport_loads(callback, body, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['transport_loads'], serializedParam),
                    method: 'post',
                    data: body.getContent(),
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
                        self.logResponse('POST_transport_loads', response);
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
                        self.logResponse('POST_transport_loads', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['transport_loads'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('POST_transport_loads', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('POST_transport_loads', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('POST_transport_loads', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_transport_loads(callback, body, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['transport_loads'], serializedParam),
                    method: 'patch',
                    data: body.getContent(),
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
                        self.logResponse('PATCH_transport_loads', response);
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
                        self.logResponse('PATCH_transport_loads', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['transport_loads'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_transport_loads', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_transport_loads', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_transport_loads', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_transport_loads_load_id(callback, load_id, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(load_id, false, [])) {
                    throw new OpenApiException("Parameter 'load_id' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['transport_loads', load_id], serializedParam),
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
                        self.logResponse('GET_transport_loads_load_id', response);
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
                        self.logResponse('GET_transport_loads_load_id', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'load_id': load_id,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['transport_loads', load_id], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_transport_loads_load_id', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_transport_loads_load_id', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_transport_loads_load_id', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    DELETE_transport_loads_load_id(callback, load_id, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(load_id, false, [])) {
                    throw new OpenApiException("Parameter 'load_id' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['transport_loads', load_id], serializedParam),
                    method: 'delete',
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
                        self.logResponse('DELETE_transport_loads_load_id', response);
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
                        self.logResponse('DELETE_transport_loads_load_id', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'load_id': load_id,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['transport_loads', load_id], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('DELETE_transport_loads_load_id', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('DELETE_transport_loads_load_id', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('DELETE_transport_loads_load_id', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_transport_vehicles(callback, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['transport_vehicles'], serializedParam),
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
                        self.logResponse('GET_transport_vehicles', response);
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
                        self.logResponse('GET_transport_vehicles', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['transport_vehicles'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_transport_vehicles', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_transport_vehicles', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_transport_vehicles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_transport_racks(callback, deliv_area = null, max_count = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(deliv_area, true, [])) {
                    throw new OpenApiException("Parameter 'deliv_area' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(max_count, true, [])) {
                    throw new OpenApiException("Parameter 'max_count' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(deliv_area !== null) queryParams['deliv_area'] = deliv_area;
                if(max_count !== null) queryParams['max_count'] = max_count;
                const config = {
                    url: self.getUrl(['transport_racks'], serializedParam),
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
                        self.logResponse('GET_transport_racks', response);
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
                        self.logResponse('GET_transport_racks', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['transport_racks'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_transport_racks', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_transport_racks', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_transport_racks', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
}

export default OpenApiClient_prod_feedback;
