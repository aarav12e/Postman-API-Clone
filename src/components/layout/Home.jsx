import { useContext, useState } from 'react';
import { DataContext } from '../../context/DataProvider';
import { checkParams } from '../../utils/common-utils';
import { getData } from '../../service/api';

import Form from "../request/Form";
import SelectTab from '../tabs/SelectTab';
import SnackBar from '../ui/SnackBar';
import Response from '../response/Response';
import ErrorScreen from '../response/ErrorScreen';

const Home = () => {
    
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [errorResponse, setErrorResponse] = useState(false);
    const [apiResponse, setApiResponse] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { formData, jsonText, paramData, headerData, authData, history, setHistory } = useContext(DataContext);

    const onSendClick = async () => {
        if(!checkParams(formData, jsonText, paramData, headerData, setErrorMsg)) {
            setError(true);
            return false;
        }

        setIsLoading(true);
        setErrorResponse(false);

        let response = await getData(formData, jsonText, paramData, headerData, authData);
        
        setIsLoading(false);

        const newHistoryItem = {
            url: formData.url,
            type: formData.type,
            headers: headerData,
            params: paramData,
            body: jsonText,
            auth: authData,
            timestamp: new Date().toISOString()
        };
        const newHistory = [newHistoryItem, ...history.filter(h => h.url !== formData.url || h.type !== formData.type)].slice(0, 20);
        setHistory(newHistory);

        if (response === 'error') {
            setErrorResponse(true);
            return;
        }
        
        setApiResponse(response);
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-base-100 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="max-w-5xl mx-auto space-y-6">
                    <Form onSendClick={onSendClick} isLoading={isLoading} />
                    <SelectTab />
                    { errorResponse ? <ErrorScreen /> : <Response data={apiResponse} /> }
                </div>
            </div>
            { error && <SnackBar errorMsg={errorMsg} error={error} setError={setError} /> }
        </div>
    )
}

export default Home;