// frontend/components/address/AddressSkeleton.js
export const AddressSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    <div className="space-y-2">
                        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                </div>
                <div className="flex gap-1">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="mt-3 flex items-center gap-2">
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
        </div>
    );
};