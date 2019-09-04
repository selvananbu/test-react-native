import { Component } from 'react';
import axios from 'axios';

import OpenApiClient from './openapiclient';
import OpenApiException from './openapiexception';
import { MimeTypes } from './openapibody';
import OpenApiResponse from './openapiresponse';
import OpenApiClientArrayHelper from './openapiclientarrayhelper';
import { ensureAccessTokenIsValid, directDownloadConfig } from '../lilayoutauthentication/authutil';

var Qs = require('qs');

export const TRF_CNC_BENDER_BRAND_LISEC = "lisec";
export const TRF_CNC_BENDER_BRAND_FOREL = "forel";
export const TRF_CNC_BENDER_BRAND_SIMEC = "simec";
export const TRF_CNC_BENDER_BRAND_SEVA = "seva";
export const TRF_CNC_BENDER_BRAND_MTL = "mtl";
export const TRF_CNC_BENDER_BRAND_MTL_V3 = "mtl_v3";
export const TRF_CNC_BENDER_BRAND_ROTTLER_RUEDIGER = "rottler_ruediger";
export const TRF_CNC_BENDER_BRAND_TFB = "tfb";
export const TRF_CNC_BENDER_BRAND_FASTBEND = "fastbend";
export const TRF_CNC_BENDER_BRAND_PROTOBUF = "protobuf";
export const TRF_CNC_BENDER_TRF_TYPE_SYSTEM = "system";
export const TRF_CNC_BENDER_TRF_TYPE_TRANS0 = "trans0";
export const TRF_CNC_BENDER_TRF_TYPE_TRANS1 = "trans1";
export const TRF_CNC_BENDER_TRF_TYPE_TRANS2 = "trans2";
export const TRF_CNC_BENDER_TRF_TYPE_TRANS3 = "trans3";
export const TRF_CNC_BENDER_TRF_TYPE_TRANS4 = "trans4";
export const TRF_CNC_BENDER_TRF_TYPE_LISECTRF = "lisectrf";
export const TRF_CNC_LINE_BRAND_LISECTRF = "lisectrf";
export const TRF_CNC_LINE_BRAND_FOREL = "forel";
export const TRF_CNC_LINE_BRAND_CLEAR_THINKING = "clear_thinking";
export const TRF_CNC_LINE_BRAND_GED = "ged";
export const TRF_CNC_LINE_BRAND_PROTOBUF = "protobuf";
export const TRF_CNC_LINE_TRF_TYPE_SYSTEM = "system";
export const TRF_CNC_LINE_TRF_TYPE_LISECTRF = "lisectrf";
export const TRF_CNC_LISECTRF_VERSION_SYSTEM = "system";
export const TRF_CNC_LISECTRF_VERSION_1_80 = "1_80";
export const TRF_CNC_LISECTRF_VERSION_1_90 = "1_90";
export const TRF_CNC_LISECTRF_VERSION_2_00 = "2_00";
export const TRF_CNC_LISECTRF_VERSION_2_30 = "2_30";
export const TRF_CNC_LISECTRF_VERSION_2_40 = "2_40";
export const TRF_CNC_LISECTRF_VERSION_2_50 = "2_50";
export const TRF_CNC_LISECTRF_VERSION_2_60 = "2_60";
export const TRF_CNC_LISECTRF_VERSION_2_80 = "2_80";



class OpenApiClient_trf_cnc extends OpenApiClient {

    constructor(site) {
        super(site, OpenApiClient_trf_cnc.getServiceName());
    }

    static getClient(site) {
        var key = site + "." + OpenApiClient_trf_cnc.getServiceName();
        var service = OpenApiClient.serviceMap.get(key);

        if(service == undefined)
        {
            service = new OpenApiClient_trf_cnc(site);
            OpenApiClient.serviceMap.set(key, service);
        }
        return service;
    }

    static getServiceName() {
        return 'trf_cnc';
    }


    PATCH_spacer_trfs_bender_bender_brand_bender_trf_type(callback, body, bender, bender_brand, bender_trf_type, lisectrf_version = null, per_piece = null, sort_mode = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                if (!self.verifyParamIsInteger(bender, false, [])) {
                    throw new OpenApiException("Parameter 'bender' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(bender_brand, false, [])) {
                    throw new OpenApiException("Parameter 'bender_brand' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(bender_trf_type, false, [])) {
                    throw new OpenApiException("Parameter 'bender_trf_type' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(lisectrf_version, true, [])) {
                    throw new OpenApiException("Parameter 'lisectrf_version' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(per_piece, true, [])) {
                    throw new OpenApiException("Parameter 'per_piece' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(sort_mode, true, [])) {
                    throw new OpenApiException("Parameter 'sort_mode' is not a valid number!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                if(lisectrf_version !== null) queryParams['lisectrf_version'] = lisectrf_version;
                if(per_piece !== null) queryParams['per_piece'] = per_piece;
                if(sort_mode !== null) queryParams['sort_mode'] = sort_mode;
                const config = {
                    url: self.getUrl(['spacer_trfs', bender, bender_brand, bender_trf_type], serializedParam),
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
                        self.logResponse('PATCH_spacer_trfs_bender_bender_brand_bender_trf_type', response);
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
                        self.logResponse('PATCH_spacer_trfs_bender_bender_brand_bender_trf_type', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'bender': bender,
                        'bender_brand': bender_brand,
                        'bender_trf_type': bender_trf_type,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['spacer_trfs', bender, bender_brand, bender_trf_type], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_spacer_trfs_bender_bender_brand_bender_trf_type', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_spacer_trfs_bender_bender_brand_bender_trf_type', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_spacer_trfs_bender_bender_brand_bender_trf_type', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
    PATCH_ig_trfs_line_line_brand_line_trf_type(callback, body, line, line_brand, line_trf_type, libar_mode = null, scan_recipe_mach = null, force_mirror_mode = null, lisectrf_version = null, activateDownloadManager = false, uniqueKey = null, isDownload = false) {
        
        var self = this;
        var CancelToken = axios.CancelToken;
        var source = CancelToken.source();
        ensureAccessTokenIsValid(function(accessToken){
            try {
                if (!self.verifyBody(body, [MimeTypes.MIME_APPLICATION_JSON])) {
                    throw new OpenApiException("Invalid MIME type");
                }
                if (!self.verifyParamIsInteger(line, false, [])) {
                    throw new OpenApiException("Parameter 'line' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(line_brand, false, [])) {
                    throw new OpenApiException("Parameter 'line_brand' is not a valid string!");
                }
                
                if (!self.verifyParamIsString(line_trf_type, false, [])) {
                    throw new OpenApiException("Parameter 'line_trf_type' is not a valid string!");
                }
                
                if (!self.verifyParamIsInteger(libar_mode, true, [])) {
                    throw new OpenApiException("Parameter 'libar_mode' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(scan_recipe_mach, true, [])) {
                    throw new OpenApiException("Parameter 'scan_recipe_mach' is not a valid number!");
                }
                
                if (!self.verifyParamIsInteger(force_mirror_mode, true, [])) {
                    throw new OpenApiException("Parameter 'force_mirror_mode' is not a valid number!");
                }
                
                if (!self.verifyParamIsString(lisectrf_version, true, [])) {
                    throw new OpenApiException("Parameter 'lisectrf_version' is not a valid string!");
                }
                
                var headers = {"Authorization" : `Bearer ${accessToken}`};
                var queryParams = {};
                var serializedParam = {};
                headers['Content-Type'] = body.getMimeTypeAsString();
                if(libar_mode !== null) queryParams['libar_mode'] = libar_mode;
                if(scan_recipe_mach !== null) queryParams['scan_recipe_mach'] = scan_recipe_mach;
                if(force_mirror_mode !== null) queryParams['force_mirror_mode'] = force_mirror_mode;
                if(lisectrf_version !== null) queryParams['lisectrf_version'] = lisectrf_version;
                const config = {
                    url: self.getUrl(['ig_trfs', line, line_brand, line_trf_type], serializedParam),
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
                        self.logResponse('PATCH_ig_trfs_line_line_brand_line_trf_type', response);
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
                        self.logResponse('PATCH_ig_trfs_line_line_brand_line_trf_type', err);
                        callback(new OpenApiResponse(err));
                    })
                }
                else if (isDownload != null && isDownload === true) {
                    const downloadParamData = {
                        'line': line,
                        'line_brand': line_brand,
                        'line_trf_type': line_trf_type,
                        'headers': headers,
                        'queryParams': queryParams,
                    }

                    var url = self.getUrl(['ig_trfs', line, line_brand, line_trf_type], queryParams);
                    return (directDownloadConfig(downloadParamData, url, callback))
                }
                else {
                    return axios.request(config)
                        .then(function(response) {
                            self.logResponse('PATCH_ig_trfs_line_line_brand_line_trf_type', response);
                            callback(new OpenApiResponse(response));
                        })
                        .catch(function(err) {
                            self.logResponse('PATCH_ig_trfs_line_line_brand_line_trf_type', err);
                            callback(new OpenApiResponse(err));
                        })
                }
            }
            catch (e) {
                self.logResponse('PATCH_ig_trfs_line_line_brand_line_trf_type', e);
                callback(new OpenApiResponse(e)); // pass exception object to err handler
            }
        });
    }
    
}

export default OpenApiClient_trf_cnc;
