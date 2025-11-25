import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">¡Ups! Algo salió mal.</h2>
                        <p className="text-gray-600 mb-6">
                            Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
                        </p>
                        <details className="text-left bg-gray-50 p-4 rounded mb-6 overflow-auto max-h-40 text-sm text-gray-500">
                            {this.state.error && this.state.error.toString()}
                        </details>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Recargar Página
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
