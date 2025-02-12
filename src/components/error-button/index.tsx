import { useEffect, useState } from 'react';

export const ErrorButton = () => {
  const [hasError, setHasError] = useState(false);

  const clickHandler = () => {
    setHasError(true);
  };

  useEffect(() => {
    if (hasError) throw new Error('Trigger error button');
  }, [hasError]);

  return (
    <button
      onClick={clickHandler}
      className="text-sm bg-red-800 text-red-50 py-2 px-4 fixed bottom-3 right-4"
    >
      Throw Error
    </button>
  );
};
