"use client";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";

const PriceRange = ({
  range,
  setRange,
}: {
  range: { start: number; end: number };
  setRange: Dispatch<SetStateAction<{ start: number; end: number }>>;
}) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const startRangeRef = useRef<HTMLInputElement>(null);
  const endRangeRef = useRef<HTMLInputElement>(null);
  const startPriceRef = useRef<HTMLInputElement>(null);
  const endPriceRef = useRef<HTMLInputElement>(null);
  let min = 0;
  let max = 100;

  const updateProgressBar = useCallback(() => {
    if (
      progressBarRef.current &&
      startRangeRef.current &&
      endRangeRef.current
    ) {
      const startPercentage = (range.start / max) * 100;
      progressBarRef.current.style.right = `${startPercentage}%`;
      const widthPercentage = ((range.end - range.start) / (max - min)) * 100;
      progressBarRef.current.style.width = `${widthPercentage}%`;
    }
  }, [min, max, range.end, range.start]);

  useEffect(() => {
    updateProgressBar();
  }, [updateProgressBar]);

  const handleStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = parseInt(event.target.value);
    if (newStart > range.end) {
      setRange((prevRange) => ({
        ...prevRange,
        end: newStart,
        start: newStart,
      }));
    } else {
      setRange((prevRange) => ({ ...prevRange, start: newStart }));
    }
    updateProgressBar();
  };

  const handleEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = parseInt(event.target.value);
    if (newEnd < range.start) {
      setRange((prevRange) => ({ ...prevRange, start: newEnd, end: newEnd }));
    } else {
      setRange((prevRange) => ({ ...prevRange, end: newEnd }));
    }
    updateProgressBar();
  };

  const handleBlure = () => {
    const startValue = Number(startPriceRef.current?.value);
    const endValue = Number(endPriceRef.current?.value);
    if (startValue > max) {
      setRange((prev) => ({
        ...prev,
        start: max,
        end: Math.min(endValue, max),
      }));
      return;
    }

    if (endValue > max) {
      setRange((prev) => ({ ...prev, end: max }));
      return;
    }
    setRange((prev) => ({ ...prev, start: startValue, end: endValue }));
  };

  return (
    <div className='relative w-full pb-8 overflow-hidden'>
      <div className='absolute w-full bottom-2 h-[10px] bg-gray-400 rounded-full'></div>
      <div
        ref={progressBarRef}
        className='absolute bottom-2 left-0 h-[10px] bg-orange-300 rounded-full'
      ></div>

      <input
        ref={startRangeRef}
        type='range'
        min={min}
        max={max}
        value={range.start}
        onChange={handleStartChange}
        className='w-full h-[10px] bg-none bg-transparent pointer-events-none rounded-s-full my-[10px] appearance-none focus:outline-none absolute -bottom-[2px] z-20 rounded-full'
      />
      <input
        ref={endRangeRef}
        type='range'
        min={min}
        max={max}
        value={range.end}
        onChange={handleEndChange}
        className='w-full h-[10px] bg-none bg-transparent pointer-events-none rounded-e-full my-[10px] appearance-none focus:outline-none absolute -bottom-[2px] z-10 rounded-full'
      />
      <div className='flex flex-col gap-1 items-center'>
        <div className='min-w-full flex items-center'>
          از
          <div className='relative border rounded-md font-bold text-lg mr-1 pr-1'>
            <input
              ref={startPriceRef}
              type='number'
              value={range.start}
              onChange={handleStartChange}
              onBlur={handleBlure}
              min={min}
              max={range.end}
              placeholder=''
              className='w-4/5 bg-none bg-transparent border-none outline-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none align-center'
            />
            <span className='absolute left-1 top-1/2 -translate-y-1/2 font-normal text-sm'>
              تومان
            </span>
          </div>
        </div>
        <div className='min-w-full flex items-center'>
          تا
          <div className='relative border rounded-md font-bold text-lg mr-1 pr-1'>
            <input
              ref={endPriceRef}
              type='number'
              value={range.end}
              onChange={handleEndChange}
              onBlur={handleBlure}
              min={range.start}
              max={max}
              placeholder=''
              className='w-4/5 bg-none bg-transparent border-none outline-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
            />
            <span className='absolute left-1 top-1/2 -translate-y-1/2 font-normal text-sm'>
              تومان
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
