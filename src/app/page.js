import './globals.css';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between w-full px-6 py-2 bg-transparent">
        {/* Left Side (Logo and Title) */}
        <div className="flex items-center space-x-3">
          <img src="/favicon.ico" className="w-10 h-10" alt="Logo" />
          <div className='text-xl font-semibold'>
            Gamedoora
          </div>
        </div>
        
        {/* Right Side (Buttons) */}
        <div className="flex items-center gap-x-15">
          <a href="/login/page.js" className="text-white font-medium hover:text-blue transition">Login</a>
          <a href="/auth/signup/page.js" className="text-white font-medium hover:text-blue transition">Sign Up</a>
          <div>About Us</div>
          <div>Contact</div>
          <div></div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-wrap items-center justify-center space-x-32 min-h-screen p-4">
        {/* Login Section */}
        <div className="flex flex-col items-center space-y-6 p-6">
          <div className="text-5xl font-bold">Game ON!</div>
          <p className="text-center">Welcome! Please log in to continue.</p><br />
          <button className="bg-orange-400 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition">
            Let's Play
          </button>
        </div>

        {/* Image Section */}
        <div>
          <img src="/bg.jpg" alt="Game" className="w-[400px] h-auto rounded-lg shadow-md" />
        </div>
      </div>
    </main>
  );
}
