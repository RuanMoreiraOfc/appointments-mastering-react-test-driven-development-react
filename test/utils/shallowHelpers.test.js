import { getChildrenFrom } from './shallowHelpers';

describe('getChildrenFrom', () => {
  it('returns no children', () => {
    const element = <div />;

    const children = getChildrenFrom(element);

    expect(children).toEqual([]);
  });
});
