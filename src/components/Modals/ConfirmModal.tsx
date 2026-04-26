import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    description: string;
    confirmLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal = ({
    isOpen,
    title,
    description,
    confirmLabel = "Delete",
    onConfirm,
    onCancel,
}: ConfirmModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
            {/* backdrop blur effect */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onCancel}
            />

            {/* modal */}
            <div className="relative bg-white dark:bg-(--secondary-bg) rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4 flex flex-col items-center text-center gap-4">
                {/* close */}
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 text-(--secondary-text) hover:text-(--primary-text) transition-colors"
                >
                    <X size={18} />
                </button>

                {/* icon */}
                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertTriangle size={28} className="text-red-500" />
                </div>

                {/* text */}
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-bold text-(--primary-text)">{title}</h2>
                    <p className="text-sm text-(--secondary-text)">{description}</p>
                </div>

                {/* buttons */}
                <div className="flex gap-3 w-full mt-1">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-2.5 rounded-xl border border-(--border) text-sm font-medium text-(--primary-text) hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;