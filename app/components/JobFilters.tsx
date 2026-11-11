"use client";

import { ReactNode, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin } from "lucide-react";

export default function JobFilters({ children }: { children?: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Object.fromEntries() ব্যবহার করে একদম সহজ ও ছোট ইভেন্ট হ্যান্ডলার
  const handleSearchAndFilter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. FormData থেকে সরাসরি Object তৈরি
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data)

    // 2. বর্তমান URLParams-এর কপি নেওয়া
    const params = new URLSearchParams(searchParams.toString());

    // 3. অবজেক্টের কী (Key) ও ভ্যালু (Value) লুপ চালিয়ে URLParams-এ সেট করা
    Object.entries(data).forEach(([key, value]) => {
      const valStr = value.toString().trim();
      if (valStr) {
        params.set(key, valStr);
      } else {
        params.delete(key);
      }
    });

    // 4. URL আপডেট করা
    router.push(`/browse-jobs?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("/browse-jobs");
  };

  return (
    <form onSubmit={handleSearchAndFilter} className="space-y-8">
      {/* Top Search Bar */}
      <div className="bg-[#1e293b] p-4 rounded-xl border border-slate-800 shadow-lg flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            name="search"
            defaultValue={searchParams.get("search") || ""}
            placeholder="Search by job title, keywords..."
            className="w-full bg-[#0f172a] border border-slate-700 text-slate-200 pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition"
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-auto bg-slate-100 hover:bg-white text-slate-900 font-semibold px-8 py-3 rounded-lg transition cursor-pointer"
        >
          Search Jobs
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Sidebar Filters */}
        <aside className="lg:col-span-1 bg-[#1e293b] p-6 rounded-xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-100">Filters</h2>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-blue-400 hover:underline cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-300">Category</label>
            <select
              name="category"
              defaultValue={searchParams.get("category") || ""}
              className="w-full bg-[#0f172a] border border-slate-700 text-slate-300 p-2.5 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            >
              <option value="">All Categories</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing & Sales">Marketing & Sales</option>
              <option value="Design">Design</option>
              <option value="Product">Product</option>
            </select>
          </div>

          {/* Location Filter */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-300">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                name="location"
                defaultValue={searchParams.get("location") || ""}
                placeholder="e.g. San Francisco"
                className="w-full bg-[#0f172a] border border-slate-700 text-slate-300 pl-9 pr-3 py-2 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Job Type Radio Buttons */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-300">Job Type</label>
            <div className="space-y-2 text-sm text-slate-400">
              {[
                { label: "All Types", value: "" },
                { label: "Full-time", value: "Full-time" },
                { label: "Part-time", value: "Part-time" },
                { label: "Contract", value: "Contract" },
                { label: "Internship", value: "Internship" },
              ].map((item) => (
                <label key={item.value || "all"} className="flex items-center space-x-2 cursor-pointer hover:text-slate-200">
                  <input
                    type="radio"
                    name="jobType"
                    value={item.value}
                    defaultChecked={(searchParams.get("jobType") || "") === item.value}
                    className="text-blue-600 focus:ring-0 bg-[#0f172a] border-slate-700"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Workplace Type / Remote Radio Buttons */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <label className="text-sm font-semibold text-slate-300">Workplace Type</label>
            <div className="space-y-2 text-sm text-slate-400">
              <label className="flex items-center space-x-2 cursor-pointer hover:text-slate-200">
                <input
                  type="radio"
                  name="isRemote"
                  value=""
                  defaultChecked={!searchParams.get("isRemote")}
                  className="text-blue-600 focus:ring-0 bg-[#0f172a] border-slate-700"
                />
                <span>All Workplaces</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer hover:text-slate-200">
                <input
                  type="radio"
                  name="isRemote"
                  value="true"
                  defaultChecked={searchParams.get("isRemote") === "true"}
                  className="text-blue-600 focus:ring-0 bg-[#0f172a] border-slate-700"
                />
                <span>Remote Only</span>
              </label>
            </div>
          </div>

          {/* Apply Filter Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition cursor-pointer text-sm"
          >
            Apply Filters
          </button>
        </aside>

        {/* Right Content Area (Job Cards) */}
        <div className="lg:col-span-3">
          {children}
        </div>
      </div>
    </form>
  );
}