interface IHighlightKeyword {
  content: string
  indices?: number[][]
  highlightClass?: string
}
export default function HighlightKeyword({ content, indices, highlightClass }: IHighlightKeyword) {
  const fragments: Array<JSX.Element> = [];
  if (indices && indices.length > 0) {
    let keyIdx = 0;
    if (indices[0][0] > 0) {
      fragments.push(
        <span key={keyIdx++}>{content.substring(0, indices[0][0])}</span>
      );
    }
    for (let k = 0; k < indices.length; k++) {
      fragments.push(
        <span className={highlightClass} key={keyIdx++}>
          {content.substring(indices[k][0], indices[k][1])}
        </span>
      );
      if (k < indices.length - 1) {
        fragments.push(
          <span key={keyIdx++}>
            {content.substring(indices[k][1], indices[k + 1][0])}
          </span>
        );
      }
    }
    if (indices[indices.length - 1][1] < content.length) {
      fragments.push(
          <span key={keyIdx++}>
            {content.substring(indices[indices.length - 1][1])}
          </span>
      );
    }
  }

  return (
    fragments.length === 0 ? <>{content}</> :
      <>{fragments}</>
  );
}
