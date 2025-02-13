export default function ResetPassword()
{
  return (
  <main>
    <div >
      <div>
      <h1 className="text-3xl font-bold text-gray-800 text-center m-5">Reset Password</h1>
      <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              placeholder="Enter your username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 outline-none text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Reconfirm Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 outline-none text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 text-white p-3 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  </main>);
}