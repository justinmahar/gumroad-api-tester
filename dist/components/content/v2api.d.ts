export declare const v2Api: RESTEndpoint[];
export type Param = {
    k: string;
    v: string;
};
export type RESTEndpoint = {
    endpointUrl: string;
    method: string;
    description: string;
    params: Param[];
};
