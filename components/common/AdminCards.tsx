import React from 'react';

interface AdminCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const AdminCard: React.FC<AdminCardProps> = ({ title, description, onClick }) => {
  return (
    <button
      className="bg-white p-5 rounded shadow hover:shadow-md transition cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-xl font-semibold text-[#5b3e1d] mb-2">{title}</h2>
      <p className="text-sm text-[#7a6244]">{description}</p>
    </button>
  );
};

export default AdminCard;
