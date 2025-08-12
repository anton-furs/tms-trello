const TITLE_WORDS = new Set(['mr', 'mrs', 'ms', 'miss']);

export const formatUser = (userName = '') => {
  const words = userName.trim().split(' ').filter(Boolean);

  let removedTitle = false;
  const filtered = [];
  words.forEach((word) => {
    const key = word.split('.').join('').toLowerCase();
    if (TITLE_WORDS.has(key)) removedTitle = true;
    else filtered.push(word);
  });

  const taken = !removedTitle && words.length === 3 ? filtered.slice(0, 2) : filtered;
  return taken
    .map((w) => w[0])
    .join('')
    .toUpperCase();
};
