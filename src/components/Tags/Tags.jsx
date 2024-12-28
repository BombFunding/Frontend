function Tags() {
  return (
    <div className="flex flex-col rtl justify-center items-start bg-white dark:bg-transparent py-4 rounded-lg">
      {/* <p className="font-semibold text-xl text-gray-600 mb-2">Tags</p> */}
      <div className="flex flex-wrap gap-[0.6vw]">
        <p className="h-[1.8vw] pt-[0.33vw] px-[0.6vw] text-center text-[0.8vw] bg-[#d9dfe3] max-w-max rounded font-semibold text-[#7281a3] cursor-pointer">
          هوش مصنوعی
        </p>
        <p className="h-[1.8vw] pt-[0.33vw] px-[0.6vw] text-center text-[0.8vw] bg-[#d9dfe3] max-w-max rounded font-semibold text-[#7281a3] cursor-pointer">
          OS
        </p>
        <p className="h-[1.8vw] pt-[0.33vw] px-[0.6vw] text-center text-[0.8vw] bg-[#d9dfe3] max-w-max rounded font-semibold text-[#7281a3] cursor-pointer">
          تست تگ
        </p>
        <p className="h-[1.8vw] pt-[0.33vw] px-[0.6vw] text-center text-[0.8vw] bg-[#d9dfe3] max-w-max rounded font-semibold text-[#7281a3] cursor-pointer">
          حذف تحلیل
        </p>
        <p className="h-[1.8vw] pt-[0.33vw] px-[0.6vw] text-center text-[0.8vw] bg-[#d9dfe3] max-w-max rounded font-semibold text-[#7281a3] cursor-pointer">
          غذای خوشمزه
        </p>
        <p className="h-[1.8vw] pt-[0.33vw] px-[0.6vw] text-center text-[0.8vw] bg-[#d9dfe3] max-w-max rounded font-semibold text-[#7281a3] cursor-pointer">
          گوشت مرغ
        </p>
      </div>
    </div>
  );
}

export default Tags;
