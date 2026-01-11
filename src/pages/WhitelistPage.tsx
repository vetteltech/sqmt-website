"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormData {
  name: string;
  phone: string;
  email: string;
  company: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  company?: string;
}

function WhitelistPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    company: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.company.trim())
      newErrors.company = "Company name is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert(
        `Please fill the following fields: ${Object.values(newErrors).join(
          ", "
        )}`
      );
      return;
    } else {
      const toEmail = "hello@sqmt.app";
      const subject = "Whitelist";
      const body = `Name: ${formData.name}\n Phone: ${formData.phone}\n Email: ${formData.email}\n Company: ${formData.company}`;
      const mailtoLink = `mailto:${toEmail}?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
      alert("Form submitted successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        company: "",
      });
    }
  };

  return (
    // pb-[680px]
    <form
      className="w-[100%] h-[140vh] lg:h-[auto]  lg:pb-[40px] relative"
      onSubmit={handleSubmit}
    >
      {/* Back Button */}

      <div
        className="absolute top-[20px] left-[50px] flex justify-center items-center gap-[10px] cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        <Image src="/assets/back.svg" alt="back" width={24} height={24} />
      </div>

      <img
        src="/assets/whitelist/boxes.svg"
        className="w-[100%] h-[140vh] lg:h-[100%] object-cover"
        alt="boxes"
      />
      <img
        src="/assets/whitelist/buildings.svg"
        className="w-full absolute bottom-0"
        alt="buildings"
      />

      <div className="w-[100%] h-[100vh] absolute top-0 left-0 flex justify-center items-start mt-[80px] 2xl:mt-[8%] px-[16px]">
        <div className="w-[100%] lg:w-[741px] flex-cols justify-center items-center bg-[rgba(255,255,255,1)] ">
          <div className="w-[100%] flex justify-center items-center">
            <img
              src="/assets/whitelist/logo.svg"
              alt="logo"
              className="h-[30px] lg:h-[auto]"
            />
          </div>
          <h1 className="w-[100%] font-[Forum] text-[35px] lg:text-[60px] leading-[40px] lg:leading-[65px] text-center mt-[40px] lg:mt-[70px] text-[#11111C]">
            Join Our Waitlist for Smarter Real Estate Management
          </h1>
          <p className="font-[DM Sans] text-[14px] lg:text-[16px] leading-[25px] text-center text-[rgba(17,17,28,0.52)] lg:text-[#11111C] mt-[10px]">
            Get early access to Zameen.app and stay ahead with AI-driven
            insights and automation.
          </p>

          <div className="mt-[40px]">
            <div className="w-[100%] grid lg:grid-cols-2  gap-[20px]">
              <div className="w-[100%] ">
                <p className="font-[DM Sans] text-[14px] text-[#11111C]">
                  Name*
                </p>
                <input
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="px-[15px] py-[10px] w-[100%] border-[1px] border-[rgba(17,17,28,0.12)] text-[#11111C]"
                  placeholder="Your Name"
                />
              </div>
              <div className="w-[100%]">
                <p className="font-[DM Sans] text-[14px] text-[#11111C]">
                  Phone Number*
                </p>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="px-[15px] py-[10px] w-[100%] border-[1px] border-[rgba(17,17,28,0.12)] text-[#11111C]"
                  placeholder="+91"
                />
              </div>
              <div className="w-[100%]">
                <p className="font-[DM Sans] text-[14px] text-[#11111C]">
                  Email Address
                </p>
                <input
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="px-[15px] py-[10px] w-[100%]  border-[1px] border-[rgba(17,17,28,0.12)] text-[#11111C]"
                  placeholder="Your email address"
                />
              </div>
              <div className="w-[100%]">
                <p className="font-[DM Sans] text-[14px] text-[#11111C]">
                  Company Name*
                </p>
                <input
                  name="company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="px-[15px] py-[10px] w-[100%] border-[1px] border-[rgba(17,17,28,0.12)] text-[#11111C]"
                  placeholder="Your company Name"
                />
              </div>
            </div>
            <div className="mt-[20px] flex justify-end items-center">
              <button
                type="submit"
                className="w-[100%] lg:w-[auto] px-[53.2px] py-[13.5px] bg-[#11111C] text-[#FFFFFF] rounded-[5px] font-[DM Sans] text-[16px] leading-[145%] text-center"
              >
                Join Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default WhitelistPage;
