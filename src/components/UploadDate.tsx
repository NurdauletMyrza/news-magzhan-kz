import React from "react";

interface DateProps {
  className: string;
  date: Date;
}

const UploadDate: React.FC<DateProps> = ({ className, date }) => {
  const kazakhMonths = ["қаңтар", "ақпан", "наурыз", "сәуір", "мамыр", "маусым", "шілде", "тамыз", "қыркүйек", "қазан", "қараша", "желтоқсан"];

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  let result = "бүгін";

  if (date.getTime() !== today.getTime()) {
    result = `${date.getDate()} ${kazakhMonths[date.getMonth()]} ${date.getFullYear()}`;
  }

  return (
    <span className={`date ${className}`}>{result}</span>
  );
};

export default UploadDate;