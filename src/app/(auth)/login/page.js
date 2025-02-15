export default function Login()
{
  return (
  <main>
    <div >
      <div>
      <h1 className="text-3xl font-bold text-gray-800 text-center m-5">Login</h1>
      <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 outline-none text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 outline-none text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 text-white p-3 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Forgot your password?{" "}
          <a href="/reset-password" className="text-indigo-600 hover:underline">Reset here</a>
        </p>
      </div>
    </div>
  </main>);
}