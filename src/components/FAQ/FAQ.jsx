import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle open/close
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
          <div className="w-full lg:w-1/2">
            <img
              src="https://pagedone.io/asset/uploads/1696230182.png"
              alt="FAQ section"
              className="w-full rounded-xl object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">
              <div className="mb-6 lg:mb-16">
                <h6 className="text-lg text-center font-medium text-orange-600 mb-2 lg:text-right">
                  پرسش و پاسخ
                </h6>
                <h2 className="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] mb-5 lg:text-right">
                  دنبال جواب می گردید؟
                </h2>
              </div>
              <div className="accordion-group">
                {/* Accordion Item 1 */}
                <div className="accordion pb-8 border-b border-solid border-gray-200">
                  <button
                    className={`accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-orange-600 ${
                      openIndex === 0 ? "text-orange-600 font-medium" : ""
                    }`}
                    onClick={() => toggleAccordion(0)}
                  >
                    <svg
                      className={`transition duration-500 ${
                        openIndex === 0 ? "rotate-180 text-orange-600" : ""
                      }`}
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <h5 className="lg:text-right">چجوری باید اکانت بسازیم؟</h5>
                  </button>
                  <div
                    className={`accordion-content px-0 overflow-hidden pr-4 transition-all duration-500 ${
                      openIndex === 0 ? "max-h-[200px]" : "max-h-0"
                    }`}
                  >
                    <p className="text-base font-normal text-gray-600 mt-4">
                     برای ساخت اکانت، روی دکمه "ورود" کلیک کرده و گزینه "حساب کاربری ندارید" را انتخاب کنید. سپس یوزری که می خواهید برای خود بسازید راانتخاب کرده و در نهایت اطلاعات خود را وارد کرده و ثبت کنید
                    </p>
                  </div>
                </div>

                {/* Accordion Item 2 */}
                <div className="accordion py-8 border-b border-solid border-gray-200">
                  <button
                    className={`accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-orange-600 ${
                      openIndex === 1 ? "text-orange-600 font-medium" : ""
                    }`}
                    onClick={() => toggleAccordion(1)}
                  >
                    <svg
                      className={`transition duration-500 ${
                        openIndex === 1 ? "rotate-180 text-orange-600" : ""
                      }`}
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <h5>آیا به ما برای نگهداری اطلاعاتتان اعتماد ندارید؟</h5>
                  </button>
                  <div
                    className={`accordion-content px-0 overflow-hidden pr-4 transition-all duration-500 ${
                      openIndex === 1 ? "max-h-[200px]" : "max-h-0"
                    }`}
                  >
                    <p className="text-base text-gray-500 font-normal mt-4">
                     پلتفرم ما با در نظر گرفتن اعتماد کاربران و با
  ارائه امنیت قوی و سهولت استفاده برای دستیابی شما
 به اهدافتان طراحی شده است
                    </p>
                  </div>
                </div>

                {/* Additional accordion items... */}
                <div className="accordion py-8 border-b border-solid border-gray-200">
                  <button
                    className={`accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-orange-600 ${
                      openIndex === 2 ? "text-orange-600 font-medium" : ""
                    }`}
                    onClick={() => toggleAccordion(2)}
                  >
                    <svg
                      className={`transition duration-500 ${
                        openIndex === 2 ? "rotate-180 text-orange-600" : ""
                      }`}
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <h5>چجوری باید پسووردمون رو ریست کنیم؟</h5>
                  </button>
                  <div
                    className={`accordion-content px-0 overflow-hidden pr-4 transition-all duration-500 ${
                      openIndex === 2 ? "max-h-[200px]" : "max-h-0"
                    }`}
                  >
                    <p className="text-base text-gray-500 font-normal mt-4">
                    برای تغییر پسوورد اکانت، روی دکمه "ورود" کلیک کرده و گزینه "رمز عبور خود را فراموش کرده اید" را انتخاب کنید. سپس ایمیل خود را وارد کرده و روی دکمه "ارسال" کلیک کنید. روی لینکی که در ایمیلتان فرستاده شده کلیک کنید تا بتوانید پسسورد جدیدتان را وارد کنید         
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;