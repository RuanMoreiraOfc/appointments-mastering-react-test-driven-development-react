export { getChildrenFrom };

const getChildrenFrom = (element) => {
  if (Object.prototype.toString.call(element) === '[object String]') {
    return [];
  }

  const children = element.props.children;

  if (!children) {
    return [];
  }

  if (Object.prototype.toString.call(children) === '[object String]') {
    return [children];
  }

  if (Array.isArray(children)) {
    return children;
  }

  return [children];
};
