export default function Stats({ items }) {
  if (items.length === 0)
    return (
      <p className="stats">Start adding some items to your packing list 🚀</p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You're all set!"
          : `You have ${numItems} items in your list, and you still need to pack ${numItems - numPacked} more! (${percentage}% packed)`}
      </em>
    </footer>
  );
}
