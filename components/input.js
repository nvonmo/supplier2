
export default function Input({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border px-4 py-2 rounded-xl mb-4"
    />
  );
}
    