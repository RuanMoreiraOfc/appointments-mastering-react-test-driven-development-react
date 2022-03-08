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

  it('returns text as an array of one item', () => {
    const element = <div>text</div>;

    const children = getChildrenFrom(element);

    expect(children).toEqual(['text']);
  });

  it('returns no children for text', () => {
    const element = 'text';

    const children = getChildrenFrom(element);

    expect(children).toEqual([]);
  });
});
