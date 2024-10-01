import { Check, X } from "lucide-react";
import React, { useEffect } from "react";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    {
      label: "Contains 1 special character",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-sm gap-2">
          {item.met ? (
            <Check className="size-4 text-green-400" />
          ) : (
            <X className="size-4 text-gray-400" />
          )}
          <span className={`${item.met ? "text-green-400" : "text-gray-400"}`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^A-za-z0-9]/.test(pass)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const getStrengthText = (strength) => {
    if (strength === 0) return "Very weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  const getColor = (strength) => {
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-red-400";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm text-gray-400">Password strength</p>
        <p className="text-sm text-gray-400">{getStrengthText(strength)}</p>
      </div>

      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full ${
              index < strength ? getColor(strength) : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
