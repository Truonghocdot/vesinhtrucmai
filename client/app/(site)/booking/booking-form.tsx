"use client";

import React, { useState } from "react";
import type { BookingFieldLabels } from "@/types/content";

type Props = {
  services: { slug: string; name: string }[];
  locations: { slug: string; name: string }[];
  fieldLabels: BookingFieldLabels;
  ctaCopy: string;
  defaultService?: string;
  defaultLocation?: string;
};

export default function BookingForm({
  services,
  locations,
  fieldLabels,
  ctaCopy,
  defaultService = "",
  defaultLocation = "",
}: Props) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(defaultService);
  const [location, setLocation] = useState(defaultLocation);
  const [note, setNote] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert("Vui lòng nhập Họ tên và Số điện thoại");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({
        fullName,
        phone,
        service: services.find((s) => s.slug === service)?.name || "Chưa chọn",
        location: locations.find((l) => l.slug === location)?.name || "Chưa chọn",
        note: note || "Không có",
      });
    }, 1200);
  };

  if (submittedData) {
    return (
      <div className="rounded-[2.5rem] border border-orange-200 bg-orange-50/30 p-8 text-center shadow-lg md:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-8 w-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="mt-6 text-2xl font-black tracking-tight text-slate-950">
          Gửi yêu cầu thành công!
        </h3>
        <p className="mt-3 text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
          Đầu mối phụ trách của Trúc Mai sẽ liên hệ trực tiếp tới số điện thoại của bạn trong vòng 15 phút.
        </p>

        <div className="mt-8 rounded-2xl bg-white border border-slate-100 p-6 text-left max-w-md mx-auto space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Thông tin đã nhận:</h4>
          <p className="text-sm text-slate-700"><strong>Khách hàng:</strong> {submittedData.fullName}</p>
          <p className="text-sm text-slate-700"><strong>Số điện thoại:</strong> {submittedData.phone}</p>
          <p className="text-sm text-slate-700"><strong>Dịch vụ:</strong> {submittedData.service}</p>
          <p className="text-sm text-slate-700"><strong>Khu vực:</strong> {submittedData.location}</p>
          <p className="text-sm text-slate-700"><strong>Ghi chú:</strong> {submittedData.note}</p>
        </div>

        <button
          onClick={() => setSubmittedData(null)}
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Gửi yêu cầu mới
        </button>
      </div>
    );
  }

  return (
    <form
      id="booking-form"
      onSubmit={handleSubmit}
      className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_16px_50px_rgba(15,23,42,0.06)] md:p-12 space-y-6"
    >
      <h3 className="text-2xl font-bold tracking-tight text-slate-950">
        Biểu mẫu đặt lịch
      </h3>
      
      {/* Full Name */}
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          {fieldLabels.fullName} <span className="text-orange-500">*</span>
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Ví dụ: Nguyễn Văn A"
          required
          className="w-full min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-orange-500 focus:bg-white"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          {fieldLabels.phone} <span className="text-orange-500">*</span>
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Ví dụ: 0988123456"
          required
          className="w-full min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-orange-500 focus:bg-white"
        />
      </div>

      {/* Service Selection */}
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          {fieldLabels.service}
        </label>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white appearance-none"
        >
          <option value="">-- Chọn loại dịch vụ --</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Location Selection */}
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          {fieldLabels.location}
        </label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white appearance-none"
        >
          <option value="">-- Chọn khu vực --</option>
          {locations.map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.name}
            </option>
          ))}
        </select>
      </div>

      {/* Note */}
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          {fieldLabels.note}
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Diện tích ước lượng, số phòng ngủ, hoặc các yêu cầu khảo sát đặc biệt..."
          rows={4}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-orange-500 focus:bg-white resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full min-h-12 inline-flex items-center justify-center rounded-full bg-orange-500 px-6 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:bg-orange-300"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang gửi...
            </span>
          ) : (
            "Gửi thông tin ngay"
          )}
        </button>
      </div>

      <p className="text-xs text-slate-400 text-center leading-relaxed">
        {ctaCopy}
      </p>
    </form>
  );
}
