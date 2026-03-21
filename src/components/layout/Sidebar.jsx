import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";

const Sidebar = () => {
    const { history, setFormData, setHeaderData, setParamData, setJsonText, setAuthData } = useContext(DataContext);

    const loadHistory = (item) => {
        setFormData({ url: item.url, type: item.type });
        setHeaderData(item.headers || []);
        setParamData(item.params || []);
        setJsonText(item.body || '');
        if (item.auth) setAuthData(item.auth);
    };

    return (
        <div className="w-64 bg-base-200 border-r border-base-300 flex-col h-full hidden md:flex">
            <div className="p-3 border-b border-base-300 flex items-center justify-between">
                <span className="font-semibold text-sm text-base-content/80">History</span>
                <button className="btn btn-ghost btn-xs btn-circle"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></button>
            </div>
            
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-2">
                {history.length === 0 ? (
                    <div className="text-sm text-base-content/50 text-center mt-10">No history yet</div>
                ) : (
                    <ul className="menu menu-xs p-0 w-full space-y-1">
                        {history.map((item, index) => (
                            <li key={index} className="w-full">
                                <a onClick={() => loadHistory(item)} className="flex items-center gap-2 p-2 rounded-md hover:bg-base-300 overflow-hidden w-full whitespace-nowrap text-ellipsis">
                                    <span className={`font-bold text-[10px] method-${item.type}`}>{item.type}</span>
                                    <span className="truncate text-xs text-base-content/80">{item.url || 'Untitled Request'}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Sidebar;
