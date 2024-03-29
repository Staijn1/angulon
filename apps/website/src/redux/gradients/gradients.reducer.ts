import { GradientInformation } from "@angulon/interfaces";
import { GradientAction } from "./gradients.action";

const initialState: GradientInformation[] = [];

export const gradientsReducer = (state: GradientInformation[] = initialState, action: any): GradientInformation[] => {
  switch (action.type) {
    case GradientAction.LOAD_GRADIENTS:
      return action.payload;
    case GradientAction.REGISTER_GRADIENT:
      return [...state, action.payload];
    default:
      return state;
  }
};
