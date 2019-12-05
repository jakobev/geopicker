interface Scripts {
    name: string;
    src: string;
}  
export const ScriptStore: Scripts[] = [
    {name: 'filepicker', src: 'https://api.filestackapi.com/filestack.js'},
    {name: 'leaflet', src: 'https://unpkg.com/leaflet@1.5.1/dist/leaflet.js'}
];