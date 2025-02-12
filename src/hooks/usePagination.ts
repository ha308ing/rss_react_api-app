import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

const API_LIMIT = 10;
const PAGE_SEARCH_PARAM = 'page';

export const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = useMemo(() => {
    const pageParam = searchParams.get(PAGE_SEARCH_PARAM) ?? 1;

    return +pageParam;
  }, [searchParams]);

  const offset = useMemo(() => (page - 1) * API_LIMIT, [page]);

  const nextHandler = useCallback(() => {
    setSearchParams((prev) => {
      prev.set(PAGE_SEARCH_PARAM, page + 1 + '');
      return prev;
    });
  }, [page, setSearchParams]);

  const prevHandler = useCallback(() => {
    setSearchParams((prev) => {
      prev.set(PAGE_SEARCH_PARAM, page - 1 + '');
      return prev;
    });
  }, [page, setSearchParams]);

  return [page, offset, nextHandler, prevHandler] as const;
};
