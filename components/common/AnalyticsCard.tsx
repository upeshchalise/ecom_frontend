import React from 'react';

type AnalyticsCardProps = {
  title: string;
  amount: number | string;
};

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, amount }) => {
  return (
    <div className="grow bg-white p-5 rounded-xl text-center shadow-[0px_2px_8px_rgba(0,0,0,0.1)]">
      <h3 className="text-lg text-[#666]">{title}</h3>
      <p className="text-xl font-bold text-[#333]">
        {amount}</p>
    </div>
  );
};

export default AnalyticsCard;
