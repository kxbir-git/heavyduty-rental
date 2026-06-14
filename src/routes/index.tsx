import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KK & Sons Equip — Premium Construction Equipment Rental" },
      { name: "description", content: "Rent top-tier excavators, cranes, and heavy machinery across India. Competitive daily, weekly, and monthly rates with reliable delivery and operator support." },
      { property: "og:title", content: "KK & Sons Equip — Premium Construction Equipment Rental" },
      { property: "og:description", content: "Rent top-tier excavators, cranes, and heavy machinery across India. Competitive daily, weekly, and monthly rates with reliable delivery and operator support." },
      { property: "og:url", content: "https://apex-rentals.lovable.app/" },
    ],
    links: [
      { rel: "canonical", href: "https://apex-rentals.lovable.app/" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: "#fcfbf8" }}
    >
      <img
        data-lovable-blank-page-placeholder="REMOVE_THIS"
        src="https://cdn.gpteng.co/blank-app-v1.svg"
        alt="Your app will live here!"
      />
    </div>
  );
}
