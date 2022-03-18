import { DependencyList, useCallback } from 'react';
import { useAtomCallback as useJotaiAtomCallback } from 'jotai/utils';
import { Getter, Setter } from 'jotai';

export default function useAtomCallback(
  callback: (get: Getter, set: Setter, arg: any) => any,
  deps: DependencyList
) {
  return useJotaiAtomCallback(useCallback(callback, deps));
}
