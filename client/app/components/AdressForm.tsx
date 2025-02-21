export function AddressForm() {
    return (
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Street Address</label>
          <input
            name="street_address" 
            type="text"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-1">City</label>
            <input name="city" type="text" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1">State</label>
            <input name="state" type="text" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1">ZIP</label>
            <input name="zip" type="text" className="w-full p-2 border rounded" />
          </div>
        </div>
      </div>
    );
  }