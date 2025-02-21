// app/routes/data.tsx
import { useLoaderData } from '@remix-run/react';
import { type LoaderFunction } from '@remix-run/node';
import { api } from '~/utils/api';

export const loader: LoaderFunction = async () => {
  const response = await api.getData();
  return new Response(JSON.stringify({ users: response.data }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

interface User {
  id: string;
  email: string;
  user_profiles: Array<{
    about_me: string | null;
    street_address: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    birthdate: string | null;
  }>;
}

export default function Data() {
  const { users } = useLoaderData<{ users: User[] }>();

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">User Data</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">About Me</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Address</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Birthdate</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => {
              const profile = user.user_profiles[0];
              return (
                <tr key={user.id}>
                  <td className="px-6 py-4 text-sm">{user.email}</td>
                  <td className="px-6 py-4 text-sm">{profile?.about_me || '-'}</td>
                  <td className="px-6 py-4 text-sm">
                    {profile?.street_address 
                      ? `${profile.street_address}, ${profile.city}, ${profile.state} ${profile.zip}`
                      : '-'
                    }
                  </td>
                  <td className="px-6 py-4 text-sm">{profile?.birthdate || '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}