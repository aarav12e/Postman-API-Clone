const ScriptTab = ({ title }) => {
    return (
        <div className="w-full h-full">
            <p className="text-xs text-base-content/60 mb-2 font-medium">Write your {title} in JavaScript here.</p>
            <textarea 
                className="textarea textarea-bordered w-full h-[150px] font-mono whitespace-pre bg-base-100"
                placeholder="// Enter JavaScript here..."
                readOnly
            ></textarea>
        </div>
    )
}

export default ScriptTab;
