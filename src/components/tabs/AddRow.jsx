import { useState, useEffect } from 'react';

const AddRow = ({ addRows, rowId, data, setData }) => {
    const [checkCheckbox, setCheckCheckbox] = useState(false);
    
    // Sync checkbox state with actual data (useful for when history populates it)
    useEffect(() => {
        const item = data.find(entry => entry.id === rowId);
        if (item && item.check) {
            setCheckCheckbox(item.check);
            if (rowId === data.length - 1) { 
                addRows(oldArr => oldArr.includes(rowId + 1) ? oldArr : [...oldArr, rowId + 1]);
            }
        }
    }, [data, rowId, addRows]);

    const handleChange = (e) => {
        let result = data.find(entry => entry.id === Number(e.target.name)) || { id: rowId, key: '', value: '' };
        
        const isChecked = e.target.checked;
        setCheckCheckbox(isChecked);

        if (isChecked && !data.find(d => d.id === rowId)) {
            addRows(oldArr => oldArr.includes(rowId + 1) ? oldArr : [...oldArr, rowId + 1]);
        }
        
        result = { ...result, id: rowId, check: isChecked };
        
        let index = data.findIndex((value) => value.id === Number(e.target.name));
        if (index === -1) {
            setData(oldArr => [...oldArr, result]);
        } else {
            const newArray = [...data];
            newArray[index] = result;
            setData(newArray);    
        }
    }
    
    const onTextChange = (e) => {
        let result = data.find(entry => entry.id === rowId) || { id: rowId, check: false };
        result = { ...result, [e.target.name]: e.target.value };

        let index = data.findIndex((value) => value.id === rowId);
        
        if (index === -1) {
            setData(oldArr => [...oldArr, result]);
        } else {
            const newArray = [...data];
            newArray[index] = result;
            setData(newArray);    
        }
    }

    const entry = data.find(d => d.id === rowId);
    const keyVal = entry ? entry.key : '';
    const valVal = entry ? entry.value : '';
    
    return (
        <tr className="hover:bg-base-200/50 transition-colors">
            <td className="p-0 text-center align-middle border-t border-base-300 w-8 h-8">
                <input 
                    type="checkbox"
                    checked={checkCheckbox}
                    className="checkbox checkbox-xs rounded-sm mx-auto my-auto block checkbox-primary" 
                    name={rowId.toString()}
                    onChange={handleChange} 
                />
            </td>
            <td className="p-0 border-l border-t border-base-300">
                <input 
                    type="text"
                    className="input input-ghost input-xs w-full focus:outline-none focus:bg-base-200 rounded-none h-8 font-mono text-sm leading-8"
                    name="key"
                    placeholder="Key"
                    value={keyVal}
                    onChange={onTextChange}
                />
            </td>
            <td className="p-0 border-l border-t border-base-300">
                <input 
                    type="text"
                    className="input input-ghost input-xs w-full focus:outline-none focus:bg-base-200 rounded-none h-8 font-mono text-sm leading-8"
                    name="value"
                    placeholder="Value"
                    value={valVal}
                    onChange={onTextChange}
                />
            </td>
        </tr>
    )
}

export default AddRow;