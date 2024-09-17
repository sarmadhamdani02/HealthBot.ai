import Link from 'next/link';

export default function Home() {
  return  <div className="min-h-screen bg-white flex flex-col justify-between p-6">
  {/* Header */}
  <header className="flex justify-between items-center py-4">
    <h1 className="text-[#00DB0F] text-3xl font-bold">HealthBot</h1>
    <div className="space-x-4">
      <Link href="/login">
        <button className="text-[#00DB0F] border-2 border-[#00DB0F] py-2 px-4 rounded-lg hover:bg-[#00DB0F] hover:text-white transition duration-200">
          Login
        </button>
      </Link>
      <Link href="/signup">
        <button className="text-white bg-[#00DB0F] py-2 px-4 rounded-lg hover:bg-[#00DB0F]/90 transition duration-200">
          Sign Up
        </button>
      </Link>
    </div>
  </header>

  {/* Main Section */}
  <main className="flex flex-col items-center text-center">
    <h2 className="text-[#00DB0F] text-4xl font-bold mb-4">Your Personal Health Assistant</h2>
    <p className="text-gray-600 text-lg mb-8 max-w-xl">
      HealthBot helps you stay on top of your health by connecting you with nearby doctors, tracking your health metrics, and offering personalized health tips — all in one place.
    </p>
    <Link href="/signup">
      <button className="text-white bg-[#00DB0F] py-3 px-6 rounded-full hover:bg-[#00DB0F]/90 transition duration-200 text-lg">
        Get Started
      </button>
    </Link>
  </main>

  {/* Footer */}
  <footer className="w-full flex flex-col items-center mt-12">
    <div className="flex space-x-4">
      <Link href="/login">
        <button className="text-[#00DB0F] border-2 border-[#00DB0F] py-2 px-4 rounded-lg hover:bg-[#00DB0F] hover:text-white transition duration-200">
          Login
        </button>
      </Link>
      <Link href="/signup">
        <button className="text-white bg-[#00DB0F] py-2 px-4 rounded-lg hover:bg-[#00DB0F]/90 transition duration-200">
          Sign Up
        </button>
      </Link>
    </div>
    <p className="text-gray-500 mt-6">© 2024 HealthBot, All Rights Reserved.</p>
  </footer>
</div>

}
