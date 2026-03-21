const ErrorScreen = () => {
    return (
        <div className="border border-base-300 rounded-lg p-8 mt-4 bg-base-200/50 flex flex-col items-center justify-center min-h-[300px]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-error mb-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-xl font-bold mb-2">Could not get any response</h3>
            <p className="text-base-content/70 text-center max-w-md">
                There was an error connecting to the server. Please check your network connection, ensure the URL is correct, and verify that the API supports CORS requests from this domain.
            </p>
        </div>
    )
}

export default ErrorScreen;