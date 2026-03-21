import { useEffect } from 'react';

const SnackBar = ({ errorMsg, error, setError }) => {
    
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [error, setError]);

    if (!error) return null;

    return (
        <div className="toast toast-bottom toast-center z-50">
            <div className="alert alert-error shadow-lg py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-sm font-medium">{errorMsg}</span>
                <button onClick={() => setError(false)} className="btn btn-ghost btn-xs btn-circle ml-2">✕</button>
            </div>
        </div>
    )
}

export default SnackBar;