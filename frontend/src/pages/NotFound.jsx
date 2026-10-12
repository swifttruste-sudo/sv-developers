import PageMeta from "@/components/common/PageMeta";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section data-testid="not-found-page" className="navy-panel flex min-h-[80vh] flex-col items-center justify-center px-6 py-32 text-center">
      <PageMeta title="Page Not Found" description="The page you're looking for doesn't exist at SV Developers." />
      <p className="text-gold-gradient font-display text-7xl font-bold sm:text-8xl">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
        This plot is still open land.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-white/65">
        The page you're looking for doesn't exist or has moved. Let's get you
        back to solid ground.
      </p>
      <div className="mt-9 flex flex-col gap-4 sm:flex-row">
        <Link to="/" data-testid="not-found-home-btn" className="btn-gold">
          Back to Home <ArrowRight size={15} />
        </Link>
        <Link to="/projects" data-testid="not-found-projects-btn" className="btn-ghost-light">
          Explore Projects
        </Link>
      </div>
    </section>
  );
}
