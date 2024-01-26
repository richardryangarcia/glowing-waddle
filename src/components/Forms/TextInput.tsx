import { ChangeEvent } from "react";

type TextInputProps = {
  label: string;
  name: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  error: string;
  showError: boolean;
};

export const TextInput = ({
  name,
  handleChange,
  handleBlur,
  label,
  error,
  showError,
}: TextInputProps) => {
  const errorStyles =
    showError && error ? "border border-red-500" : "border border-gray-500";
  return (
    <div className="flex flex-col">
      <label className="p-1" htmlFor={name}>
        {label}
      </label>
      <input
        className={`bg-black text-white rounded-md p-2 focus:outline-none ${errorStyles} `}
        type="text"
        id={name}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      {showError && error && (
        <p className="text-red-500 p-1 text-xs">{error}</p>
      )}
    </div>
  );
};
