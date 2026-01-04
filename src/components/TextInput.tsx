'use client';

interface TextInputProps {
  onSubmit: (text: string) => void;
  onBack: () => void;
}

export default function TextInput({ onSubmit, onBack }: TextInputProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      'text'
    ) as HTMLInputElement;
    onSubmit(input.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Add Custom Text
        </h1>
        <p className="text-gray-600 mb-6">
          Add a message to your photo strips (optional)
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Text Message
            </label>
            <textarea
              id="text"
              name="text"
              placeholder="Enter your message here..."
              rows={4}
              maxLength={100}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-2">Max 100 characters</p>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Next: Camera
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
