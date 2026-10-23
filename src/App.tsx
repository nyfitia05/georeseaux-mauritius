import { Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Layout } from "@/layout/Layout";
import Home from "@/pages/Home";
import Detection from "@/pages/Detection";
import CartographieReseaux from "@/pages/CartographieReseaux";
import CartographiePatrimoniale from "@/pages/CartographiePatrimoniale";
import Copropriete from "@/pages/Copropriete";
import Secteurs from "@/pages/Secteurs";
import Methodologie from "@/pages/Methodologie";
import APropos from "@/pages/APropos";
import Devis from "@/pages/Devis";
import DevisExpress from "@/pages/DevisExpress";
import NotFound from "@/pages/NotFound";
import SousPage from "@/pages/SousPage";

export default function App() {
  return (
    // honour the OS-level prefers-reduced-motion setting automatically
    // (animations resolve instantly instead of transforming/fading) — the
    // GSAP-driven effects (the map motif draw, the methodology scroll path)
    // are handled separately in their own hooks, since MotionConfig only
    // covers Framer Motion.
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="detection-reseaux-enterres" element={<Detection />} />
          <Route path="cartographie-reseaux" element={<CartographieReseaux />} />
          <Route path="cartographie-patrimoniale" element={<CartographiePatrimoniale />} />
          <Route path="cartographie-reseaux-copropriete" element={<Copropriete />} />
          <Route path="secteurs" element={<Secteurs />} />
          <Route path="methodologie" element={<Methodologie />} />
          <Route path="a-propos" element={<APropos />} />
          <Route path="demander-un-devis" element={<Devis />} />
          <Route path="devis-express" element={<DevisExpress />} />
          {/* Sous-pages SEO (cahier des charges SEO WATER LEAK GROUP, fiches 14 à 17) */}
          <Route path="localisation-canalisations" element={<SousPage id="localisationCanalisations" />} />
          <Route path="detection-reseaux-avant-travaux" element={<SousPage id="detectionAvantTravaux" />} />
          <Route path="localisation-reseaux-irrigation" element={<SousPage id="localisationIrrigation" />} />
          <Route path="cartographie-georeferencement-reseaux" element={<SousPage id="cartographieGeoreferencement" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </MotionConfig>
  );
}
