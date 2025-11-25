import React from "react";

export default function LoadingSpinner({ size = "md", message = "Cargando..." }) {
    const sizeClasses = {
        sm: "w-6 h-6 border-2",
        md: "w-10 h-10 border-3",
        lg: "w-16 h-16 border-4",
    };

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div
                className={`${sizeClasses[size]} border-blue-200 border-t-blue-600 rounded-full animate-spin`}
            ></div>
            {message && <p className="mt-4 text-gray-600 text-sm">{message}</p>}
        </div>
    );
}
