import { Component } from 'react';
import axios from 'axios';

import OpenApiClient from './openapiclient';
import OpenApiException from './openapiexception';
import { MimeTypes } from './openapibody';
import OpenApiResponse from './openapiresponse';
import OpenApiClientArrayHelper from './openapiclientarrayhelper';
import { ensureAccessTokenIsValid, directDownloadConfig } from '../lilayoutauthentication/authutil';

var Qs = require('qs');

export const AUTH_PRODUCT_COMMON = "Common";
export const AUTH_PRODUCT_LIS_AFOVERVIEW = "LIS_afoverview";
export const AUTH_PRODUCT_LIS_APPMGR = "LIS_appmgr";
export const AUTH_PRODUCT_LIS_ASSETCHECK = "LIS_assetcheck";
export const AUTH_PRODUCT_LIS_BASE = "LIS_base";
export const AUTH_PRODUCT_LIS_DELIVERY = "LIS_delivery";
export const AUTH_PRODUCT_LIS_HAND = "LIS_hand";
export const AUTH_PRODUCT_LIS_LABEL = "LIS_label";
export const AUTH_PRODUCT_LIS_COCKPIT = "LIS_cockpit";
export const AUTH_PRODUCT_LIS_COCKPITCONTROLLER = "LIS_cockpitcontroller";
export const AUTH_PRODUCT_LIS_DATAVIEWER = "LIS_dataviewer";
export const AUTH_PRODUCT_LIS_ORDER = "LIS_order";
export const AUTH_PRODUCT_LIS_PROD = "LIS_prod";
export const AUTH_PRODUCT_LIS_PRODSCHEDULE = "LIS_prodschedule";
export const AUTH_PRODUCT_LIS_QMS = "LIS_qms";
export const AUTH_PRODUCT_LIS_REPORTER = "LIS_reporter";
export const AUTH_PRODUCT_LIS_HELP = "LIS_help";
export const AUTH_PRODUCT_LIS_OPT = "LIS_opt";
export const AUTH_PRODUCT_LIS_SHOPFLOOR = "LIS_shopfloor";
export const AUTH_PRODUCT_LIS_CONNECTOR = "LIS_connector";
export const AUTH_PRODUCT_LIS_UPDATESERVER = "LIS_updateserver";
export const AUTH_PRODUCT_LIS_AUTOFABSERVER = "LIS_autofabserver";
export const AUTH_PRODUCT_LIS_ORDERSERVER = "LIS_orderserver";
export const AUTH_PRODUCT_LIS_PRODSERVER = "LIS_prodserver";
export const AUTH_PRODUCT_QUVIS_LOAD = "QuVis_Load";
export const AUTH_PRODUCT_QUVIS_CUT = "QuVis_Cut";
export const AUTH_PRODUCT_QUVIS_BREAK_XY = "QuVis_Break_Xy";
export const AUTH_PRODUCT_QUVIS_BREAK_Z = "QuVis_Break_Z";
export const AUTH_PRODUCT_QUVIS_SEAL_HOT = "QuVis_Seal_Hot";
export const AUTH_PRODUCT_QUVIS_SEAL = "QuVis_Seal";
export const AUTH_PRODUCT_QUVIS_PROCESS_KSLHS = "QuVis_Process_KslHs";
export const AUTH_PRODUCT_QUVIS_PROCESS_KBU_KSU_KBF_WSL_BAZ = "QuVis_Process_Kbu_Ksu_Kbf_Wsl_Baz";
export const AUTH_PRODUCT_QUVIS_PROCESS_KSR = "QuVis_Process_Ksr";
export const AUTH_PRODUCT_QUVIS_PROCESS_AKLS = "QuVis_Process_AklS";
export const AUTH_PRODUCT_QUVIS_BEND = "QuVis_Bend";
export const AUTH_PRODUCT_QUVIS_PRESS = "QuVis_Press";
export const AUTH_PRODUCT_QUVIS_APPLICATE_VSA = "QuVis_Applicate_Vsa";
export const AUTH_PRODUCT_QUVIS_APPLICATE_TPA = "QuVis_Applicate_Tpa";
export const AUTH_PRODUCT_QUVIS_APPLICATE_RSA = "QuVis_Applicate_Rsa";
export const AUTH_PRODUCT_QUVIS_TEMPER = "QuVis_Temper";
export const AUTH_PRODUCT_QUVIS_LOADUNLOADSTATION_GAL_GEL = "QuVis_LoadUnloadStation_Gal_Gel";
export const AUTH_PRODUCT_QUVIS_LOADUNLOADSTATION_STL_ETL = "QuVis_LoadUnloadStation_Stl_Etl";
export const AUTH_PRODUCT_QUVIS_SORT = "QuVis_Sort";
export const AUTH_PRODUCT_QUVIS_WASH_D = "QuVis_Wash_D";
export const AUTH_PRODUCT_QUVIS_GTS = "QuVis_GTS";
export const AUTH_PRODUCT_QUVIS_SSV = "QuVis_Ssv";
export const AUTH_PRODUCT_DEVSRVUTIL = "DevSrvUtil";
export const AUTH_PRODUCT_EXECMENU = "ExecMenu";
export const AUTH_PRODUCT_LIBUILDTASK = "LiBuildTask";
export const AUTH_PRODUCT_LISECCOMPONENTSDEMO = "LisecComponentsDemo";
export const AUTH_PRODUCT_LISHELL = "LiShell";
export const AUTH_PRODUCT_LISHELLUI = "LiShellUi";
export const AUTH_PRODUCT_LV3UICLIENT = "LV3UiClient";
export const AUTH_PRODUCT_STANDALONESTOCKPLATEEDITOR = "StandaloneStockPlateEditor";
export const AUTH_PRODUCT_UNITTESTINGLIBRARY = "UnitTestingLibrary";
export const AUTH_PRODUCT_VARIOUSMODULES = "VariousModules";
export const AUTH_PRODUCT_SAMPLEVISU = "SampleVisu";
export const AUTH_PRODUCT_LIS_AUTHSIGN = "LIS_authsign";
export const AUTH_PRODUCT_QUVIS_DETACHED = "QuVis_Detached";
export const AUTH_PRODUCT_LISECDESKTOPAPP = "LisecDesktopApp";
export const AUTH_PRODUCT_WEBSTANDALONE = "WebStandalone";
export const AUTH_PRODUCT_THIRDPARTYCOMMON = "ThirdPartyCommon";

export const AUTH_AUTHORIZATION_AUTH1 = 1;
export const AUTH_AUTHORIZATION_AUTH2 = 2;
export const AUTH_AUTHORIZATION_AUTH3 = 3;
export const AUTH_AUTHORIZATION_AUTH4 = 4;


class OpenApiClient_auth extends OpenApiClient {

    constructor(site) {
        super(site, OpenApiClient_auth.getServiceName());
    }

    static getClient(site) {
        var key = site + "." + OpenApiClient_auth.getServiceName();
        var service = OpenApiClient.serviceMap.get(key);

        if(service == undefined)
        {
            service = new OpenApiClient_auth(site);
            OpenApiClient.serviceMap.set(key, service);
        }
        return service;
    }

    static getServiceName() {
        return 'auth';
    }


    GET_sites(callback, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
            try {
                var headers = {};
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
    }
    
    POST_tokens(callback, userQuery = null, passwordQuery = null, userHeader = null, passwordHeader = null, product = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
            try {
                if (!self.verifyParamIsString(userQuery, true, [])) {
                    throw new OpenApiException("Parameter 'userQuery' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(passwordQuery, true, [])) {
                    throw new OpenApiException("Parameter 'passwordQuery' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(userHeader, true, [])) {
                    throw new OpenApiException("Parameter 'userHeader' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(passwordHeader, true, [])) {
                    throw new OpenApiException("Parameter 'passwordHeader' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(product, true, [])) {
                    throw new OpenApiException("Parameter 'product' is not a valid string!");
                }
                
                var headers = {};
                var queryParams = {};
                var serializedParam = {};
                if(userQuery !== null) queryParams['userQuery'] = userQuery;
                if(passwordQuery !== null) queryParams['passwordQuery'] = passwordQuery;
                if(userHeader !== null) headers['userHeader'] = userHeader;
                if(passwordHeader !== null) headers['passwordHeader'] = passwordHeader;
                if(product !== null) queryParams['product'] = product;
                const config = {
                    url: self.getUrl(['tokens'], serializedParam),
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
                        self.logResponse('POST_tokens', response);
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
                        self.logResponse('POST_tokens', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['tokens'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('POST_tokens', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('POST_tokens', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('POST_tokens', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
    }
    
    PUT_tokens(callback, refreshTokenQuery = null, refreshTokenHeader = null, userQuery = null, userHeader = null, remoteSiteQuery = null, remoteSiteHeader = null, companyQuery = null, companyHeader = null, product = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
            try {
                if (!self.verifyParamIsString(refreshTokenQuery, true, [])) {
                    throw new OpenApiException("Parameter 'refreshTokenQuery' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(refreshTokenHeader, true, [])) {
                    throw new OpenApiException("Parameter 'refreshTokenHeader' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(userQuery, true, [])) {
                    throw new OpenApiException("Parameter 'userQuery' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(userHeader, true, [])) {
                    throw new OpenApiException("Parameter 'userHeader' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(remoteSiteQuery, true, [])) {
                    throw new OpenApiException("Parameter 'remoteSiteQuery' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(remoteSiteHeader, true, [])) {
                    throw new OpenApiException("Parameter 'remoteSiteHeader' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(companyQuery, true, [])) {
                    throw new OpenApiException("Parameter 'companyQuery' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(companyHeader, true, [])) {
                    throw new OpenApiException("Parameter 'companyHeader' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(product, true, [])) {
                    throw new OpenApiException("Parameter 'product' is not a valid string!");
                }
                
                var headers = {};
                var queryParams = {};
                var serializedParam = {};
                if(refreshTokenQuery !== null) queryParams['refreshTokenQuery'] = refreshTokenQuery;
                if(refreshTokenHeader !== null) headers['refreshTokenHeader'] = refreshTokenHeader;
                if(userQuery !== null) queryParams['userQuery'] = userQuery;
                if(userHeader !== null) headers['userHeader'] = userHeader;
                if(remoteSiteQuery !== null) queryParams['remoteSiteQuery'] = remoteSiteQuery;
                if(remoteSiteHeader !== null) headers['remoteSiteHeader'] = remoteSiteHeader;
                if(companyQuery !== null) queryParams['companyQuery'] = companyQuery;
                if(companyHeader !== null) headers['companyHeader'] = companyHeader;
                if(product !== null) queryParams['product'] = product;
                const config = {
                    url: self.getUrl(['tokens'], serializedParam),
                    method: 'put',
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
                        self.logResponse('PUT_tokens', response);
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
                        self.logResponse('PUT_tokens', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['tokens'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PUT_tokens', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PUT_tokens', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PUT_tokens', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
    }
    
    DELETE_tokens(callback, refreshTokenQuery = null, refreshTokenHeader = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(refreshTokenQuery, true, [])) {
                    throw new OpenApiException("Parameter 'refreshTokenQuery' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(refreshTokenHeader, true, [])) {
                    throw new OpenApiException("Parameter 'refreshTokenHeader' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(refreshTokenQuery !== null) queryParams['refreshTokenQuery'] = refreshTokenQuery;
                if(refreshTokenHeader !== null) headers['refreshTokenHeader'] = refreshTokenHeader;
                const config = {
                    url: self.getUrl(['tokens'], serializedParam),
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
                        self.logResponse('DELETE_tokens', response);
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
                        self.logResponse('DELETE_tokens', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['tokens'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('DELETE_tokens', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('DELETE_tokens', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('DELETE_tokens', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_tokens(callback, accessTokenQuery = null, accessTokenHeader = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
            try {
                if (!self.verifyParamIsString(accessTokenQuery, true, [])) {
                    throw new OpenApiException("Parameter 'accessTokenQuery' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(accessTokenHeader, true, [])) {
                    throw new OpenApiException("Parameter 'accessTokenHeader' is not a valid string!");
                }
                
                var headers = {};
                var queryParams = {};
                var serializedParam = {};
                if(accessTokenQuery !== null) queryParams['accessTokenQuery'] = accessTokenQuery;
                if(accessTokenHeader !== null) headers['accessTokenHeader'] = accessTokenHeader;
                const config = {
                    url: self.getUrl(['tokens'], serializedParam),
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
                        self.logResponse('GET_tokens', response);
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
                        self.logResponse('GET_tokens', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['tokens'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_tokens', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_tokens', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_tokens', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
    }
    
    GET_hash_algorithm(callback, user, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
            try {
                if (!self.verifyParamIsString(user, false, [])) {
                    throw new OpenApiException("Parameter 'user' is not a valid string!");
                }
                
                var headers = {};
                var queryParams = {};
                var serializedParam = {};
                if(user !== null) queryParams['user'] = user;
                const config = {
                    url: self.getUrl(['hash_algorithm'], serializedParam),
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
                        self.logResponse('GET_hash_algorithm', response);
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
                        self.logResponse('GET_hash_algorithm', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['hash_algorithm'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_hash_algorithm', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_hash_algorithm', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_hash_algorithm', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
    }
    
    GET_lock_sessions(callback, sessionToken, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(sessionToken, false, [])) {
                    throw new OpenApiException("Parameter 'sessionToken' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(sessionToken !== null) headers['sessionToken'] = sessionToken;
                const config = {
                    url: self.getUrl(['lock_sessions'], serializedParam),
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
                        self.logResponse('GET_lock_sessions', response);
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
                        self.logResponse('GET_lock_sessions', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['lock_sessions'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_lock_sessions', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_lock_sessions', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_lock_sessions', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    POST_lock_sessions(callback, sessionToken, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(sessionToken, false, [])) {
                    throw new OpenApiException("Parameter 'sessionToken' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(sessionToken !== null) headers['sessionToken'] = sessionToken;
                const config = {
                    url: self.getUrl(['lock_sessions'], serializedParam),
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
                        self.logResponse('POST_lock_sessions', response);
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
                        self.logResponse('POST_lock_sessions', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['lock_sessions'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('POST_lock_sessions', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('POST_lock_sessions', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('POST_lock_sessions', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PUT_lock_sessions(callback, sessionToken, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(sessionToken, false, [])) {
                    throw new OpenApiException("Parameter 'sessionToken' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(sessionToken !== null) headers['sessionToken'] = sessionToken;
                const config = {
                    url: self.getUrl(['lock_sessions'], serializedParam),
                    method: 'put',
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
                        self.logResponse('PUT_lock_sessions', response);
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
                        self.logResponse('PUT_lock_sessions', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['lock_sessions'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PUT_lock_sessions', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PUT_lock_sessions', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PUT_lock_sessions', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    DELETE_lock_sessions(callback, sessionToken, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(sessionToken, false, [])) {
                    throw new OpenApiException("Parameter 'sessionToken' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(sessionToken !== null) headers['sessionToken'] = sessionToken;
                const config = {
                    url: self.getUrl(['lock_sessions'], serializedParam),
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
                        self.logResponse('DELETE_lock_sessions', response);
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
                        self.logResponse('DELETE_lock_sessions', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['lock_sessions'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('DELETE_lock_sessions', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('DELETE_lock_sessions', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('DELETE_lock_sessions', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_lock_sessions_by_id(callback, sessionId, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(sessionId, false, [])) {
                    throw new OpenApiException("Parameter 'sessionId' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(sessionId !== null) headers['sessionId'] = sessionId;
                const config = {
                    url: self.getUrl(['lock_sessions_by_id'], serializedParam),
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
                        self.logResponse('GET_lock_sessions_by_id', response);
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
                        self.logResponse('GET_lock_sessions_by_id', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['lock_sessions_by_id'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_lock_sessions_by_id', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_lock_sessions_by_id', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_lock_sessions_by_id', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PUT_lock_sessions_by_id(callback, sessionId, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(sessionId, false, [])) {
                    throw new OpenApiException("Parameter 'sessionId' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(sessionId !== null) headers['sessionId'] = sessionId;
                const config = {
                    url: self.getUrl(['lock_sessions_by_id'], serializedParam),
                    method: 'put',
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
                        self.logResponse('PUT_lock_sessions_by_id', response);
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
                        self.logResponse('PUT_lock_sessions_by_id', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['lock_sessions_by_id'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PUT_lock_sessions_by_id', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PUT_lock_sessions_by_id', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PUT_lock_sessions_by_id', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    DELETE_lock_sessions_by_id(callback, sessionId, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(sessionId, false, [])) {
                    throw new OpenApiException("Parameter 'sessionId' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(sessionId !== null) headers['sessionId'] = sessionId;
                const config = {
                    url: self.getUrl(['lock_sessions_by_id'], serializedParam),
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
                        self.logResponse('DELETE_lock_sessions_by_id', response);
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
                        self.logResponse('DELETE_lock_sessions_by_id', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['lock_sessions_by_id'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('DELETE_lock_sessions_by_id', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('DELETE_lock_sessions_by_id', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('DELETE_lock_sessions_by_id', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_authorizations(callback, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['authorizations'], serializedParam),
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
                        self.logResponse('GET_authorizations', response);
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
                        self.logResponse('GET_authorizations', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['authorizations'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_authorizations', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_authorizations', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_authorizations', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
}

export default OpenApiClient_auth;
