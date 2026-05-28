// components/admin/FormInput.jsx
'use client';

export const FormInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = "text",
  required = false,
  placeholder = "",
  rows = 3,
  className = ""
}) => {
  const baseClasses = "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent";

  if (type === "textarea") {
    return (
      <div className={className}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          className={baseClasses}
        />
      </div>
    );
  }

  if (type === "number") {
    return (
      <div className={className}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={baseClasses}
        />
      </div>
    );
  }

  if (type === "checkbox") {
    return (
      <div className={`flex items-center ${className}`}>
        <input
          type="checkbox"
          name={name}
          checked={value}
          onChange={onChange}
          className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
        <label className="ml-2 text-sm text-gray-700">
          {label}
        </label>
      </div>
    );
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={baseClasses}
      />
    </div>
  );
};