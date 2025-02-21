export function AboutMe() {
    return (
      <div>
        <label className="block mb-1">About Me</label>
        <textarea
          name="about_me"
          rows={4}
          className="w-full p-2 border rounded"
        />
      </div>
    );
  }