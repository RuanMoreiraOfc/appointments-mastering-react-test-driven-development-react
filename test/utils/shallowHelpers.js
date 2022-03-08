import ShallowRenderer from 'react-test-renderer/shallow';

export { getChildrenFrom, createShallowRenderer };

const getChildrenFrom = (element) => {
  const isString = (obj) =>
    Object.prototype.toString.call(obj) === '[object String]';

  if (isString(element)) {
    return [];
  }

  const children = element.props.children;

  if (!children) {
    return [];
  }

  if (isString(children)) {
    return [children];
  }

  if (Array.isArray(children)) {
    return children;
  }

  return [children];
};

const createShallowRenderer = () => {
  const renderer = new ShallowRenderer();

  return {
    render: (component) => renderer.render(component),
    getChild: (n) => getChildrenFrom(renderer.getRenderOutput())[n],
    getElementsMatching: () => undefined,
  };
};
