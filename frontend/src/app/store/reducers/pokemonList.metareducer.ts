import { ActionReducer, Action, MetaReducer } from '@ngrx/store';
import { merge } from 'lodash-es';

function setSavedState(state: any, localStorageKey: string) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}
function getSavedState(localStorageKey: string): any {
  return JSON.parse(localStorage.getItem(localStorageKey) || '{}');
}

const localStorageKey = '__app_storage__';

export function pokemonListMetaReducer<S, A extends Action = Action> (reducer: ActionReducer<S, A>) {
  let onInit = true;
  return function(state: S, action: A): S {
    const nextState = reducer(state, action);
    if (onInit) {
      onInit = false;
      const savedState = getSavedState(localStorageKey);
      return merge(nextState, savedState);
    }
    setSavedState(nextState, localStorageKey);
    return nextState;
  };
}

export const metaReducers: MetaReducer<any>[] = [pokemonListMetaReducer];