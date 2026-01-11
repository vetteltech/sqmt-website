import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  date: string;
  time: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  company?: string;
  date?: string;
  time?: string;
}

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    company: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // ✅ Validation logic
  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d+$/.test(formData.phone))
      newErrors.phone = "Invalid phone number";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";

    if (!formData.company.trim())
      newErrors.company = "Company name is required";

    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";

    return newErrors;
  };

  // ✅ Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // ✅ Handle submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // send data to  email
      const toEmail = "hello@sqmt.app";
      const subject = "Booking Meeting";
      const body = `Name: ${formData.fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nCompany: ${formData.company}\nDate: ${formData.date}\nTime: ${formData.time}`;
      const mailtoLink = `mailto:${toEmail}?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;

      alert("Form submitted successfully!");
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        company: "",
        date: "",
        time: "",
      });
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      {/* Full Name */}
      <div className="w-full mb-4">
        <p className="font-[DM-Sans-medium] text-[16px] text-white text-[16px]">
          Full Name*
        </p>
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full h-[50px] bg-[#12121B] font-[DM-Sans-light] text-[#FFFFFF] text-[16px] placeholder:text-gray-500 border rounded-[10px] px-[10px] mt-[10px] w-full h-[50px] bg-[#12121B] font-[DM-Sans-light] text-[#FFFFFF]  text-[16px] placeholder:text-gray-500 border rounded-[10px] px-[10px] mt-[10px] dark-input ${
            errors.fullName
              ? "border-red-500"
              : "border-[rgba(255,255,255,0.12)]"
          }`}
          type="text"
          placeholder="Name"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* Phone */}
      <div className="w-full mb-4">
        <p className="font-[DM-Sans-medium] text-[16px] text-white text-[16px]">
          Phone Number*
        </p>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full h-[50px] bg-[#12121B] font-[DM-Sans-light] text-[#FFFFFF]  text-[16px] placeholder:text-gray-500 border rounded-[10px] px-[10px] mt-[10px] dark-input ${
            errors.phone ? "border-red-500" : "border-[rgba(255,255,255,0.12)]"
          }`}
          type="tel"
          placeholder="+91"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Email */}
      <div className="w-full mb-4">
        <p className="font-[DM-Sans-medium] text-[16px] text-white text-[16px]">
          Email Address*
        </p>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full h-[50px] bg-[#12121B] font-[DM-Sans-light] text-[#FFFFFF] text-[16px] placeholder:text-gray-500 border rounded-[10px] px-[10px] mt-[10px] dark-input ${
            errors.email ? "border-red-500" : "border-[rgba(255,255,255,0.12)]"
          }`}
          type="email"
          placeholder="Your Email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Company */}
      <div className="w-full mb-4">
        <p className="font-[DM-Sans-medium] text-[16px] text-white text-[16px]">
          Company Name*
        </p>
        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={`w-full h-[50px] bg-[#12121B] font-[DM-Sans-light] text-[#FFFFFF] text-[16px] placeholder:text-gray-500 border rounded-[10px] px-[10px] mt-[10px] dark-input ${
            errors.company
              ? "border-red-500"
              : "border-[rgba(255,255,255,0.12)]"
          }`}
          type="text"
          placeholder="Your Company name"
        />
        {errors.company && (
          <p className="text-red-500 text-sm mt-1">{errors.company}</p>
        )}
      </div>

      {/* Date & Time */}
      <div className="w-full flex justify-center items-center gap-[20px]">
        {/* Date */}
        <div className="w-[50%] flex flex-col">
          <p className="text-left font-[DM-Sans-medium] text-[16px] text-white text-[16px]">
            Date*
          </p>
          <input
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`w-full h-[50px] bg-[#12121B] font-[DM-Sans-light] text-[#585860] text-[16px] border rounded-[10px] px-[10px] mt-[10px] appearance-none dark-input ${
              errors.date ? "border-red-500" : "border-[rgba(255,255,255,0.12)]"
            } [color-scheme:dark]`}
            type="date"
            style={{
              color: formData?.date ? "#FFFFFF" : "#585860",
            }}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        {/* Time */}
        <div className="w-[50%] flex flex-col">
          <p className="text-left font-[DM-Sans-medium] text-[16px] text-white text-[16px]">
            Time*
          </p>
          <input
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={`w-full h-[50px] font-[DM-Sans-light] text-[#FFFFFF] text-[16px] border rounded-[10px] px-[10px] mt-[10px] appearance-none dark-input ${
              errors.time ? "border-red-500" : "border-[rgba(255,255,255,0.12)]"
            } [color-scheme:dark]`}
            type="time"
            style={{
              color: formData?.time ? "#FFFFFF" : "#585860",
            }}
          />
          {errors.time && (
            <p className="text-red-500 text-sm mt-1">{errors.time}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full flex justify-end items-center mt-[41px]">
        <input
          className="w-[117px] h-[50px] bg-[#FFFFFF] font-[DM-Sans-light] text-[#11111C] text-[16px] rounded-[5px] px-[10px] mt-[10px] text-[#11111C] cursor-pointer hover:bg-gray-300 transition-all dark-input"
          type="submit"
          value="Confirm"
        />
      </div>
    </form>
  );
};

export default BookingForm;
