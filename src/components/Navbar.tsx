import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="font-bold text-xl text-slate-900 tracking-tight">
            Appala Nithin
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">About</Link>
            <Link href="#experience" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">Experience</Link>
            <Link href="#projects" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">Projects</Link>
            <Link href="#skills" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">Skills</Link>
            <Link href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">Contact</Link>
            <Link 
              href="/login" 
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
