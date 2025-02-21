import { useLoaderData, Form } from '@remix-run/react';
import { redirect, json } from '@remix-run/node';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { api } from '~/utils/api';
import { getSession } from '~/utils/session.server';
import { AboutMe } from '~/components/AboutMe';
import { AddressForm } from '~/components/AdressForm';
import { BirthdateInput } from '~/components/BirthdateInput';

type OnboardingComponent = {
  component_name: 'about_me' | 'address' | 'birthdate';
  page_number: number;
};

const COMPONENTS = {
  about_me: AboutMe,
  address: AddressForm,
  birthdate: BirthdateInput,
};

export const loader: LoaderFunction = async ({ params }) => {
  const step = Number(params.step) || 1;

  let config;
  try {
    const response = await api.getConfig();
    config = response?.data || [];
  } catch (error) {
    console.error('Error fetching config:', error);
    config = [];
  }

  // Hardcoded fallback if config is empty
  if (config.length === 0) {
    config = [
      { component_name: 'about_me', page_number: 2 },
      { component_name: 'address', page_number: 2 },
      { component_name: 'birthdate', page_number: 3 },
    ];
  }

  return json({ config, step });
};


export const action: ActionFunction = async ({ request, params }) => {
    try {
      const form = await request.formData();
      const data = Object.fromEntries(form); 
  
      const session = await getSession(request.headers.get('Cookie'));
      const userId = session.get('user_id');
  
      if (!userId) {
        console.error('No user_id found in session!');
        return json({ error: 'User not authenticated' }, { status: 401 });
      }
  
      const updateData = {
        user_id: userId,
        ...data,
      };
      console.log('Sending updateProfile with:', updateData);
  
      await api.updateProfile(updateData);
  
      const step = Number(params.step);
      return redirect(step === 2 ? '/onboarding/3' : '/data');
    } catch (error) {
      console.error('Error in onboarding step action:', error);
      
      return json({ 
        error: error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred during profile update'
      }, { status: 500 });
    }
  };

export default function OnboardingStep() {
  const { config, step } = useLoaderData<typeof loader>();

  const pageComponents = config.filter((component: OnboardingComponent) => 
    component.page_number === step
  );

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <div className="w-4 h-4 rounded-full bg-green-500" />
          <div
            className={`w-4 h-4 rounded-full ${step === 2 ? 'bg-blue-500' : 'bg-green-500'}`}
          />
          <div
            className={`w-4 h-4 rounded-full ${step === 3 ? 'bg-blue-500' : 'bg-gray-300'}`}
          />
        </div>
        <div className="h-2 bg-gray-200">
          <div
            className={`h-full bg-blue-500 transition-all ${step === 2 ? 'w-2/3' : 'w-full'}`}
          />
        </div>
      </div>

      <Form method="post" className="space-y-6">
        {pageComponents.map((component: OnboardingComponent) => {
          const Component = COMPONENTS[component.component_name];
          return Component ? (
            <div key={component.component_name}>
              <Component />
            </div>
          ) : null;
        })}
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          {step === 2 ? 'Next' : 'Complete'}
        </button>
      </Form>
    </div>
  );
}
