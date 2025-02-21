import { Form, useActionData } from '@remix-run/react';
import { redirect, json } from '@remix-run/node';
import type { ActionFunction } from '@remix-run/node';
import { api } from '~/utils/api';
import { getSession, commitSession } from '~/utils/session.server';

type ActionData = {
  error?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');

  try {
    const response = await api.createUser({ email: String(email), password: String(password) });
    const userId = response.data.id;

    const session = await getSession(request.headers.get('Cookie'));
    session.set('user_id', userId);

    return redirect('/onboarding/2', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return json({ error: 'Failed to create user' });
  }
};

export default function Index() {
  const actionData = useActionData<ActionData>();

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <div className="w-4 h-4 rounded-full bg-blue-500" />
          <div className="w-4 h-4 rounded-full bg-gray-300" />
          <div className="w-4 h-4 rounded-full bg-gray-300" />
        </div>
        <div className="h-2 bg-gray-200">
          <div className="w-1/3 h-full bg-blue-500" />
        </div>
      </div>

      <Form method="post">
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          {actionData?.error && (
            <div className="text-red-500">{actionData.error}</div>
          )}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        </div>
      </Form>
    </div>
  );
}