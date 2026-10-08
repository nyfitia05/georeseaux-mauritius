import { useCallback, useState } from "react";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";
import { AGENCES, type Agence } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import clsx from "clsx";

const LYON_CENTER = { lat: AGENCES[0].lat, lng: AGENCES[0].lng };
const DEFAULT_ZOOM = 12;
const FOCUS_ZOOM = 13;

const MAP_CONTAINER_STYLE: React.CSSProperties = { width: "100%", height: "100%" };

/**
 * Bloc "Nos agences" — présent sur les 4 pages. Carte Google Maps réelle
 * (pas une image) : cliquer une adresse recentre et ouvre l'info-bulle
 * correspondante ; cliquer un marker fait la même chose dans l'autre sens.
 */
export function AgencesMap() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useJsApiLoader({
    id: "georeseaux-google-map",
    googleMapsApiKey: apiKey ?? "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const onLoad = useCallback((mapInstance: google.maps.Map) => setMap(mapInstance), []);
  const onUnmount = useCallback(() => setMap(null), []);

  function focusAgence(agence: Agence) {
    setActiveId(agence.id);
    if (map) {
      map.panTo({ lat: agence.lat, lng: agence.lng });
      map.setZoom(FOCUS_ZOOM);
    }
  }

  const activeAgence = AGENCES.find((agence) => agence.id === activeId) ?? null;

  return (
    <section className="bg-brand-blue-light">
      <div className="grid lg:grid-cols-2">
        <Reveal className="flex items-center px-5 py-10 sm:px-6 sm:py-14 lg:px-12">
          <div>
            <SectionHeading>Nos agences</SectionHeading>
            <ul className="mt-6 space-y-5">
              {AGENCES.map((agence) => (
                <li key={agence.id}>
                  <button
                    type="button"
                    onClick={() => focusAgence(agence)}
                    className={clsx(
                      "text-left transition-colors duration-200",
                      activeId === agence.id ? "text-brand-blue" : "text-ink-900 hover:text-brand-blue"
                    )}
                  >
                    <p className="font-body text-[15px] font-bold">{agence.label} :</p>
                    <p className="font-body text-[15px] text-ink-700">
                      {agence.address}, {agence.city}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="h-[360px] w-full lg:h-full lg:min-h-[440px]">
          {!apiKey || loadError ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-ink-300/20 px-6 text-center">
              <p className="font-body text-sm font-semibold text-ink-700">
                Carte indisponible pour le moment.
              </p>
              <p className="font-body text-xs text-ink-500">
                Ajoute ta clé Google Maps dans <code>.env</code> (variable{" "}
                <code>VITE_GOOGLE_MAPS_API_KEY</code>) pour l'activer.
              </p>
            </div>
          ) : !isLoaded ? (
            <div className="flex h-full w-full items-center justify-center bg-ink-300/20">
              <p className="font-body text-sm text-ink-500">Chargement de la carte…</p>
            </div>
          ) : (
            <GoogleMap
              mapContainerStyle={MAP_CONTAINER_STYLE}
              center={LYON_CENTER}
              zoom={DEFAULT_ZOOM}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              {AGENCES.map((agence) => (
                <Marker
                  key={agence.id}
                  position={{ lat: agence.lat, lng: agence.lng }}
                  onClick={() => focusAgence(agence)}
                />
              ))}

              {activeAgence && (
                <InfoWindow
                  position={{ lat: activeAgence.lat, lng: activeAgence.lng }}
                  onCloseClick={() => setActiveId(null)}
                >
                  <div className="font-body text-sm text-ink-900">
                    <strong>{activeAgence.label}</strong>
                    <br />
                    {activeAgence.address}, {activeAgence.city}
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          )}
        </div>
      </div>
    </section>
  );
}
