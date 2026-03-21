import { useContext } from 'react';
import { DataContext } from '../../context/DataProvider';

const CreateJsonText = () => {
    const { jsonText, setJsonText } = useContext(DataContext);

    const onValueChange = (e) => {
        setJsonText(e.target.value);
    }

    return (
        <div className="w-full">
            <p className="text-sm text-base-content/70 mb-2 font-medium">JSON Body</p>
            <textarea 
                className="textarea textarea-bordered w-full h-[150px] font-mono whitespace-pre bg-base-100 placeholder:text-base-content/30 leading-relaxed text-sm"
                onChange={onValueChange}
                value={jsonText}
                placeholder="{\n  &quot;key&quot;: &quot;value&quot;\n}"
                spellCheck={false}
            />
        </div>
    )
}

export default CreateJsonText;