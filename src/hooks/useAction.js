import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

export default (action) => {
  const dispatch = useDispatch();

  return useMemo(
    () =>
      (...args) =>
        dispatch(action(...args)),
    [action, dispatch]
  );
};
