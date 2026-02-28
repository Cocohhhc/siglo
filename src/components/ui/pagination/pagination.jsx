import clsx from 'clsx';

export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null;

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex items-center justify-center gap-4 mt-6 py-4">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={clsx(
                    "px-4 py-2 rounded-xl font-bold transition-all duration-200 border",
                    currentPage === 1 
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed" 
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:shadow-md active:scale-95"
                )}
            >
                Anterior
            </button>

            <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                    Página
                </span>
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-(--color-500) text-white font-bold shadow-sm">
                    {currentPage}
                </span>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                    de {totalPages}
                </span>
            </div>

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={clsx(
                    "px-4 py-2 rounded-xl font-bold transition-all duration-200 border",
                    currentPage === totalPages 
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed" 
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:shadow-md active:scale-95"
                )}
            >
                Siguiente
            </button>
        </div>
    );
}
