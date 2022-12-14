/* tslint:disable */
/* eslint-disable */
/**
 * Hios API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import * as globalAxios from 'axios';
import { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface CreateHioRequest
 */
export interface CreateHioRequest {
    /**
     * The user\'s id
     * @type {string}
     * @memberof CreateHioRequest
     */
    'userId': string;
    /**
     * The target user\'s id
     * @type {string}
     * @memberof CreateHioRequest
     */
    'targetUserId': string;
}
/**
 * 
 * @export
 * @interface Hio
 */
export interface Hio {
    /**
     * The hio id
     * @type {string}
     * @memberof Hio
     */
    'id'?: string;
    /**
     * The user id.
     * @type {string}
     * @memberof Hio
     */
    'userId'?: string;
    /**
     * The target user id.
     * @type {string}
     * @memberof Hio
     */
    'targetUserId'?: string;
    /**
     * The date and time in which the hio was created
     * @type {string}
     * @memberof Hio
     */
    'createdAt'?: string;
}

/**
 * HiosApi - axios parameter creator
 * @export
 */
export const HiosApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create a hio
         * @summary Create a hio
         * @param {CreateHioRequest} createHioRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createHio: async (createHioRequest: CreateHioRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createHioRequest' is not null or undefined
            assertParamExists('createHio', 'createHioRequest', createHioRequest)
            const localVarPath = `/hios`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = createHioRequest

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * HiosApi - functional programming interface
 * @export
 */
export const HiosApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = HiosApiAxiosParamCreator(configuration)
    return {
        /**
         * Create a hio
         * @summary Create a hio
         * @param {CreateHioRequest} createHioRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createHio(createHioRequest: CreateHioRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Hio>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createHio(createHioRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios as unknown as AxiosInstance, BASE_PATH, configuration);
        },
    }
};

/**
 * HiosApi - factory interface
 * @export
 */
export const HiosApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = HiosApiFp(configuration)
    return {
        /**
         * Create a hio
         * @summary Create a hio
         * @param {CreateHioRequest} createHioRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createHio(createHioRequest: CreateHioRequest, options?: any): AxiosPromise<Hio> {
            return localVarFp.createHio(createHioRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * HiosApi - object-oriented interface
 * @export
 * @class HiosApi
 * @extends {BaseAPI}
 */
export class HiosApi extends BaseAPI {
    /**
     * Create a hio
     * @summary Create a hio
     * @param {CreateHioRequest} createHioRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HiosApi
     */
    public createHio(createHioRequest: CreateHioRequest, options?: AxiosRequestConfig) {
        return HiosApiFp(this.configuration).createHio(createHioRequest, options).then((request) => request(this.axios, this.basePath));
    }
}


