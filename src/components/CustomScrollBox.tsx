export default function CustomScrollBox() {
  return (
    <div className="max-h-[300px] overflow-y-auto p-4 bg-base-200 rounded-lg shadow">
      <div className="space-y-4 text-sm">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>
            {i + 1}. Ceci est une ligne de texte scrollable avec une barre de défilement personnalisée.
          </p>
        ))}
      </div>
    </div>
  );
}
