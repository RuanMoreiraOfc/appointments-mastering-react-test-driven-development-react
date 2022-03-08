import { getChildrenFrom } from './shallowHelpers';

describe('getChildrenFrom', () => {
  it('returns no children', () => {
    const element = <div />;

    const children = getChildrenFrom(element);

    expect(children).toEqual([]);
  });

  it('returns direct children', () => {
    const element = (
      <div>
        <p>A</p>
        <p>B</p>
      </div>
    );

    const children = getChildrenFrom(element);

    expect(children).toEqual([<p>A</p>, <p>B</p>]);
  });
});
