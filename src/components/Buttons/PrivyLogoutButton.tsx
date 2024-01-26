"use client";

export const PrivyLogoutButton = ({ handleClick }: ButtonProps) => {
  return (
    <button
      className="border border-gray-400 rounded-md p-4 bg-gray-400 text-black hover:text-white hover:bg-gray-500"
      onClick={handleClick}
    >
      Log out
    </button>
  );
};
