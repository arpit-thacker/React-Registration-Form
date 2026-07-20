export function highlightMatch(text: string, query: string) {
  if (!query.trim()) {
    return text;
  }

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  const startIndex = lowerText.indexOf(lowerQuery);

  if (startIndex === -1) {
    return text;
  }

  const endIndex = startIndex + query.length;

  return (
    <>
      {text.substring(0, startIndex)}

      <mark className="highlight">{text.substring(startIndex, endIndex)}</mark>

      {text.substring(endIndex)}
    </>
  );
}
