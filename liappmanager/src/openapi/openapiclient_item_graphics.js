import { Component } from 'react';
import axios from 'axios';

import OpenApiClient from './openapiclient';
import OpenApiException from './openapiexception';
import { MimeTypes } from './openapibody';
import OpenApiResponse from './openapiresponse';
import OpenApiClientArrayHelper from './openapiclientarrayhelper';
import { ensureAccessTokenIsValid, directDownloadConfig } from '../lilayoutauthentication/authutil';

var Qs = require('qs');

export const ITEM_GRAPHICS_FILE_TYPE_SVG = "svg";
export const ITEM_GRAPHICS_FILE_TYPE_PDF = "pdf";
export const ITEM_GRAPHICS_FILE_TYPE_PNG = "png";
export const ITEM_GRAPHICS_VIEW_TYPE_PRODUCTION_DRAWING = "production_drawing";
export const ITEM_GRAPHICS_VIEW_TYPE_SIDE_VIEW = "side_view";
export const ITEM_GRAPHICS_VIEW_TYPE_FRONT_VIEW = "front_view";
export const ITEM_GRAPHICS_VIEW_TYPE_GLASS_WIDGET = "glass_widget";



class OpenApiClient_item_graphics extends OpenApiClient {

    constructor(site) {
        super(site, OpenApiClient_item_graphics.getServiceName());
    }

    static getClient(site) {
        var key = site + "." + OpenApiClient_item_graphics.getServiceName();
        var service = OpenApiClient.serviceMap.get(key);

        if(service == undefined)
        {
            service = new OpenApiClient_item_graphics(site);
            OpenApiClient.serviceMap.set(key, service);
        }
        return service;
    }

    static getServiceName() {
        return 'item_graphics';
    }


    GET_orders_order_item_pane_component_view_type_file_type(callback, order, item, pane, component, view_type, file_type, pref_width = null, pref_height = null, show_legend = null, show_right_angles = null, show_shape_diagonal = null, show_shape_measurements = null, show_shape_parameters = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
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
                
                if (!self.verifyParamIsString(view_type, false, [])) {
                    throw new OpenApiException("Parameter 'view_type' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(file_type, false, [])) {
                    throw new OpenApiException("Parameter 'file_type' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(pref_width, true, [])) {
                    throw new OpenApiException("Parameter 'pref_width' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(pref_height, true, [])) {
                    throw new OpenApiException("Parameter 'pref_height' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(show_legend, true, [])) {
                    throw new OpenApiException("Parameter 'show_legend' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(show_right_angles, true, [])) {
                    throw new OpenApiException("Parameter 'show_right_angles' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(show_shape_diagonal, true, [])) {
                    throw new OpenApiException("Parameter 'show_shape_diagonal' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(show_shape_measurements, true, [])) {
                    throw new OpenApiException("Parameter 'show_shape_measurements' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(show_shape_parameters, true, [])) {
                    throw new OpenApiException("Parameter 'show_shape_parameters' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(pref_width !== null) queryParams['pref_width'] = pref_width;
                if(pref_height !== null) queryParams['pref_height'] = pref_height;
                if(show_legend !== null) queryParams['show_legend'] = show_legend;
                if(show_right_angles !== null) queryParams['show_right_angles'] = show_right_angles;
                if(show_shape_diagonal !== null) queryParams['show_shape_diagonal'] = show_shape_diagonal;
                if(show_shape_measurements !== null) queryParams['show_shape_measurements'] = show_shape_measurements;
                if(show_shape_parameters !== null) queryParams['show_shape_parameters'] = show_shape_parameters;
                const config = {
                    url: self.getUrl(['orders', order, item, pane, component, view_type, file_type], serializedParam),
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
                        self.logResponse('GET_orders_order_item_pane_component_view_type_file_type', response);
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
                        self.logResponse('GET_orders_order_item_pane_component_view_type_file_type', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'order': order,
                        'item': item,
                        'pane': pane,
                        'component': component,
                        'view_type': view_type,
                        'file_type': file_type,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['orders', order, item, pane, component, view_type, file_type], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_orders_order_item_pane_component_view_type_file_type', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_orders_order_item_pane_component_view_type_file_type', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_orders_order_item_pane_component_view_type_file_type', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_processings(callback, subCategoryId = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsIntegerArray(subCategoryId, true, [])) {
                    throw new OpenApiException("Parameter 'subCategoryId' is not a valid integer array!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(subCategoryId !== null) serializedParam['subCategoryId'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(subCategoryId, "STYLE_PIPEDELIMITED", "subCategoryId", false);
                const config = {
                    url: self.getUrl(['processings'], serializedParam),
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
                        self.logResponse('GET_processings', response);
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
                        self.logResponse('GET_processings', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['processings'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_processings', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_processings', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_processings', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_processings_proc_id_geometry(callback, body, proc_id, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                if (!self.verifyParamIsInteger(proc_id, false, [])) {
                    throw new OpenApiException("Parameter 'proc_id' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['processings', proc_id, 'geometry'], serializedParam),
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
                        self.logResponse('PATCH_processings_proc_id_geometry', response);
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
                        self.logResponse('PATCH_processings_proc_id_geometry', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'proc_id': proc_id,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['processings', proc_id, 'geometry'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_processings_proc_id_geometry', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_processings_proc_id_geometry', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_processings_proc_id_geometry', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_shapes_shape_no_geometry(callback, body, shape_no, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                if (!self.verifyParamIsInteger(shape_no, false, [])) {
                    throw new OpenApiException("Parameter 'shape_no' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                const config = {
                    url: self.getUrl(['shapes', shape_no, 'geometry'], serializedParam),
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
                        self.logResponse('PATCH_shapes_shape_no_geometry', response);
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
                        self.logResponse('PATCH_shapes_shape_no_geometry', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'shape_no': shape_no,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['shapes', shape_no, 'geometry'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_shapes_shape_no_geometry', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_shapes_shape_no_geometry', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_shapes_shape_no_geometry', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
}

export default OpenApiClient_item_graphics;
