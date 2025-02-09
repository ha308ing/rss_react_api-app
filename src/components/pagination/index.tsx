import { FC } from 'react';

interface IPaginationProps {
  page: number;
  prevHandler: () => void;
  nextHandler: () => void;
}

export const Pagination: FC<IPaginationProps> = ({
  page,
  prevHandler,
  nextHandler,
}) => {
  return (
    <section className="flex gap-4 items-center justify-center py-1 my-2">
      <button className="border-1 rounded-md px-5 py-0.5" onClick={prevHandler}>
        prev
      </button>
      {page}
      <button className="border-1 rounded-md px-5 py-0.5" onClick={nextHandler}>
        next
      </button>
    </section>
  );
};
