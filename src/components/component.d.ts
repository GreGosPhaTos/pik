export type Component<T = Record<string, unknown>, R = void> = {
  render: (props?: T) => R;
};
