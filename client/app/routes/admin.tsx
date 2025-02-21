import { Form, useLoaderData } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { api } from '~/utils/api';

type OnboardingComponent = {
  component_name: 'about_me' | 'address' | 'birthdate';
  page_number: number;
};

export const loader: LoaderFunction = async () => {
    try {
      console.log('Attempting to fetch config in admin loader');
      const response = await api.getConfig();
      
      console.log('Config fetch response:', JSON.stringify(response, null, 2));
      
      const config = Array.isArray(response.data) ? response.data : [];
      
      return json({ 
        config, 
        rawResponse: response 
      });
    } catch (error) {
      console.error('Error in admin loader:', error);
      return json({ 
        config: [], 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, { status: 500 });
    }
};
  
export const action: ActionFunction = async ({ request }) => {
    try {
      const form = await request.formData();
      console.log('Form data received:', Object.fromEntries(form));
  
      const components: OnboardingComponent[] = [];
      (['about_me', 'address', 'birthdate'] as const).forEach(name => {
        const page = form.get(name);
        console.log(`Component ${name}:`, page);
        if (page) {
          components.push({
            component_name: name,
            page_number: Number(page)
          });
        }
      });
  
      console.log('Attempting to update config:', components);
      const result = await api.updateConfig(components);
      console.log('Config update result:', result);
  
      return redirect('/data');
    } catch (error) {
      console.error('Error in admin action:', error);
      return json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, { status: 500 });
    }
};

export default function Admin() {
  const { config, error } = useLoaderData<typeof loader>();

  const findComponentPage = (componentName: OnboardingComponent['component_name']) => 
    config.find((c: OnboardingComponent) => c.component_name === componentName)?.page_number || '';

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Onboarding Configuration</h1>

      {error && (
        <div className="bg-red-100 p-4 mb-4 rounded">
          <p className="text-red-600">Error: {error}</p>
        </div>
      )}

      {!config || config.length === 0 ? (
        <div className="bg-yellow-100 p-4 mb-4 rounded">
          <p className="text-yellow-600">No configuration found. Using default configuration.</p>
        </div>
      ) : null}

      <Form method="post" className="space-y-8">
        <div className="grid gap-6">
          <div className="border p-4 rounded">
            <h2 className="font-semibold mb-3">About Me Component</h2>
            <select 
              name="about_me" 
              className="w-full p-2 border rounded"
              defaultValue={findComponentPage('about_me')}
            >
              <option value="">Don't show</option>
              <option value="2">Page 2</option>
              <option value="3">Page 3</option>
            </select>
          </div>

          <div className="border p-4 rounded">
            <h2 className="font-semibold mb-3">Address Component</h2>
            <select 
              name="address" 
              className="w-full p-2 border rounded"
              defaultValue={findComponentPage('address')}
            >
              <option value="">Don't show</option>
              <option value="2">Page 2</option>
              <option value="3">Page 3</option>
            </select>
          </div>

          <div className="border p-4 rounded">
            <h2 className="font-semibold mb-3">Birthdate Component</h2>
            <select 
              name="birthdate" 
              className="w-full p-2 border rounded"
              defaultValue={findComponentPage('birthdate')}
            >
              <option value="">Don't show</option>
              <option value="2">Page 2</option>
              <option value="3">Page 3</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Configuration
          </button>
        </div>
      </Form>
    </div>
  );
}