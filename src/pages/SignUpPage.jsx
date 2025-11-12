
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../api/axiosInstance";

const TR_IBAN  = /^TR\d{24}$/i;
const TR_PHONE = /^(?:\+90|0)?5\d{9}$/;
const TAX_NO   = /^T\d{4}V\d{6}$/;
const norm = (s) => String(s || "").toLowerCase().trim();

export default function SignUpPage() {
  const [roles, setRoles] = useState([
    { id: "1", name: "Customer" },
    { id: "2", name: "Store" },
    { id: "3", name: "Admin" },
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      role_id: "1", 
      store_name: "",
      store_phone: "",
      store_tax_no: "",
      store_bank_account: "",
    },
  });

  const selectedRoleId = watch("role_id");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await axiosInstance.get("/roles", { timeout: 10000 });
        const data = res.data;
        const list = Array.isArray(data) ? data : (Array.isArray(data?.roles) ? data.roles : []);
        if (!alive || !Array.isArray(list) || list.length === 0) return;

        setRoles(list);

        
        const customer = list.find((r) => ["customer", "müşteri", "musteri"].includes(norm(r.name)));
        const defId = String(customer?.id ?? list[0].id);
        setValue("role_id", defId, { shouldValidate: true });
      } catch (e) {
        console.warn("GET /roles failed, using fallback:", e?.message || e);
      }
    })();

    return () => { alive = false; };
  }, [setValue]);

  const isStore = useMemo(() => {
    const role = roles.find((r) => String(r.id) === String(selectedRoleId));
    return ["store", "mağaza", "magaza"].includes(norm(role?.name));
  }, [roles, selectedRoleId]);

  
  const onSubmit = async (f) => {
    if (f.password !== f.passwordConfirm) {
      alert("Passwords do not match");
      return;
    }
    const base = { name: f.name, email: f.email, password: f.password, role_id: f.role_id };
    const payload = isStore
      ? { ...base, store: {
          name: f.store_name,
          phone: f.store_phone,
          tax_no: f.store_tax_no,
          bank_account: f.store_bank_account,
        } }
      : base;

    try {
      await axiosInstance.post("/signup", payload);
      alert("You need to click link in email to activate your account!");
      window.history.back();
    } catch (err) {
      alert(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center py-16 bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[500px]">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        {/* Name */}
        <label className="block mb-2 font-semibold">Name</label>
        <input
          className="border p-2 rounded w-full mb-1"
          {...register("name", { required: "Required", minLength: { value: 3, message: "Min 3 chars" } })}
        />
        {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>}

        {/* Email */}
        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          className="border p-2 rounded w-full mb-1"
          {...register("email", { required: "Required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })}
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

        {/* Password */}
        <label className="block mb-2 font-semibold">Password</label>
        <input
          type="password"
          className="border p-2 rounded w-full mb-1"
          {...register("password", {
            required: "Required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
              message: "Min 8 incl. number, lower, upper, special",
            },
          })}
        />
        {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}

        {/* Confirm */}
        <label className="block mb-2 font-semibold">Confirm Password</label>
        <input
          type="password"
          className="border p-2 rounded w-full mb-1"
          {...register("passwordConfirm", { required: "Required", validate: (v, f) => v === f.password || "Passwords do not match" })}
        />
        {errors.passwordConfirm && <p className="text-red-500 text-sm mb-2">{errors.passwordConfirm.message}</p>}

        {/* Role */}
        <label className="block mb-2 font-semibold">Role</label>
        <select
          className="border p-2 rounded w-full mb-3 bg-white"
          {...register("role_id", { required: true })}
          value={selectedRoleId || ""}
          onChange={(e) => setValue("role_id", e.target.value, { shouldValidate: true })}
        >
          {roles.map((r) => {
            const n = norm(r.name);
            const label =
              n.includes("customer") || n.includes("müşteri") || n.includes("musteri") ? "Customer" :
              n.includes("store")    || n.includes("mağaza")  || n.includes("magaza")  ? "Store" :
              n.includes("admin")    || n.includes("yönetici")|| n.includes("yonetici")? "Admin"  : r.name;
            return <option key={r.id} value={String(r.id)}>{label}</option>;
          })}
        </select>

        {/* Store fields */}
        {isStore && (
          <>
            <label className="block mb-2 font-semibold">Store Name</label>
            <input
              className="border p-2 rounded w-full mb-1"
              {...register("store_name", { required: "Required", minLength: { value: 3, message: "Min 3 chars" } })}
            />
            {errors.store_name && <p className="text-red-500 text-sm mb-2">{errors.store_name.message}</p>}

            <label className="block mb-2 font-semibold">Store Phone</label>
            <input
              placeholder="+90 5xx xxx xx xx"
              className="border p-2 rounded w-full mb-1"
              {...register("store_phone", { required: "Required", pattern: { value: TR_PHONE, message: "Invalid TR phone" } })}
            />
            {errors.store_phone && <p className="text-red-500 text-sm mb-2">{errors.store_phone.message}</p>}

            <label className="block mb-2 font-semibold">Store Tax ID</label>
            <input
              placeholder="T1234V123456"
              className="border p-2 rounded w-full mb-1"
              {...register("store_tax_no", { required: "Required", pattern: { value: TAX_NO, message: 'Use "TXXXXVXXXXXX"' } })}
            />
            {errors.store_tax_no && <p className="text-red-500 text-sm mb-2">{errors.store_tax_no.message}</p>}

            <label className="block mb-2 font-semibold">Store Bank Account (IBAN)</label>
            <input
              placeholder="TR________________________"
              className="border p-2 rounded w-full mb-1"
              {...register("store_bank_account", { required: "Required", pattern: { value: TR_IBAN, message: "Invalid TR IBAN" } })}
            />
            {errors.store_bank_account && <p className="text-red-500 text-sm mb-2">{errors.store_bank_account.message}</p>}
          </>
        )}

        <button className="w-full py-3 mt-2 text-white rounded-md font-semibold bg-blue-600 hover:bg-blue-700">
          Create Account
        </button>
      </form>
    </div>
  );
}
