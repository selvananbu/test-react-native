import { Component } from 'react';
import axios from 'axios';

import OpenApiClient from './openapiclient';
import OpenApiException from './openapiexception';
import { MimeTypes } from './openapibody';
import OpenApiResponse from './openapiresponse';
import OpenApiClientArrayHelper from './openapiclientarrayhelper';
import { ensureAccessTokenIsValid, directDownloadConfig } from '../lilayoutauthentication/authutil';

var Qs = require('qs');

export const PROD_SCHEDULE_BLOCK_COMPLETION_STATUS_NOT_STARTED = "not_started";
export const PROD_SCHEDULE_BLOCK_COMPLETION_STATUS_STARTED = "started";
export const PROD_SCHEDULE_BLOCK_COMPLETION_STATUS_FINISHED = "finished";
export const PROD_SCHEDULE_BLOCK_COMPLETION_STATUS_NOT_FINISHED = "not_finished";
export const PROD_SCHEDULE_BLOCK_COMPLETION_STATUS_ALL = "all";



class OpenApiClient_prod_schedule extends OpenApiClient {

    constructor(site) {
        super(site, OpenApiClient_prod_schedule.getServiceName());
    }

    static getClient(site) {
        var key = site + "." + OpenApiClient_prod_schedule.getServiceName();
        var service = OpenApiClient.serviceMap.get(key);

        if(service == undefined)
        {
            service = new OpenApiClient_prod_schedule(site);
            OpenApiClient.serviceMap.set(key, service);
        }
        return service;
    }

    static getServiceName() {
        return 'prod_schedule';
    }


    GET_basic_data(callback, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['basic_data'], serializedParam),
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
                        self.logResponse('GET_basic_data', response);
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
                        self.logResponse('GET_basic_data', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['basic_data'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_basic_data', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_basic_data', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_basic_data', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_schedule_blocks(callback, from_date, to_date, block_completion_status = null, plant_no = null, group_no = null, sub_group_no = null, machine_no = null, from_batch_no = null, to_batch_no = null, from_order_no = null, to_order_no = null, from_item_no = null, to_item_no = null, use_ready_date_machine = null, dont_group_by_uf_no = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(from_date, false, [])) {
                    throw new OpenApiException("Parameter 'from_date' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(to_date, false, [])) {
                    throw new OpenApiException("Parameter 'to_date' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(block_completion_status, true, [])) {
                    throw new OpenApiException("Parameter 'block_completion_status' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(plant_no, true, [])) {
                    throw new OpenApiException("Parameter 'plant_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(group_no, true, [])) {
                    throw new OpenApiException("Parameter 'group_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(sub_group_no, true, [])) {
                    throw new OpenApiException("Parameter 'sub_group_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsIntegerArray(machine_no, true, [])) {
                    throw new OpenApiException("Parameter 'machine_no' is not a valid integer array!");
                }
                
                if (!self.verifyParamIsInteger(from_batch_no, true, [])) {
                    throw new OpenApiException("Parameter 'from_batch_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(to_batch_no, true, [])) {
                    throw new OpenApiException("Parameter 'to_batch_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(from_order_no, true, [])) {
                    throw new OpenApiException("Parameter 'from_order_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(to_order_no, true, [])) {
                    throw new OpenApiException("Parameter 'to_order_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(from_item_no, true, [])) {
                    throw new OpenApiException("Parameter 'from_item_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(to_item_no, true, [])) {
                    throw new OpenApiException("Parameter 'to_item_no' is not a valid number!");
                }
                
                
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(from_date !== null) queryParams['from_date'] = from_date;
                if(to_date !== null) queryParams['to_date'] = to_date;
                if(block_completion_status !== null) queryParams['block_completion_status'] = block_completion_status;
                if(plant_no !== null) queryParams['plant_no'] = plant_no;
                if(group_no !== null) queryParams['group_no'] = group_no;
                if(sub_group_no !== null) queryParams['sub_group_no'] = sub_group_no;
                if(machine_no !== null) serializedParam['machine_no'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(machine_no, "STYLE_UNDEFINED", "machine_no", true);
                if(from_batch_no !== null) queryParams['from_batch_no'] = from_batch_no;
                if(to_batch_no !== null) queryParams['to_batch_no'] = to_batch_no;
                if(from_order_no !== null) queryParams['from_order_no'] = from_order_no;
                if(to_order_no !== null) queryParams['to_order_no'] = to_order_no;
                if(from_item_no !== null) queryParams['from_item_no'] = from_item_no;
                if(to_item_no !== null) queryParams['to_item_no'] = to_item_no;
                if(use_ready_date_machine !== null) queryParams['use_ready_date_machine'] = use_ready_date_machine;
                if(dont_group_by_uf_no !== null) queryParams['dont_group_by_uf_no'] = dont_group_by_uf_no;
                const config = {
                    url: self.getUrl(['schedule_blocks'], serializedParam),
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
                        self.logResponse('GET_schedule_blocks', response);
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
                        self.logResponse('GET_schedule_blocks', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['schedule_blocks'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_schedule_blocks', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_schedule_blocks', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_schedule_blocks', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PUT_schedule_blocks(callback, body, save_mode = null, use_ready_date_machine = null, dont_group_by_uf_no = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                if (!self.verifyParamIsInteger(save_mode, true, [])) {
                    throw new OpenApiException("Parameter 'save_mode' is not a valid number!");
                }
                
                
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                if(save_mode !== null) queryParams['save_mode'] = save_mode;
                if(use_ready_date_machine !== null) queryParams['use_ready_date_machine'] = use_ready_date_machine;
                if(dont_group_by_uf_no !== null) queryParams['dont_group_by_uf_no'] = dont_group_by_uf_no;
                const config = {
                    url: self.getUrl(['schedule_blocks'], serializedParam),
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
                        self.logResponse('PUT_schedule_blocks', response);
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
                        self.logResponse('PUT_schedule_blocks', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['schedule_blocks'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PUT_schedule_blocks', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PUT_schedule_blocks', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PUT_schedule_blocks', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_schedule_batches(callback, from_date = null, to_date = null, plant_no = null, group_no = null, sub_group_no = null, machine_no = null, from_batch_no = null, to_batch_no = null, from_order_no = null, to_order_no = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(from_date, true, [])) {
                    throw new OpenApiException("Parameter 'from_date' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(to_date, true, [])) {
                    throw new OpenApiException("Parameter 'to_date' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(plant_no, true, [])) {
                    throw new OpenApiException("Parameter 'plant_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(group_no, true, [])) {
                    throw new OpenApiException("Parameter 'group_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(sub_group_no, true, [])) {
                    throw new OpenApiException("Parameter 'sub_group_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(machine_no, true, [])) {
                    throw new OpenApiException("Parameter 'machine_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(from_batch_no, true, [])) {
                    throw new OpenApiException("Parameter 'from_batch_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(to_batch_no, true, [])) {
                    throw new OpenApiException("Parameter 'to_batch_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(from_order_no, true, [])) {
                    throw new OpenApiException("Parameter 'from_order_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(to_order_no, true, [])) {
                    throw new OpenApiException("Parameter 'to_order_no' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(from_date !== null) queryParams['from_date'] = from_date;
                if(to_date !== null) queryParams['to_date'] = to_date;
                if(plant_no !== null) queryParams['plant_no'] = plant_no;
                if(group_no !== null) queryParams['group_no'] = group_no;
                if(sub_group_no !== null) queryParams['sub_group_no'] = sub_group_no;
                if(machine_no !== null) queryParams['machine_no'] = machine_no;
                if(from_batch_no !== null) queryParams['from_batch_no'] = from_batch_no;
                if(to_batch_no !== null) queryParams['to_batch_no'] = to_batch_no;
                if(from_order_no !== null) queryParams['from_order_no'] = from_order_no;
                if(to_order_no !== null) queryParams['to_order_no'] = to_order_no;
                const config = {
                    url: self.getUrl(['schedule_batches'], serializedParam),
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
                        self.logResponse('GET_schedule_batches', response);
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
                        self.logResponse('GET_schedule_batches', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['schedule_batches'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_schedule_batches', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_schedule_batches', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_schedule_batches', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_batch_content(callback, machine_no = null, mat_type = null, mat_id = null, step_no = null, batch_no = null, schedule_date = null, use_ready_date_machine = null, dont_group_by_uf_no = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsInteger(machine_no, true, [])) {
                    throw new OpenApiException("Parameter 'machine_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(mat_type, true, [])) {
                    throw new OpenApiException("Parameter 'mat_type' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(mat_id, true, [])) {
                    throw new OpenApiException("Parameter 'mat_id' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(step_no, true, [])) {
                    throw new OpenApiException("Parameter 'step_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(batch_no, true, [])) {
                    throw new OpenApiException("Parameter 'batch_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(schedule_date, true, [])) {
                    throw new OpenApiException("Parameter 'schedule_date' is not a valid string!");
                }
                
                
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(machine_no !== null) queryParams['machine_no'] = machine_no;
                if(mat_type !== null) queryParams['mat_type'] = mat_type;
                if(mat_id !== null) queryParams['mat_id'] = mat_id;
                if(step_no !== null) queryParams['step_no'] = step_no;
                if(batch_no !== null) queryParams['batch_no'] = batch_no;
                if(schedule_date !== null) queryParams['schedule_date'] = schedule_date;
                if(use_ready_date_machine !== null) queryParams['use_ready_date_machine'] = use_ready_date_machine;
                if(dont_group_by_uf_no !== null) queryParams['dont_group_by_uf_no'] = dont_group_by_uf_no;
                const config = {
                    url: self.getUrl(['batch_content'], serializedParam),
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
                        self.logResponse('GET_batch_content', response);
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
                        self.logResponse('GET_batch_content', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['batch_content'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_batch_content', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_batch_content', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_batch_content', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_schedule_orders(callback, from_date = null, to_date = null, plant_no = null, group_no = null, sub_group_no = null, machine_no = null, from_order_no = null, to_order_no = null, item_no = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyParamIsString(from_date, true, [])) {
                    throw new OpenApiException("Parameter 'from_date' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(to_date, true, [])) {
                    throw new OpenApiException("Parameter 'to_date' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(plant_no, true, [])) {
                    throw new OpenApiException("Parameter 'plant_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(group_no, true, [])) {
                    throw new OpenApiException("Parameter 'group_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(sub_group_no, true, [])) {
                    throw new OpenApiException("Parameter 'sub_group_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(machine_no, true, [])) {
                    throw new OpenApiException("Parameter 'machine_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(from_order_no, true, [])) {
                    throw new OpenApiException("Parameter 'from_order_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(to_order_no, true, [])) {
                    throw new OpenApiException("Parameter 'to_order_no' is not a valid number!");
                }
                
                if (!self.verifyParamIsIntegerArray(item_no, true, [])) {
                    throw new OpenApiException("Parameter 'item_no' is not a valid integer array!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                if(from_date !== null) queryParams['from_date'] = from_date;
                if(to_date !== null) queryParams['to_date'] = to_date;
                if(plant_no !== null) queryParams['plant_no'] = plant_no;
                if(group_no !== null) queryParams['group_no'] = group_no;
                if(sub_group_no !== null) queryParams['sub_group_no'] = sub_group_no;
                if(machine_no !== null) queryParams['machine_no'] = machine_no;
                if(from_order_no !== null) queryParams['from_order_no'] = from_order_no;
                if(to_order_no !== null) queryParams['to_order_no'] = to_order_no;
                if(item_no !== null) serializedParam['item_no'] = OpenApiClientArrayHelper.GET_QUERY_serialized_array(item_no, "STYLE_UNDEFINED", "item_no", true);
                const config = {
                    url: self.getUrl(['schedule_orders'], serializedParam),
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
                        self.logResponse('GET_schedule_orders', response);
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
                        self.logResponse('GET_schedule_orders', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['schedule_orders'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_schedule_orders', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_schedule_orders', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_schedule_orders', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_work_times(callback, body, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
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
                    url: self.getUrl(['work_times'], serializedParam),
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
                        self.logResponse('PATCH_work_times', response);
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
                        self.logResponse('PATCH_work_times', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['work_times'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_work_times', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_work_times', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_work_times', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    GET_global_scheduling_config(callback, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                const config = {
                    url: self.getUrl(['global_scheduling_config'], serializedParam),
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
                        self.logResponse('GET_global_scheduling_config', response);
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
                        self.logResponse('GET_global_scheduling_config', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['global_scheduling_config'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('GET_global_scheduling_config', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('GET_global_scheduling_config', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('GET_global_scheduling_config', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PUT_global_scheduling_config(callback, body, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
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
                    url: self.getUrl(['global_scheduling_config'], serializedParam),
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
                        self.logResponse('PUT_global_scheduling_config', response);
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
                        self.logResponse('PUT_global_scheduling_config', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['global_scheduling_config'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PUT_global_scheduling_config', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PUT_global_scheduling_config', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PUT_global_scheduling_config', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_split(callback, body, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
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
                    url: self.getUrl(['split'], serializedParam),
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
                        self.logResponse('PATCH_split', response);
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
                        self.logResponse('PATCH_split', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['split'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_split', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_split', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_split', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_merge(callback, body, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
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
                    url: self.getUrl(['merge'], serializedParam),
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
                        self.logResponse('PATCH_merge', response);
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
                        self.logResponse('PATCH_merge', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['merge'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_merge', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_merge', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_merge', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_resolve_conflicts(callback, body, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
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
                    url: self.getUrl(['resolve_conflicts'], serializedParam),
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
                        self.logResponse('PATCH_resolve_conflicts', response);
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
                        self.logResponse('PATCH_resolve_conflicts', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['resolve_conflicts'], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_resolve_conflicts', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_resolve_conflicts', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_resolve_conflicts', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
}

export default OpenApiClient_prod_schedule;
