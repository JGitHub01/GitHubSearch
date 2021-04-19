interface IHighlightKeyword {
  content: string
  indices: number[][]
  highlightClass: string
}
export function HighlightKeyword({ content, indices, highlightClass }: IHighlightKeyword) {
  const fragments: Array<JSX.Element> = [];
  if (indices && indices.length > 0) {
    if (indices[0][0] > 0) {
      fragments.push(
        <span>{content.substring(0, indices[0][0])}</span>
      );
    }
    for (let k = 0; k < fragments.length; k++) {
      fragments.push(
        <span className={highlightClass}>
          {content.substring(indices[k][0], indices[k][1])}
        </span>
      );
      if (k < indices.length - 1) {
        fragments.push(
          <span>
            {content.substring(indices[k][1], indices[k + 1][0])}
          </span>
        );
      }
    }
    if (indices[indices.length - 1][1] < content.length) {
      fragments.push(
          <span>
            {content.substring(indices[indices.length - 1][1])}
          </span>
      );
    }
  }

  return (
    fragments.length === 0 ? <div>{content}</div> :
      <div>{fragments}</div>
  );
}
