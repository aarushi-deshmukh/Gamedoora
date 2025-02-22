import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-1/4 bg-gray-100 p-4">
      <h2 className="text-lg font-semibold mb-4">Profile Options</h2>
      <ul className="space-y-2">
        <li>
          <button className="w-full bg-blue-500 text-white py-2 rounded">Edit</button>
        </li>
        <li>
          <button className="w-full bg-yellow-500 text-white py-2 rounded">Update</button>
        </li>
        <li>
          <button className="w-full bg-red-500 text-white py-2 rounded">Delete</button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
