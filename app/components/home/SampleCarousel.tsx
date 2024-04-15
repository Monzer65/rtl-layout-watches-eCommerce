import React, { useState, useRef } from "react";

const HorizontalScroll = ({ children, style }) => {
  const contentRef = useRef(null);
  const [x, setX] = useState(0); // Initial horizontal scroll position

  const handleDragStart = (event) => {
    event.persist(); // Prevent default behavior and allow text selection within elements
    setX(event.clientX - contentRef.current.offsetLeft); // Capture initial mouse position relative to content
  };

  const handleDrag = (event) => {
    if (!contentRef.current) return;

    const containerWidth = contentRef.current.offsetWidth;
    const contentWidth = contentRef.current.scrollWidth;
    const availableScroll = contentWidth - containerWidth; // Max scrollable distance

    const newX = Math.min(
      0, // Restrict scrolling to the left edge
      Math.max(
        availableScroll,
        event.clientX - contentRef.current.offsetLeft - x
      ) // Restrict scrolling to the right edge
    );

    setX(newX);
  };

  const handleDragEnd = () => {
    // Optional: Implement logic for snapping to specific positions or items after drag ends
  };

  // const springConfig = useSpring({ x, friction: 12, tension: 150 }); // Adjust friction/tension for desired animation behavior

  return (
    <div className='horizontal-scroll-container' style={style}>
      <div
        ref={contentRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        // style={{
        //   transform: springConfig.x.interpolate(
        //     (xValue) => `translateX(${xValue}px)`
        //   ), // Apply horizontal translation based on state
        // }}
      >
        {children}
      </div>
    </div>
  );
};

export default HorizontalScroll;
