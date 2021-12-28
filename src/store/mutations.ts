import { MutationTree } from "vuex";
import { State } from "./state";

export enum Mutation {
  TOOGLE_LOADING = "TOOGLE_LOADING",
}

export type Mutations<S = State> = {
  [Mutation.TOOGLE_LOADING](state: S, payload: boolean): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [Mutation.TOOGLE_LOADING](state: State, payload: boolean) {
    state.loading = payload;
  },
};
