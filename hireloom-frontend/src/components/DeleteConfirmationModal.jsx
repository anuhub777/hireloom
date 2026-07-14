function DeleteConfirmationModal({
    show,
    onCancel,
    onConfirm,
  }) {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl w-[420px] p-8">
  
          <div className="text-center">
  
            <div className="text-6xl mb-4">
              🗑️
            </div>
  
            <h2 className="text-2xl font-bold">
              Delete Application?
            </h2>
  
            <p className="text-gray-500 mt-3">
              This action cannot be undone.
            </p>
  
            <div className="flex gap-3 mt-8">
  
              <button
                onClick={onCancel}
                className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-lg font-semibold"
              >
                Cancel
              </button>
  
              <button
                onClick={onConfirm}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold"
              >
                Delete
              </button>
  
            </div>
  
          </div>
  
        </div>
      </div>
    );
  }
  
  export default DeleteConfirmationModal;