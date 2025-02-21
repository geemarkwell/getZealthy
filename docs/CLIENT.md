# Custom Onboarding Flow (FRONTEND) - Architecture Walkthrough

\***\*THIS WAS WRITTEN AT THE END OF DEVELOPMENT NOT WITHIN THE TIMEFRAME OF 5HRS SPECIFIED\*\***

## Project Structure Overview

I crafted this application with a well-structured, modular approach to building a flexible onboarding system, focusing on key software design principles:

### 1. Separation of Concerns

I meticulously organized the project into distinct directories, each with a clear responsibility:

- `/components`: Reusable UI building blocks

  - `AboutMe.tsx`: Standalone component for user description
  - `AddressForm.tsx`: Encapsulated address collection UI
  - `BirthdateInput.tsx`: Focused birthdate input component

- `/routes`: Defines application navigation and page-specific logic

  - `_index.tsx`: Initial user signup
  - `admin.tsx`: Configuration management
  - `onboarding.$step.tsx`: Dynamic onboarding flow
  - `data.tsx`: User data display

- `/utils`: Shared utilities and services
  - `api.ts`: Centralized API communication
  - `session.server.ts`: Session management

### 2. Dynamic Configuration

I designed the architecture to allow runtime configuration of the onboarding flow:

- Admins can dynamically assign components to different pages (i spent a bit of time on the backend & frontend achrictucture and setups i didnt get to fully implement this)
- Onboarding routes dynamically render components based on configuration
- Backend supports flexible component placement

### 3. Type Safety

I implemented comprehensive TypeScript typing:

- Strict type definitions for configuration
- Type-safe component rendering
- Explicit interface definitions for data structures

### 4. Backend-Frontend Separation

I created a clear separation between frontend and backend:

- Frontend handles UI and user interaction
- Backend manages data persistence and business logic
- API serves as a clean interface between frontend and backend

### 5. Scalability Considerations

I built the design to support easy extension:

- New components can be added to `COMPONENTS` object
- Configuration can be modified without changing core logic
- Modular routes allow for easy addition of new pages

## Key Design Patterns

### Component Composition

```typescript
const COMPONENTS = {
  about_me: AboutMe,
  address: AddressForm,
  birthdate: BirthdateInput,
};

// Dynamic rendering
pageComponents.map((component) => {
  const Component = COMPONENTS[component.component_name];
  return Component ? <Component /> : null;
});
```

### Configuration Management

```typescript
type OnboardingComponent = {
  component_name: "about_me" | "address" | "birthdate";
  page_number: number;
};
```

### API Abstraction

```typescript
export const api = {
  createUser: async (data) => {
    /* ... */
  },
  getConfig: async () => {
    /* ... */
  },
  updateProfile: async (data) => {
    /* ... */
  },
};
```

## Benefits of My Approach

1. **Flexibility**: Easy to modify onboarding flow
2. **Maintainability**: Clear, separated concerns
3. **Scalability**: Simple to add new components or routes
4. **Testability**: Modular design facilitates unit testing

## My Vision for some Future Improvements

- Add comprehensive error handling
- Better Developer experince
- Implement more robust validation
- Create reusable form validation utilities
- Add comprehensive logging and monitoring
- Define global styles and components i.e buttons would just be an import instead of always styling
- Separate interfaces into their own correlating files
- Add keys, urls etc in .ENV
- Containerzation
- Pagination

Although with more improvements made, could be a much more suited production enviroment. This architecture represents my thoughtful approach to building a flexible, maintainable web application with clear separation of concerns and an extensible design.
