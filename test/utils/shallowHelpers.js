export { getChildrenFrom };

const getChildrenFrom = (element) => {
  if (!element.props.children) {
    return [];
  }

  if (
    Object.prototype.toString.call(element.props.children) === '[object String]'
  ) {
    return [element.props.children];
  }

  return element.props.children;
};
