export default function Input({ value, handler, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => handler(e.target.value)}
      placeholder={placeholder}
    />
  );
}
