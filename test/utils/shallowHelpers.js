import ShallowRenderer from 'react-test-renderer/shallow';

export {
  getChildrenFrom,
  createShallowRenderer,
  compareByType,
  compareById,
  compareByClassName,
  clickElement,
};

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

const compareByType = (typeName) => (element) => element.type === typeName;

const compareById = (id) => (element) => element.props?.id === id;

const compareByClassName = (className) => (element) =>
  element.props?.className === className;

const getElementsMatching = (matcherFn) => (element) =>
  getChildrenFrom(element).filter(matcherFn);

const createShallowRenderer = () => {
  const renderer = new ShallowRenderer();
  const getRenderOutput = () => renderer.getRenderOutput();

  return {
    render: (component) => renderer.render(component),
    getChild: (n) => getChildrenFrom(getRenderOutput())[n],
    getElementsMatching: (matcherFn) =>
      getElementsMatching(matcherFn)(getRenderOutput()),
  };
};

const clickElement = (element) => element.props.onClick();
