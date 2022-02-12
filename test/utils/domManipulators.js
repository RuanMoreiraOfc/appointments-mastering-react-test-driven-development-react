import ReactDOM from 'react-dom';

export { createContainer };

const createContainer = () => {
  const container = document.createElement('div');

  return {
    render: (component) => ReactDOM.render(component, container),
    container,
  };
};
