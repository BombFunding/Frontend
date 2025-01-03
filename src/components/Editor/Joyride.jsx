import React, { useState } from "react";
import Joyride from "react-joyride";
import TypewriterComponent from "typewriter-effect";

const JoyrideComponent = ({ children, run }) => {
  const [activeStep, setActiveStep] = useState(0); // Track the current active step
  const [typewriterActive, setTypewriterActive] = useState(false); // Track when to start typewriter
  const typerOptions = {
    typeSpeed: 500,
    deleteSpeed: 120,
  };

  const steps = [
    {
      target: ".StartTour",
      content: (
        <div className="rtl">
          {typewriterActive && activeStep === 0 && (
            <TypewriterComponent
              options={typerOptions}
              onInit={(typewriter) => {
                typewriter
                  .typeString("به ادیتور خوش اومدید :)")
                  .deleteAll()
                  .typeString("اینجا قراره یچیز بمب درست کنیم")
                  .start();
              }}
            />
          )}
        </div>
      ),
      placement: "left",
    },
    {
      target: ".EditorTour",
      content: (
        <div className="rtl">
          {typewriterActive && activeStep === 1 && (
            <TypewriterComponent
              options={typerOptions}
              onInit={(typewriter) => {
                typewriter
                  .typeString("اینجا محتوای پروژه‌ی شما قرار میگیره")
                  .start();
              }}
            />
          )}
        </div>
      ),
      placement: "top",
    },
    {
      target: ".ce-paragraph", // Target the element you want to highlight
      content: (
        <div className="rtl">
          {typewriterActive &&
            activeStep === 2 && ( // Only render TypewriterComponent when active
              <TypewriterComponent
                options={typerOptions}
                onInit={(typewriter) => {
                  typewriter
                    .typeString("برای شروع میتوانید اینجا یک / بنویسید")
                    .start()
                    .callFunction(() => {
                      console.log("String typed out!");
                    });
                }}
              />
            )}
        </div>
      ),
      placement: "right",
    },
    {
      target: ".ce-popover__container", // Target the element you want to highlight
      disableOverlayClose: true,
      content: (
        <div className="rtl">
          {typewriterActive &&
            activeStep === 3 && ( // Only render TypewriterComponent when active
              <TypewriterComponent
                options={typerOptions}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(
                      "میتوانید از این قسمت بخش های مختلفی را اضافه کنید"
                    )
                    .start();
                }}
              />
            )}
        </div>
      ),
    },
    {
      target: ".SaveTour",
      content: (
        <div className="rtl">
          {typewriterActive &&
            activeStep === 4 && ( // Only render TypewriterComponent when active
              <TypewriterComponent
                options={typerOptions}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(
                      "بعد از اتمام کار میتونید از این دکمه استفاده کنید"
                    )
                    .deleteAll()
                    .typeString("بزن بریم :)")
                    .start();
                }}
              />
            )}
        </div>
      ),
    },
  ];
  console.log("set: ", typewriterActive);

  const handleJoyrideCallback = (data) => {
    const { status, action, index, type } = data;
    console.log("Joyride event:", data);
    if (status === "finished" || status === "skipped") {
      console.log("Tour finished or skipped!");
    }
    if (type == "tooltip") {
      setActiveStep(index);
      setTypewriterActive(true);
    }
    if (type == "step:after" && index == 2) {
      openToolsPopover();
    }
  };

  const openToolsPopover = () => {
    // Get the editor toolbar element
    const toolbar = document.querySelector(".ce-toolbar");
    const btn = document.querySelector(".ce-toolbar__actions");
    if (toolbar) {
      // Add 'ce-toolbar--opened' class to make it visible
      console.log("toolbar: ", toolbar);
      toolbar.classList.add("ce-toolbar--opened");
      console.log("btn: ", btn);
      btn.classList.add("ce-toolbar__actions--opened");
      btn.classList.add("top-0");

      // Now find and click the plus button
      const plusButton = document.querySelector(".ce-toolbar__plus");
      if (plusButton) {
        plusButton.click();
      }
    }
  };
  const openPlusButton = () => {
    // Get the editor toolbar element
    const toolbar = document.querySelector(".ce-toolbar");
    const btn = document.querySelector(".ce-toolbar__actions");
    if (toolbar) {
      // Add 'ce-toolbar--opened' class to make it visible
      console.log("toolbar: ", toolbar);
      toolbar.classList.add("ce-toolbar--opened");
      console.log("btn: ", btn);
      btn.classList.add("ce-toolbar__actions--opened");
      btn.classList.add("top-0");

      // Now find and click the plus button
      // const plusButton = document.querySelector(".ce-toolbar__plus");
      // if (plusButton) {
      //   plusButton.click();
      // }
    }
  };

  // Optional: Remove the opened class when clicking outside
  // document.addEventListener("click", (e) => {
  //   if (!e.target.closest(".ce-toolbar")) {
  //     const toolbar = document.querySelector(".ce-toolbar");
  //     if (toolbar) {
  //       toolbar.classList.remove("ce-toolbar--opened");
  //     }
  //   }
  // });

  // Usage

  return (
    <>
      <Joyride
        steps={steps}
        callback={handleJoyrideCallback}
        run={run}
        continuous
        scrollToFirstStep
        // showProgress
        showSkipButton
        scrollOffset={120}
        locale={{
          back: "قبلی",
          close: "بستن",
          last: "پایان",
          next: "بعدی",
          skip: "رد کردن",
        }}
        styles={{
          options: {
            arrowColor: "rgba(0, 0, 0, 0.5)",
            backgroundColor: "#333",
            textColor: "#fff",
            overlayColor: "rgba(0, 0, 0, 0.5)",
            fontFamily: "vazirmatn",
            zIndex: 1000,
          },
          buttonNext: {
            backgroundColor: "#FF7517",
            fontFamily: "vazirmatn",
          },
          buttonBack: {
            color: "#FF7517",
            fontFamily: "vazirmatn",
          },
        }}
      />
      {children}
    </>
  );
};

export default JoyrideComponent;
