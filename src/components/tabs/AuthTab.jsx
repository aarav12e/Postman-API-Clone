import { useContext } from 'react';
import { DataContext } from '../../context/DataProvider';

const AuthTab = () => {
    const { authData, setAuthData } = useContext(DataContext);

    return (
        <div className="flex gap-6 mt-4">
            <div className="w-1/4 max-w-[200px] border-r border-base-300 pr-4">
                <span className="text-xs font-semibold uppercase text-base-content/60 mb-2 block">Type</span>
                <select 
                    className="select select-bordered select-sm w-full font-medium"
                    value={authData.type}
                    onChange={(e) => setAuthData({...authData, type: e.target.value})}
                >
                    <option value="none">No Auth</option>
                    <option value="bearer">Bearer Token</option>
                    <option value="basic">Basic Auth</option>
                </select>
                <p className="text-[10px] text-base-content/50 mt-4 leading-tight">
                    The authorization header will be automatically generated when you send the request.
                </p>
            </div>
            <div className="flex-1">
                {authData.type === 'none' && (
                    <div className="text-sm text-base-content/60 flex items-center justify-center h-full min-h-[100px]">
                        This request does not use any authorization.
                    </div>
                )}
                {authData.type === 'bearer' && (
                    <div className="max-w-xl">
                        <label className="label">
                            <span className="label-text font-semibold">Token</span>
                        </label>
                        <input 
                            type="text" 
                            className="input input-sm input-bordered w-full font-mono"
                            placeholder="Token"
                            value={authData.token || ''}
                            onChange={(e) => setAuthData({...authData, token: e.target.value})}
                        />
                    </div>
                )}
                {authData.type === 'basic' && (
                    <div className="max-w-xl space-y-2">
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Username</span>
                            </label>
                            <input 
                                type="text" 
                                className="input input-sm input-bordered w-full"
                                placeholder="Username"
                                value={authData.username || ''}
                                onChange={(e) => setAuthData({...authData, username: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Password</span>
                            </label>
                            <input 
                                type="password" 
                                className="input input-sm input-bordered w-full"
                                placeholder="Password"
                                value={authData.password || ''}
                                onChange={(e) => setAuthData({...authData, password: e.target.value})}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AuthTab;
