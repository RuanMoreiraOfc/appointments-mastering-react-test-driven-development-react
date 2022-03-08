export { getChildrenFrom };

const getChildrenFrom = (element) => {
  if (typeof element === 'string') {
    return [];
  }

  const children = element.props.children;

  if (!children) {
    return [];
  }

  if (Object.prototype.toString.call(children) === '[object String]') {
    return [children];
  }

  return children;
};
