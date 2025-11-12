// src/components/checkout/AddressForm.jsx
import React from "react";
import { useForm } from "react-hook-form";

const cities = [
  "adana","ankara","istanbul","izmir","antalya","bursa","konya","kayseri","gaziantep","trabzon",
  // ister çoğalt
];

export default function AddressForm({ initial = null, onCancel, onSave }) {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm({
    defaultValues: initial || {
      title: "", name: "", surname: "", phone: "",
      city: "ankara", district: "", neighborhood: ""
    },
  });

  const onSubmit = (data) => {
    // endpoint alan isimleri birebir aynı olmalı
    if (initial?.id) data.id = initial.id;
    onSave(data);
  };

  const err = (e) => <p className="text-red-500 text-sm mt-1">{e}</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="font-medium">Address Title</label>
        <input className="w-full border rounded p-2"
          {...register("title", { required: "Required" })}/>
        {errors.title && err(errors.title.message)}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="font-medium">Name</label>
          <input className="w-full border rounded p-2"
            {...register("name", { required: "Required" })}/>
          {errors.name && err(errors.name.message)}
        </div>
        <div>
          <label className="font-medium">Surname</label>
          <input className="w-full border rounded p-2"
            {...register("surname", { required: "Required" })}/>
          {errors.surname && err(errors.surname.message)}
        </div>
      </div>

      <div>
        <label className="font-medium">Phone</label>
        <input className="w-full border rounded p-2"
          placeholder="0537xxxxxxx"
          {...register("phone", { required: "Required", pattern: { value: /^(?:\+90|0)?5\d{9}$/, message: "Invalid TR phone" } })}/>
        {errors.phone && err(errors.phone.message)}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="font-medium">City (İl)</label>
          <select className="w-full border rounded p-2"
            {...register("city", { required: "Required" })}>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="font-medium">District (İlçe)</label>
          <input className="w-full border rounded p-2"
            {...register("district", { required: "Required" })}/>
        </div>
        <div>
          <label className="font-medium">Neighborhood (Mahalle)</label>
          <input className="w-full border rounded p-2"
            {...register("neighborhood", { required: "Required" })}/>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">Cancel</button>
      </div>
    </form>
  );
}
