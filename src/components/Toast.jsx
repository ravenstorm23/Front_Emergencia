import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

const Toast = ({ type = "info", message, onClose, duration = 5000 }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const configs = {
        success: {
            icon: CheckCircle,
            bgColor: "bg-green-50",
            borderColor: "border-green-500",
            textColor: "text-green-800",
            iconColor: "text-green-500",
        },
        error: {
            icon: XCircle,
            bgColor: "bg-red-50",
            borderColor: "border-red-500",
            textColor: "text-red-800",
            iconColor: "text-red-500",
        },
        warning: {
            icon: AlertCircle,
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-500",
            textColor: "text-yellow-800",
            iconColor: "text-yellow-500",
        },
        info: {
            icon: Info,
            bgColor: "bg-blue-50",
            borderColor: "border-blue-500",
            textColor: "text-blue-800",
            iconColor: "text-blue-500",
        },
    };

    const config = configs[type];
    const Icon = config.icon;

    return (
        <div
            className={`fixed top-4 right-4 z-50 transition-all duration-300 transform ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                }`}
        >
            <div
                className={`${config.bgColor} ${config.borderColor} border-l-4 p-4 rounded-lg shadow-lg max-w-md flex items-start gap-3`}
            >
                <Icon className={`${config.iconColor} w-5 h-5 flex-shrink-0 mt-0.5`} />
                <p className={`${config.textColor} text-sm font-medium flex-1`}>{message}</p>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(onClose, 300);
                    }}
                    className={`${config.textColor} hover:opacity-70 transition`}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default Toast;
