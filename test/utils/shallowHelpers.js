export { getChildrenFrom };

const getChildrenFrom = (element) => {
  if (!element.props.children) {
    return [];
  }

  return element.props.children;
};
