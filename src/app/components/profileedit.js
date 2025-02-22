import React from 'react';

const ProfileEdit = () => {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">Edit Info</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input type="text" className="mt-1 block w-full border rounded-md p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="mt-1 block w-full border rounded-md p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea className="mt-1 block w-full border rounded-md p-2" rows="4"></textarea>
        </div>
        <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded">Save Changes</button>
      </form>
    </section>
  );
};

export default ProfileEdit;
