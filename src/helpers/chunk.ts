const chunk = (array: NotWorthIt[], chunkLength: number) => {
  const chunks = [];

  for (let index = 0; index < array.length; index += chunkLength) {
    chunks.push(array.slice(index, index + chunkLength));
  }

  return chunks;
};

export default chunk;
