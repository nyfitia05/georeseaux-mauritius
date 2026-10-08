/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  /** Clé publique Web3Forms (web3forms.com) utilisée pour l'envoi réel du
   * formulaire "Demander un devis" — voir .env.example. Cette clé est faite
   * pour être exposée côté client, elle ne donne aucun accès au compte. */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
