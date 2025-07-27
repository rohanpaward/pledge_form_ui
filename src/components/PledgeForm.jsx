import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { BASE_API_URL } from '../../apiconst';
import Certificate from "./Certificate";
// import App from './App.jsx';
import '../index.css';

const schema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
    .required("Mobile Number is required"),
  state: yup.string(),
  profileType: yup.string().required("Profile type is required"),
  commitments: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one commitment")
    .required("Select at least one commitment"),
});

const commitmentThemes = {
  "Sustainable Living": [
    "Reduce plastic usage",
    "Recycle household waste",
    "Use public transport",
  ],
  "Energy Conservation": [
    "Turn off unused lights",
    "Use energy-efficient appliances",
    "Promote solar energy",
  ],
  "Nature Preservation": [
    "Plant more trees",
    "Avoid deforestation",
    "Protect biodiversity",
  ],
};

const PledgeForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      commitments: [],
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setFormData(data);

    // Show loading toast and keep a reference to dismiss it later
    const loadingToastId = toast.loading(" Please wait, we are submitting your pledge");

    setLoading(true);

    const payload = {
      pledgeId: `P-${Date.now()}`,
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      state: data.state || "",
      profile: data.profileType,
      love: data.commitments.join(", "),
      date: new Date().toLocaleDateString("en-IN"),
    };

    try {
      const response = await fetch(`${BASE_API_URL}/pledge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result?.result === "Success") {
        toast.dismiss(loadingToastId);
        toast.success(" Pledge submitted successfully!");
        setShowCertificate(true);
        setSubmitted(true);
        reset();
      } else {
        throw new Error(result?.message || "Unknown error");
      }
    } catch (err) {
      console.error("Submit Error", err);
      toast.dismiss(loadingToastId); // Dismiss loading toast on error
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <section id="pledge-form" className="bg-green-50 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Take the Climate Pledge
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div>
            <label className="block mb-1 font-medium">Full Name *</label>
            <input
              {...register("name")}
              className="w-full p-3 border rounded"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Email *</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-3 border rounded"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Mobile Number *</label>
            <input
              {...register("mobile")}
              className="w-full p-3 border rounded"
              placeholder="Enter 10-digit mobile number"
            />
            <p className="text-xs text-gray-500 mt-1">We respect your privacy. Your number won’t be shared.</p>
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">State</label>
            <input
              {...register("state")}
              className="w-full p-3 border rounded"
              placeholder="Enter your state"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Profile Type *</label>
            <select {...register("profileType")} className="w-full p-3 border rounded">
              <option value="">Select</option>
              <option value="Student">Student</option>
              <option value="Working Professional">Working Professional</option>
              <option value="Other">Other</option>
            </select>
            {errors.profileType && (
              <p className="text-red-500 text-sm mt-1">{errors.profileType.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-3 font-medium text-green-800 text-lg">
              Select Your Commitments *
            </label>

            {Object.entries(commitmentThemes).map(([theme, commitments]) => (
              <div key={theme} className="mb-4">
                <p className="font-semibold text-green-700">{theme}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {commitments.map((item, index) => (
                    <label key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={item}
                        {...register("commitments[]")}
                        className="accent-green-600"
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            {errors.commitments && (
              <p className="text-red-500 text-sm mt-2">{errors.commitments.message}</p>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Submit Pledge
          </button>

          {submitted && showCertificate && (
            <>
              <Certificate name={formData.name}
                commitments={formData.commitments} />
              <p className="text-green-700 font-medium text-center mt-4">
                Thank you for pledging! Let's act for the planet.
              </p>
            </>
          )}

        </form>
      </div>
    </section>
  );
};

export default PledgeForm;
