import { useContext } from 'react';
import { DataContext } from '../../context/DataProvider';

const Form = ({ onSendClick, isLoading }) => {
    const { formData, setFormData } = useContext(DataContext);

    const onUrlChange = (e) => {
        setFormData({ ...formData, url: e.target.value });
    }

    const handleChange = (e) => {
        setFormData({ ...formData, type: e.target.value });
    }

    return (
        <div className="join w-full shadow-sm">
            <select 
                className="select select-bordered join-item w-32 bg-base-200 font-semibold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                value={formData.type || 'GET'} 
                onChange={handleChange}
            >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
                <option value="HEAD">HEAD</option>
                <option value="OPTIONS">OPTIONS</option>
            </select>
            <input 
                type="text" 
                placeholder="Enter request URL"
                className="input input-bordered join-item flex-1 bg-base-100 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono text-sm" 
                value={formData.url || ''}
                onChange={onUrlChange}
            />
            <button 
                className="btn btn-primary join-item w-24 text-white font-bold" 
                onClick={onSendClick}
                disabled={isLoading}
            >
                {isLoading ? <span className="loading loading-spinner loading-sm"></span> : 'Send'}
            </button>
        </div>
    )
}

export default Form;