export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8">
      <div className="max-w-6xl mx-auto px-6 text-center text-slate-400">
        <p>
          &copy; {new Date().getFullYear()} Appala Nithin. All rights reserved.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Business Analyst | Data &amp; Process Analysis
        </p>
      </div>
    </footer>
  );
}
