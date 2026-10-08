import { useId, useState, type ChangeEvent, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BaseProps {
  label: string;
  required?: boolean;
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement> & { multiline?: false };
type TextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true };

type FormFieldProps = InputProps | TextareaProps;

/**
 * A floating-label field shared by every input in the devis form: label
 * starts inline as a placeholder-height hint and lifts once the field has
 * content or focus, with a bottom rule that turns yellow on focus instead of
 * the default browser outline glow — small, but it is what keeps the form
 * from reading as a generic Bootstrap form.
 *
 * Cas particulier `type="date"` (retour client : "le design de la date
 * souhaitée n'est pas bon") : un <input type="date"> affiche en permanence
 * ses propres segments natifs (jj/mm/aaaa) et l'icône de calendrier du
 * navigateur — il n'est jamais "vide" à l'écran comme un champ texte, donc
 * le label flottant ne peut pas jouer son rôle de placeholder : il reste
 * superposé aux segments natifs au lieu de flotter proprement au-dessus.
 * Pour ce type uniquement, on revient à un label statique classique
 * au-dessus du champ (comme la plupart des sélecteurs de date sur le web) ;
 * le style flottant est inchangé pour tous les autres types de champs.
 */
export function FormField(props: FormFieldProps) {
  const id = useId();
  const [hasValue, setHasValue] = useState(false);
  const { label, required, multiline, className, onChange, ...rest } = props as FormFieldProps & {
    className?: string;
  };
  const isDate = !multiline && (rest as InputHTMLAttributes<HTMLInputElement>).type === "date";

  const shared =
    "peer w-full border-0 border-b-2 border-blue-100 bg-transparent px-0 pb-2 pt-6 text-base text-ink outline-none transition-colors duration-300 focus:border-yellow-500";

  if (isDate) {
    return (
      <div>
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink-soft">
          {label}
          {required && <span className="text-yellow-600"> *</span>}
        </label>
        <input
          id={id}
          className={cn(
            "w-full border-0 border-b-2 border-blue-100 bg-transparent px-0 py-2.5 text-base text-ink outline-none transition-colors duration-300 focus:border-yellow-500",
            className,
          )}
          onChange={onChange as InputHTMLAttributes<HTMLInputElement>["onChange"]}
          required={required}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      </div>
    );
  }

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          id={id}
          rows={4}
          className={cn(shared, "resize-none", className)}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            setHasValue(event.target.value.length > 0);
            (onChange as TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"])?.(event);
          }}
          required={required}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className={cn(shared, className)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setHasValue(event.target.value.length > 0);
            (onChange as InputHTMLAttributes<HTMLInputElement>["onChange"])?.(event);
          }}
          required={required}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {/* Correction (retour client, capture d'écran "Surface approximative
         de la zone à investiguer, si connue (m²)") : ce label flottant est
         positionné en `absolute` sur une seule ligne de hauteur — un label
         assez long pour passer sur 2 lignes débordait donc par-dessus le
         filet du champ juste en dessous. `truncate` (associé à `right-0`,
         nécessaire pour que la troncature ait une largeur à respecter)
         garde le label sur une seule ligne dans les deux états ; `title`
         restitue le texte complet au survol/lecteur d'écran si jamais il est
         tronqué. Les champs concernés sont aussi élargis (voir Devis.tsx)
         pour que la troncature ne se déclenche pratiquement jamais en
         pratique. */}
      <label
        htmlFor={id}
        title={label}
        className={cn(
          "pointer-events-none absolute left-0 right-0 top-6 truncate pr-2 text-base text-ink-soft transition-all duration-200",
          "peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-600",
          hasValue && "top-0 text-xs text-blue-600",
        )}
      >
        {label}
        {required && <span className="text-yellow-600"> *</span>}
      </label>
    </div>
  );
}
