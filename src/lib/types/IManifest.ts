interface IManifest {
    id: number;
    forceXhr: boolean;
    verb: string;
    url: string;
    data?: object;
}

export default IManifest;
