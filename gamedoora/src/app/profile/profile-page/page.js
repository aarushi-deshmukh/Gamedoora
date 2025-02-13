export default function ProfilePage() {
  return (
    <main className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Settings</h2>
        <nav>
          <ul className="space-y-3">
            <li>
              <a href="/privacy" className="block p-3 rounded-lg hover:bg-gray-200 text-gray-700">
                Privacy
              </a>
            </li>
            <li>
              <a href="/security" className="block p-3 rounded-lg hover:bg-gray-200 text-gray-700">
                Security
              </a>
            </li>
            <li>
              <a href="/edit-profile" className="block p-3 rounded-lg hover:bg-gray-200 text-gray-700">
                Edit Profile
              </a>
            </li>
            <li>
              <a href="/change-password" className="block p-3 rounded-lg hover:bg-gray-200 text-gray-700">
                Change Password
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      
      <section className="flex-1 p-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">Profile Page</h1>
          <p className="text-gray-600">Manage your account settings here.</p>
          
          <div className="mt-6 flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-500 text-lg">👤</span>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">Aarushi Deshmukh</p>
              <p className="text-sm text-gray-500">aarushideshmukh8@gmail.com</p>
            </div>
          </div>
          
          <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Edit Profile
          </button>
        </div>
      </section>
    </main>
  );
}