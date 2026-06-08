import { symbols } from "@/data";

const Footer = () => {
  return (
    <footer className="border-t border-surface-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg pb-2 animate-pulse">{symbols.motor}</span>
            <span className="font-display font-semibold text-surface-700">
              Moto<span className="text-brand-500">Trust</span>
            </span>
          </div>
          <p className="text-xs text-surface-400">
            © {new Date().getFullYear()} MotoTrust. Built in Wa, Upper West.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
