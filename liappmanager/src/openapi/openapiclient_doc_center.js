import { Component } from 'react';
import axios from 'axios';

import OpenApiClient from './openapiclient';
import OpenApiException from './openapiexception';
import { MimeTypes } from './openapibody';
import OpenApiResponse from './openapiresponse';
import OpenApiClientArrayHelper from './openapiclientarrayhelper';
import { ensureAccessTokenIsValid, directDownloadConfig } from '../lilayoutauthentication/authutil';

var Qs = require('qs');

export const DOC_CENTER_FILE_MODE_CURRENT = "current";
export const DOC_CENTER_FILE_MODE_DELETED = "deleted";
export const DOC_CENTER_FILE_MODE_ALL = "all";
export const DOC_CENTER_FILE_TYPE_SFT_UNKNOWN = "SFT_UNKNOWN";
export const DOC_CENTER_FILE_TYPE_SFT_DECISION_TREE = "SFT_DECISION_TREE";
export const DOC_CENTER_FILE_TYPE_SFT_NCR_DEFAULT = "SFT_NCR_DEFAULT";
export const DOC_CENTER_FILE_TYPE_SFT_NCR_USER = "SFT_NCR_USER";
export const DOC_CENTER_FILE_TYPE_SFT_NCR_GLOBAL = "SFT_NCR_GLOBAL";
export const DOC_CENTER_FILE_TYPE_SFT_PROD_VIEW_LAYOUT_PROD = "SFT_PROD_VIEW_LAYOUT_PROD";
export const DOC_CENTER_FILE_TYPE_SFT_PROD_VIEW_LAYOUT_ORDER = "SFT_PROD_VIEW_LAYOUT_ORDER";
export const DOC_CENTER_FILE_TYPE_SFT_PROD_VIEW_LAYOUT_AUTOFAB = "SFT_PROD_VIEW_LAYOUT_AUTOFAB";
export const DOC_CENTER_FILE_TYPE_SFT_CHART_CONFIG_GLOBAL = "SFT_CHART_CONFIG_GLOBAL";
export const DOC_CENTER_FILE_TYPE_SFT_PRODSCHEDULE_CONFIG = "SFT_PRODSCHEDULE_CONFIG";
export const DOC_CENTER_FILE_TYPE_SFT_PIVOT_CONFIG_GLOBAL = "SFT_PIVOT_CONFIG_GLOBAL";
export const DOC_CENTER_FILE_TYPE_SFT_USER_AVATAR = "SFT_USER_AVATAR";
export const DOC_CENTER_FILE_TYPE_SFT_PROD_VIEW_DEFAULT_BACKGROUND = "SFT_PROD_VIEW_DEFAULT_BACKGROUND";
export const DOC_CENTER_FILE_TYPE_SFT_LISPRODUCT_HELP = "SFT_LISPRODUCT_HELP";
export const DOC_CENTER_FILE_TYPE_SFT_PROD_VIEW_LAYOUT_COCKPIT_LINEMONITOR = "SFT_PROD_VIEW_LAYOUT_COCKPIT_LINEMONITOR";
export const DOC_CENTER_FILE_TYPE_SFT_PROCESSING_VG = "SFT_PROCESSING_VG";
export const DOC_CENTER_FILE_TYPE_SFT_PROCESSING_GRAPHICS = "SFT_PROCESSING_GRAPHICS";



class OpenApiClient_doc_center extends OpenApiClient {

    constructor(site) {
        super(site, OpenApiClient_doc_center.getServiceName());
    }

    static getClient(site) {
        var key = site + "." + OpenApiClient_doc_center.getServiceName();
        var service = OpenApiClient.serviceMap.get(key);

        if(service == undefined)
        {
            service = new OpenApiClient_doc_center(site);
            OpenApiClient.serviceMap.set(key, service);
        }
        return service;
    }

    static getServiceName() {
        return 'doc_center';
    }


    GET_doc_types(callback, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['doc_types'], serializedParam),
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
                        self.logResponse('GET_doc_types', response);
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
                        self.logResponse('GET_doc_types', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['doc_types'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_doc_types', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_doc_types', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_doc_types', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_documents_doc_type(callback, doc_type, pattern = null, age = null, descr_pattern = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(doc_type, false, [])) {
                    throw new OpenApiException("Parameter 'doc_type' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(pattern, true, [])) {
                    throw new OpenApiException("Parameter 'pattern' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(age, true, [])) {
                    throw new OpenApiException("Parameter 'age' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(descr_pattern, true, [])) {
                    throw new OpenApiException("Parameter 'descr_pattern' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(pattern !== null) queryParams['pattern'] = pattern;
                if(age !== null) queryParams['age'] = age;
                if(descr_pattern !== null) queryParams['descr_pattern'] = descr_pattern;
                const config = {
                    url: self.getUrl(['documents', doc_type], serializedParam),
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
                        self.logResponse('GET_documents_doc_type', response);
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
                        self.logResponse('GET_documents_doc_type', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'doc_type': doc_type,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['documents', doc_type], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_documents_doc_type', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_documents_doc_type', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_documents_doc_type', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    POST_documents_doc_type(callback, body, doc_type, key_value, description = null, filename = null, purpose = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(doc_type, false, [])) {
                    throw new OpenApiException("Parameter 'doc_type' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(key_value, false, [])) {
                    throw new OpenApiException("Parameter 'key_value' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(description, true, [])) {
                    throw new OpenApiException("Parameter 'description' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(filename, true, [])) {
                    throw new OpenApiException("Parameter 'filename' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(purpose, true, [])) {
                    throw new OpenApiException("Parameter 'purpose' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                if(key_value !== null) queryParams['key_value'] = key_value;
                if(description !== null) queryParams['description'] = description;
                if(filename !== null) queryParams['filename'] = filename;
                if(purpose !== null) queryParams['purpose'] = purpose;
                const config = {
                    url: self.getUrl(['documents', doc_type], serializedParam),
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
                        self.logResponse('POST_documents_doc_type', response);
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
                        self.logResponse('POST_documents_doc_type', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'doc_type': doc_type,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['documents', doc_type], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('POST_documents_doc_type', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('POST_documents_doc_type', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('POST_documents_doc_type', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_documents_doc_type_doc_id_content(callback, doc_type, doc_id, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(doc_type, false, [])) {
                    throw new OpenApiException("Parameter 'doc_type' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(doc_id, false, [])) {
                    throw new OpenApiException("Parameter 'doc_id' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['documents', doc_type, doc_id, 'content'], serializedParam),
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
                        self.logResponse('GET_documents_doc_type_doc_id_content', response);
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
                        self.logResponse('GET_documents_doc_type_doc_id_content', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'doc_type': doc_type,
                        'doc_id': doc_id,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['documents', doc_type, doc_id, 'content'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_documents_doc_type_doc_id_content', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_documents_doc_type_doc_id_content', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_documents_doc_type_doc_id_content', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    DELETE_documents_doc_type_doc_id(callback, doc_type, doc_id, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(doc_type, false, [])) {
                    throw new OpenApiException("Parameter 'doc_type' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(doc_id, false, [])) {
                    throw new OpenApiException("Parameter 'doc_id' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['documents', doc_type, doc_id], serializedParam),
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
                        self.logResponse('DELETE_documents_doc_type_doc_id', response);
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
                        self.logResponse('DELETE_documents_doc_type_doc_id', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'doc_type': doc_type,
                        'doc_id': doc_id,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['documents', doc_type, doc_id], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('DELETE_documents_doc_type_doc_id', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('DELETE_documents_doc_type_doc_id', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('DELETE_documents_doc_type_doc_id', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_config_files_file_type(callback, file_type, file_mode = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(file_type, false, [])) {
                    throw new OpenApiException("Parameter 'file_type' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(file_mode, true, [])) {
                    throw new OpenApiException("Parameter 'file_mode' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(file_mode !== null) queryParams['file_mode'] = file_mode;
                const config = {
                    url: self.getUrl(['config_files', file_type], serializedParam),
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
                        self.logResponse('GET_config_files_file_type', response);
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
                        self.logResponse('GET_config_files_file_type', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'file_type': file_type,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['config_files', file_type], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_config_files_file_type', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_config_files_file_type', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_config_files_file_type', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_config_files_file_type_context_file_id(callback, file_type, context, file_id, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(file_type, false, [])) {
                    throw new OpenApiException("Parameter 'file_type' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(context, false, [])) {
                    throw new OpenApiException("Parameter 'context' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(file_id, false, [])) {
                    throw new OpenApiException("Parameter 'file_id' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['config_files', file_type, context, file_id], serializedParam),
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
                        self.logResponse('GET_config_files_file_type_context_file_id', response);
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
                        self.logResponse('GET_config_files_file_type_context_file_id', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'file_type': file_type,
                        'context': context,
                        'file_id': file_id,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['config_files', file_type, context, file_id], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_config_files_file_type_context_file_id', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_config_files_file_type_context_file_id', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_config_files_file_type_context_file_id', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PUT_config_files_file_type_context_file_id(callback, body, file_type, context, file_id, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                if (!self.verifyParamIsString(file_type, false, [])) {
                    throw new OpenApiException("Parameter 'file_type' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(context, false, [])) {
                    throw new OpenApiException("Parameter 'context' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(file_id, false, [])) {
                    throw new OpenApiException("Parameter 'file_id' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['config_files', file_type, context, file_id], serializedParam),
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
                        self.logResponse('PUT_config_files_file_type_context_file_id', response);
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
                        self.logResponse('PUT_config_files_file_type_context_file_id', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'file_type': file_type,
                        'context': context,
                        'file_id': file_id,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['config_files', file_type, context, file_id], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PUT_config_files_file_type_context_file_id', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PUT_config_files_file_type_context_file_id', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PUT_config_files_file_type_context_file_id', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_config_files_file_type_context_file_id(callback, body, file_type, context, file_id, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                if (!self.verifyParamIsString(file_type, false, [])) {
                    throw new OpenApiException("Parameter 'file_type' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(context, false, [])) {
                    throw new OpenApiException("Parameter 'context' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(file_id, false, [])) {
                    throw new OpenApiException("Parameter 'file_id' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['config_files', file_type, context, file_id], serializedParam),
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
                        self.logResponse('PATCH_config_files_file_type_context_file_id', response);
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
                        self.logResponse('PATCH_config_files_file_type_context_file_id', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'file_type': file_type,
                        'context': context,
                        'file_id': file_id,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['config_files', file_type, context, file_id], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_config_files_file_type_context_file_id', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_config_files_file_type_context_file_id', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_config_files_file_type_context_file_id', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    DELETE_config_files_file_type_context_file_id(callback, file_type, context, file_id, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(file_type, false, [])) {
                    throw new OpenApiException("Parameter 'file_type' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(context, false, [])) {
                    throw new OpenApiException("Parameter 'context' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(file_id, false, [])) {
                    throw new OpenApiException("Parameter 'file_id' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['config_files', file_type, context, file_id], serializedParam),
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
                        self.logResponse('DELETE_config_files_file_type_context_file_id', response);
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
                        self.logResponse('DELETE_config_files_file_type_context_file_id', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'file_type': file_type,
                        'context': context,
                        'file_id': file_id,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['config_files', file_type, context, file_id], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('DELETE_config_files_file_type_context_file_id', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('DELETE_config_files_file_type_context_file_id', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('DELETE_config_files_file_type_context_file_id', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    POST_config_files_file_type_context(callback, body, file_type, context, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                if (!self.verifyParamIsString(file_type, false, [])) {
                    throw new OpenApiException("Parameter 'file_type' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(context, false, [])) {
                    throw new OpenApiException("Parameter 'context' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['config_files', file_type, context], serializedParam),
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
                        self.logResponse('POST_config_files_file_type_context', response);
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
                        self.logResponse('POST_config_files_file_type_context', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'file_type': file_type,
                        'context': context,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['config_files', file_type, context], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('POST_config_files_file_type_context', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('POST_config_files_file_type_context', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('POST_config_files_file_type_context', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
}

export default OpenApiClient_doc_center;
