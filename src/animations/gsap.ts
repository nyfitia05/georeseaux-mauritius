import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registered once, here, so every hook that needs ScrollTrigger can just
// import gsap from this file instead of re-registering the plugin.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
