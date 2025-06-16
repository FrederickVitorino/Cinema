export function Button (
    {
        text, 
        variant = 'primary',
        size = 'btn-sm',
        type = 'button',
        disabled = false,
        loading = false,
        onClick,
        icon
    }
){
    return (
        <button
            className={`btn btn-${variant} btn-${size}`}
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading ? (
                <span className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true" ></span>
            ) : (
                <>
                    {icon && <i
                    className={`bi bi-${icon}`}></i>}
                    {text}
                </>
            )}
        </button>
    );
}