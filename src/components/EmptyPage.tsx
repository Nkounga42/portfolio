import { PackageOpen } from "lucide-react";

 
export default function EmptyPage() {
  return (
    <div className="text-center w-full max-w-md mx-auto mt-10">
      <div>
        <div className="text-4xl mb-2"><PackageOpen /></div>
        <p>Page vide</p>
      </div>
      <div>
        <p className="mb-4">Il n'y a aucun contenu à afficher pour le moment.</p>
        <button >
          <a href="#">Retour à l'accueil</a>
        </button>
      </div>
    </div>
  );
}
