export function BirthdateInput() {
    return (
      <div>
        <label className="block mb-1">Birthdate</label>
        <input
          name="birthdate"
          type="date"
          className="w-full p-2 border rounded"
        />
      </div>
    );
  }