
import { ReactNode } from "react";

interface FormSectionProps {
  children: ReactNode;
  className?: string;
}

const FormSection = ({ children, className = "" }: FormSectionProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`}>
      {children}
    </div>
  );
};

export default FormSection;
