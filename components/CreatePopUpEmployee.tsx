'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FiChevronLeft, FiEdit2, FiX } from 'react-icons/fi';

export function AddEmployeeDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    joiningDate: '',
    role: 'Leader',
    age: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
      >
        Add Employee
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
            <div className="p-6">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <button onClick={() => setIsOpen(false)} className="p-2">
                    <FiChevronLeft className="h-6 w-6 text-black" />
                  </button>
                  <h1 className="ml-2 text-xl font-semibold text-black">
                    ADD EMPLOYEE
                  </h1>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2">
                  <FiX className="h-6 w-6 text-black" />
                </button>
              </div>

              {/* Avatar */}
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-sky-100">
                    <Image
                      src={'/image-default.png'}
                      alt="profile"
                      height={96}
                      width={96}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 rounded-full bg-white p-1 shadow-lg"
                    // onClick={handleClick}
                  >
                    <FiEdit2 className="h-4 w-4 text-gray-600" />
                  </button>
                  <input
                    type="file"
                    // ref={fileInputRef}
                    // onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    id="fullname"
                    type="text"
                    className="peer block h-12 w-full rounded-md border border-zinc-500 px-4 pb-1 pt-4 text-black"
                    placeholder=""
                    value={formData.fullName}
                    onChange={e =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                  <label
                    htmlFor="fullname"
                    className="absolute left-4 top-3 origin-[0] -translate-y-3 scale-75 text-gray-400 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75"
                  >
                    Full name
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    className="peer block h-12 w-full rounded-md border border-zinc-500 px-4 pb-1 pt-4 text-black"
                    placeholder=""
                    value={formData.email}
                    onChange={e =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-3 origin-[0] -translate-y-3 scale-75 text-gray-400 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75"
                  >
                    Email
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="joiningDate"
                    type="date"
                    className="peer block h-12 w-full rounded-md border border-zinc-500 px-4 pb-1 pt-4 text-black"
                    value={formData.joiningDate || ''}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        joiningDate: e.target.value
                      })
                    }
                  />
                  <label
                    htmlFor="joiningDate"
                    className="absolute left-4 top-3 origin-[0] -translate-y-3 scale-75 text-gray-400 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75"
                  >
                    Joining Date
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <select
                      id="role"
                      value={formData.role}
                      onChange={e =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="peer block h-12 w-full rounded-md border border-zinc-500 px-4 pb-1 pt-4 text-black"
                    >
                      <option value="Leader">Leader</option>
                      <option value="Member">Member</option>
                      <option value="Admin">Admin</option>
                    </select>
                    <label
                      htmlFor="role"
                      className="absolute left-4 top-3 origin-[0] -translate-y-3 scale-75 text-gray-400 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75"
                    >
                      Role
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="age"
                      type="number"
                      placeholder=""
                      value={formData.age}
                      min="0"
                      max="200"
                      onChange={e =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                      className="peer block h-12 w-full rounded-md border border-zinc-500 px-4 pb-1 pt-4 text-black"
                    />
                    <label
                      htmlFor="age"
                      className="absolute left-4 top-3 origin-[0] -translate-y-3 scale-75 pb-2 text-gray-400 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75"
                    >
                      Age
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-full rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="w-full rounded bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600"
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
