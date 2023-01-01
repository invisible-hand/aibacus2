export default ({ children, id, onClick, ...args }) => (
  <button
    onClick={() => {
      onClick(id);
    }}
    {...args}
  >
    {children}
  </button>
);
