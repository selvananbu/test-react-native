import { Component } from 'react';
import axios from 'axios';

import OpenApiClient from './openapiclient';
import OpenApiException from './openapiexception';
import { MimeTypes } from './openapibody';
import OpenApiResponse from './openapiresponse';
import OpenApiClientArrayHelper from './openapiclientarrayhelper';
import { ensureAccessTokenIsValid, directDownloadConfig } from '../lilayoutauthentication/authutil';

var Qs = require('qs');




class OpenApiClient_user_management extends OpenApiClient {

    constructor(site) {
        super(site, OpenApiClient_user_management.getServiceName());
    }

    static getClient(site) {
        var key = site + "." + OpenApiClient_user_management.getServiceName();
        var service = OpenApiClient.serviceMap.get(key);

        if(service == undefined)
        {
            service = new OpenApiClient_user_management(site);
            OpenApiClient.serviceMap.set(key, service);
        }
        return service;
    }

    static getServiceName() {
        return 'user_management';
    }


    GET_users(callback, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['users'], serializedParam),
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
                        self.logResponse('GET_users', response);
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
                        self.logResponse('GET_users', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['users'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_users', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_users', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_users', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    POST_users(callback, body, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
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
                    url: self.getUrl(['users'], serializedParam),
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
                        self.logResponse('POST_users', response);
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
                        self.logResponse('POST_users', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['users'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('POST_users', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('POST_users', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('POST_users', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PUT_users(callback, body, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
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
                    url: self.getUrl(['users'], serializedParam),
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
                        self.logResponse('PUT_users', response);
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
                        self.logResponse('PUT_users', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['users'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PUT_users', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PUT_users', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PUT_users', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_users(callback, body, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
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
                    url: self.getUrl(['users'], serializedParam),
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
                        self.logResponse('PATCH_users', response);
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
                        self.logResponse('PATCH_users', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['users'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_users', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_users', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_users', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_users_userId(callback, userId, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(userId, false, [])) {
                    throw new OpenApiException("Parameter 'userId' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['users', userId], serializedParam),
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
                        self.logResponse('GET_users_userId', response);
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
                        self.logResponse('GET_users_userId', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'userId': userId,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['users', userId], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_users_userId', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_users_userId', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_users_userId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    DELETE_users_userId(callback, userId, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(userId, false, [])) {
                    throw new OpenApiException("Parameter 'userId' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['users', userId], serializedParam),
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
                        self.logResponse('DELETE_users_userId', response);
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
                        self.logResponse('DELETE_users_userId', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'userId': userId,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['users', userId], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('DELETE_users_userId', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('DELETE_users_userId', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('DELETE_users_userId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_users_userId_roles(callback, userId, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(userId, false, [])) {
                    throw new OpenApiException("Parameter 'userId' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['users', userId, 'roles'], serializedParam),
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
                        self.logResponse('GET_users_userId_roles', response);
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
                        self.logResponse('GET_users_userId_roles', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'userId': userId,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['users', userId, 'roles'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_users_userId_roles', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_users_userId_roles', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_users_userId_roles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    POST_users_userId_roles(callback, userId, roleIds, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(userId, false, [])) {
                    throw new OpenApiException("Parameter 'userId' is not a valid number!");
                }
                
                if (!self.verifyParamIsIntegerArray(roleIds, false, [])) {
                    throw new OpenApiException("Parameter 'roleIds' is not a valid integer array!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(roleIds !== null) serializedParam['roleIds'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(roleIds, "STYLE_UNDEFINED", "roleIds", true);
                const config = {
                    url: self.getUrl(['users', userId, 'roles'], serializedParam),
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
                        self.logResponse('POST_users_userId_roles', response);
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
                        self.logResponse('POST_users_userId_roles', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'userId': userId,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['users', userId, 'roles'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('POST_users_userId_roles', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('POST_users_userId_roles', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('POST_users_userId_roles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    DELETE_users_userId_roles_roleId(callback, userId, roleId, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(userId, false, [])) {
                    throw new OpenApiException("Parameter 'userId' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(roleId, false, [])) {
                    throw new OpenApiException("Parameter 'roleId' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['users', userId, 'roles', roleId], serializedParam),
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
                        self.logResponse('DELETE_users_userId_roles_roleId', response);
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
                        self.logResponse('DELETE_users_userId_roles_roleId', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'userId': userId,
                        'roleId': roleId,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['users', userId, 'roles', roleId], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('DELETE_users_userId_roles_roleId', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('DELETE_users_userId_roles_roleId', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('DELETE_users_userId_roles_roleId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_users_userId_job_titles(callback, userId, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(userId, false, [])) {
                    throw new OpenApiException("Parameter 'userId' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['users', userId, 'job_titles'], serializedParam),
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
                        self.logResponse('GET_users_userId_job_titles', response);
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
                        self.logResponse('GET_users_userId_job_titles', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'userId': userId,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['users', userId, 'job_titles'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_users_userId_job_titles', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_users_userId_job_titles', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_users_userId_job_titles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    POST_users_userId_job_titles(callback, body, userId, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                if (!self.verifyParamIsInteger(userId, false, [])) {
                    throw new OpenApiException("Parameter 'userId' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['users', userId, 'job_titles'], serializedParam),
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
                        self.logResponse('POST_users_userId_job_titles', response);
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
                        self.logResponse('POST_users_userId_job_titles', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'userId': userId,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['users', userId, 'job_titles'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('POST_users_userId_job_titles', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('POST_users_userId_job_titles', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('POST_users_userId_job_titles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PUT_users_userId_job_titles(callback, body, userId, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                if (!self.verifyParamIsInteger(userId, false, [])) {
                    throw new OpenApiException("Parameter 'userId' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['users', userId, 'job_titles'], serializedParam),
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
                        self.logResponse('PUT_users_userId_job_titles', response);
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
                        self.logResponse('PUT_users_userId_job_titles', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'userId': userId,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['users', userId, 'job_titles'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PUT_users_userId_job_titles', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PUT_users_userId_job_titles', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PUT_users_userId_job_titles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    DELETE_users_userId_job_titles_jobTitleSeq(callback, userId, jobTitleSeq, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(userId, false, [])) {
                    throw new OpenApiException("Parameter 'userId' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(jobTitleSeq, false, [])) {
                    throw new OpenApiException("Parameter 'jobTitleSeq' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['users', userId, 'job_titles', jobTitleSeq], serializedParam),
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
                        self.logResponse('DELETE_users_userId_job_titles_jobTitleSeq', response);
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
                        self.logResponse('DELETE_users_userId_job_titles_jobTitleSeq', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'userId': userId,
                        'jobTitleSeq': jobTitleSeq,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['users', userId, 'job_titles', jobTitleSeq], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('DELETE_users_userId_job_titles_jobTitleSeq', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('DELETE_users_userId_job_titles_jobTitleSeq', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('DELETE_users_userId_job_titles_jobTitleSeq', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_company_entities(callback, type = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(type, true, [])) {
                    throw new OpenApiException("Parameter 'type' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(type !== null) queryParams['type'] = type;
                const config = {
                    url: self.getUrl(['company_entities'], serializedParam),
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
                        self.logResponse('GET_company_entities', response);
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
                        self.logResponse('GET_company_entities', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['company_entities'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_company_entities', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_company_entities', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_company_entities', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    POST_company_entities(callback, body, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
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
                    url: self.getUrl(['company_entities'], serializedParam),
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
                        self.logResponse('POST_company_entities', response);
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
                        self.logResponse('POST_company_entities', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['company_entities'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('POST_company_entities', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('POST_company_entities', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('POST_company_entities', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PUT_company_entities(callback, body, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
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
                    url: self.getUrl(['company_entities'], serializedParam),
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
                        self.logResponse('PUT_company_entities', response);
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
                        self.logResponse('PUT_company_entities', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['company_entities'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PUT_company_entities', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PUT_company_entities', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PUT_company_entities', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_company_entities_entityId(callback, entityId, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(entityId, false, [])) {
                    throw new OpenApiException("Parameter 'entityId' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['company_entities', entityId], serializedParam),
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
                        self.logResponse('GET_company_entities_entityId', response);
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
                        self.logResponse('GET_company_entities_entityId', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'entityId': entityId,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['company_entities', entityId], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_company_entities_entityId', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_company_entities_entityId', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_company_entities_entityId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    DELETE_company_entities_entityId(callback, entityId, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(entityId, false, [])) {
                    throw new OpenApiException("Parameter 'entityId' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['company_entities', entityId], serializedParam),
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
                        self.logResponse('DELETE_company_entities_entityId', response);
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
                        self.logResponse('DELETE_company_entities_entityId', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'entityId': entityId,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['company_entities', entityId], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('DELETE_company_entities_entityId', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('DELETE_company_entities_entityId', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('DELETE_company_entities_entityId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_sites(callback, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['sites'], serializedParam),
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
                        self.logResponse('GET_sites', response);
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
                        self.logResponse('GET_sites', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['sites'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_sites', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_sites', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_sites', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    POST_sites(callback, body, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
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
                    url: self.getUrl(['sites'], serializedParam),
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
                        self.logResponse('POST_sites', response);
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
                        self.logResponse('POST_sites', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['sites'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('POST_sites', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('POST_sites', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('POST_sites', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PUT_sites(callback, body, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
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
                    url: self.getUrl(['sites'], serializedParam),
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
                        self.logResponse('PUT_sites', response);
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
                        self.logResponse('PUT_sites', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['sites'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PUT_sites', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PUT_sites', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PUT_sites', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_sites_siteId(callback, siteId, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(siteId, false, [])) {
                    throw new OpenApiException("Parameter 'siteId' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['sites', siteId], serializedParam),
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
                        self.logResponse('GET_sites_siteId', response);
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
                        self.logResponse('GET_sites_siteId', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'siteId': siteId,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['sites', siteId], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_sites_siteId', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_sites_siteId', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_sites_siteId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    DELETE_sites_siteId(callback, siteId, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(siteId, false, [])) {
                    throw new OpenApiException("Parameter 'siteId' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['sites', siteId], serializedParam),
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
                        self.logResponse('DELETE_sites_siteId', response);
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
                        self.logResponse('DELETE_sites_siteId', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'siteId': siteId,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['sites', siteId], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('DELETE_sites_siteId', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('DELETE_sites_siteId', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('DELETE_sites_siteId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_roles(callback, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['roles'], serializedParam),
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
                        self.logResponse('GET_roles', response);
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
                        self.logResponse('GET_roles', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['roles'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_roles', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_roles', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_roles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    POST_roles(callback, body, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
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
                    url: self.getUrl(['roles'], serializedParam),
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
                        self.logResponse('POST_roles', response);
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
                        self.logResponse('POST_roles', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['roles'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('POST_roles', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('POST_roles', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('POST_roles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PUT_roles(callback, body, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
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
                    url: self.getUrl(['roles'], serializedParam),
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
                        self.logResponse('PUT_roles', response);
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
                        self.logResponse('PUT_roles', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['roles'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PUT_roles', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PUT_roles', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PUT_roles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_roles_roleId(callback, roleId, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(roleId, false, [])) {
                    throw new OpenApiException("Parameter 'roleId' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['roles', roleId], serializedParam),
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
                        self.logResponse('GET_roles_roleId', response);
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
                        self.logResponse('GET_roles_roleId', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'roleId': roleId,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['roles', roleId], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_roles_roleId', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_roles_roleId', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_roles_roleId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    DELETE_roles_roleId(callback, roleId, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(roleId, false, [])) {
                    throw new OpenApiException("Parameter 'roleId' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['roles', roleId], serializedParam),
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
                        self.logResponse('DELETE_roles_roleId', response);
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
                        self.logResponse('DELETE_roles_roleId', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'roleId': roleId,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['roles', roleId], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('DELETE_roles_roleId', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('DELETE_roles_roleId', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('DELETE_roles_roleId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_job_titles(callback, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['job_titles'], serializedParam),
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
                        self.logResponse('GET_job_titles', response);
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
                        self.logResponse('GET_job_titles', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['job_titles'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_job_titles', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_job_titles', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_job_titles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    POST_job_titles(callback, body, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
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
                    url: self.getUrl(['job_titles'], serializedParam),
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
                        self.logResponse('POST_job_titles', response);
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
                        self.logResponse('POST_job_titles', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['job_titles'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('POST_job_titles', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('POST_job_titles', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('POST_job_titles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PUT_job_titles(callback, body, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
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
                    url: self.getUrl(['job_titles'], serializedParam),
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
                        self.logResponse('PUT_job_titles', response);
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
                        self.logResponse('PUT_job_titles', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['job_titles'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PUT_job_titles', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PUT_job_titles', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PUT_job_titles', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_job_titles_jobTitleId(callback, jobTitleId, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(jobTitleId, false, [])) {
                    throw new OpenApiException("Parameter 'jobTitleId' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['job_titles', jobTitleId], serializedParam),
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
                        self.logResponse('GET_job_titles_jobTitleId', response);
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
                        self.logResponse('GET_job_titles_jobTitleId', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'jobTitleId': jobTitleId,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['job_titles', jobTitleId], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_job_titles_jobTitleId', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_job_titles_jobTitleId', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_job_titles_jobTitleId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    DELETE_job_titles_jobTitleId(callback, jobTitleId, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(jobTitleId, false, [])) {
                    throw new OpenApiException("Parameter 'jobTitleId' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['job_titles', jobTitleId], serializedParam),
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
                        self.logResponse('DELETE_job_titles_jobTitleId', response);
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
                        self.logResponse('DELETE_job_titles_jobTitleId', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'jobTitleId': jobTitleId,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['job_titles', jobTitleId], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('DELETE_job_titles_jobTitleId', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('DELETE_job_titles_jobTitleId', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('DELETE_job_titles_jobTitleId', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_web_menu_items(callback, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['web_menu', 'items'], serializedParam),
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
                        self.logResponse('GET_web_menu_items', response);
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
                        self.logResponse('GET_web_menu_items', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['web_menu', 'items'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_web_menu_items', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_web_menu_items', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_web_menu_items', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
}

export default OpenApiClient_user_management;
