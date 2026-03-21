import { useState, useContext } from 'react';

import CreateTable from './CreateTable';
import CreateJsonText from './CreateJsonText';
import AuthTab from './AuthTab';
import ScriptTab from './ScriptTab';
import { DataContext } from '../../context/DataProvider';

const SelectTab = () => {
    const [value, setValue] = useState(0);

    const { paramData, setParamData, headerData, setHeaderData } = useContext(DataContext);

    const tabs = ['Params', 'Authorization', 'Headers', 'Body', 'Pre-request Script', 'Tests'];

    return (
        <div className="mt-4 border border-base-300 rounded-lg p-4 bg-base-100/50">
            <div className="tabs tabs-bordered mb-4">
                {tabs.map((tab, index) => (
                    <a 
                        key={index} 
                        className={`tab tab-sm font-semibold capitalize ${value === index ? 'tab-active tab-active-postman' : 'text-base-content/60'}`} 
                        onClick={() => setValue(index)}
                    >
                        {tab}
                    </a>
                ))}
            </div>
            
            <div className="mt-2 min-h-[200px]">
                <div className={value === 0 ? 'block' : 'hidden'}>
                    <CreateTable text={'Query Params'} data={paramData} setData={setParamData} />
                </div>
                <div className={value === 1 ? 'block' : 'hidden'}>
                    <AuthTab />
                </div>
                <div className={value === 2 ? 'block' : 'hidden'}>
                    <CreateTable text={'Headers'} data={headerData} setData={setHeaderData} />
                </div>
                <div className={value === 3 ? 'block' : 'hidden'}>
                    <CreateJsonText />
                </div>
                <div className={value === 4 ? 'block' : 'hidden'}>
                    <ScriptTab title="Pre-request Script" />
                </div>
                <div className={value === 5 ? 'block' : 'hidden'}>
                    <ScriptTab title="Tests" />
                </div>
            </div>
        </div>
    )
}

export default SelectTab;