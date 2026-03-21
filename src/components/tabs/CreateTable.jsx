import { useState } from 'react';
import AddRow from './AddRow';

const CreateTable = ({ text, data, setData }) => {
    const [rows, addRows] = useState([0]);
    
    return (
        <div className="w-full">
            <p className="text-sm text-base-content/70 mb-2 font-medium">{text}</p>
            <div className="overflow-x-auto border border-base-300 rounded-md">
                <table className="table table-xs w-full mb-0 border-collapse">
                    <thead className="bg-base-200 uppercase text-xs">
                        <tr>
                            <th className="w-8 border-b border-base-300"></th>
                            <th className="border-l border-b border-base-300 w-5/12">Key</th>
                            <th className="border-l border-b border-base-300 w-auto">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows.map((row, index) => {
                                return <AddRow 
                                    addRows={addRows} 
                                    rowId={index} 
                                    key={index}
                                    setData={setData}
                                    data={data} 
                                />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CreateTable;