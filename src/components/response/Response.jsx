import { useState } from 'react';

const syntaxHighlight = (json) => {
    if (typeof json !== 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'json-number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'json-key';
            } else {
                cls = 'json-string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'json-boolean';
        } else if (/null/.test(match)) {
            cls = 'json-null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

const Response = ({ data }) => {
    const [tab, setTab] = useState('Body');
    
    if (!data || Object.keys(data).length === 0) {
        return (
            <div className="mt-8 border border-base-300 rounded-lg p-8 bg-base-100 flex flex-col items-center justify-center min-h-[300px]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-base-content/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                <p className="text-base-content/50 font-medium">Enter the URL and click Send to get a response</p>
            </div>
        )
    }

    const { status, statusText, time, size, headers, data: responseBody } = data;

    const getStatusColor = (code) => {
        if (code >= 200 && code < 300) return 'text-success';
        if (code >= 300 && code < 400) return 'text-info';
        if (code >= 400 && code < 500) return 'text-warning';
        return 'text-error';
    };

    let highlightedJson = '';
    try {
        const jsonStr = JSON.stringify(responseBody, null, 2);
        highlightedJson = syntaxHighlight(jsonStr);
    } catch {
        highlightedJson = syntaxHighlight(String(responseBody));
    }

    return (
        <div className="mt-8 border border-base-300 rounded-lg bg-base-100/50 flex flex-col min-h-[400px]">
            <div className="flex justify-between items-center p-3 border-b border-base-300 bg-base-200/30">
                <div className="flex gap-4">
                    <button onClick={() => setTab('Body')} className={`text-sm font-semibold pb-1 border-b-2 ${tab === 'Body' ? 'border-primary text-primary' : 'border-transparent text-base-content/60 hover:text-base-content'}`}>Body</button>
                    <button onClick={() => setTab('Headers')} className={`text-sm font-semibold pb-1 border-b-2 ${tab === 'Headers' ? 'border-primary text-primary' : 'border-transparent text-base-content/60 hover:text-base-content'}`}>Headers</button>
                </div>
                
                <div className="flex gap-4 text-xs font-mono">
                    <div className="flex gap-1">
                        <span className="text-base-content/50">Status:</span>
                        <span className={`font-bold ${getStatusColor(status)}`}>{status} {statusText}</span>
                    </div>
                    <div className="flex gap-1">
                        <span className="text-base-content/50">Time:</span>
                        <span className="font-bold text-success">{time} ms</span>
                    </div>
                    <div className="flex gap-1">
                        <span className="text-base-content/50">Size:</span>
                        <span className="font-bold text-success">{size}</span>
                    </div>
                </div>
            </div>

            <div className="p-4 flex-1 overflow-auto">
                {tab === 'Body' && (
                    <pre 
                        className="json-pre"
                        dangerouslySetInnerHTML={{ __html: highlightedJson }}
                    />
                )}
                {tab === 'Headers' && (
                    <div className="overflow-x-auto">
                        <table className="table table-xs w-full">
                            <thead>
                                <tr>
                                    <th>Key</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {headers && Object.entries(headers).map(([key, value]) => (
                                    <tr key={key}>
                                        <td className="font-mono text-xs w-1/4">{key}</td>
                                        <td className="font-mono text-xs break-all">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Response;