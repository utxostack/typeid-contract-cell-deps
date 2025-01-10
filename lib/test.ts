import axios from 'axios';

const singleFetch = async (taskName: string, url: string) => {
  const start = new Date().getTime();
  await axios.get(url, { timeout: 5000 });
  const end = new Date().getTime();
  console.log(`${taskName} time: ${end - start}ms`);
};

const singleTask = async (taskName: string, url: string) => {
  const promises = Array(5).fill(singleFetch(taskName, url));
  try {
    await Promise.all(promises);
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  await singleTask(
    'Vercel API fetching',
    'https://typeid-contract-cell-deps-git-feat-costomize-and-test-godwoken.vercel.app/api/cell-deps',
  );
  await singleTask('Vercel static fetching', 'https://typeid-contract-cell-deps.vercel.app/deployment/cell-deps.json');
  await singleTask(
    'GitHub static fetching',
    'https://raw.githubusercontent.com/utxostack/typeid-contract-cell-deps/main/deployment/cell-deps.json',
  );
  await singleTask(
    'jsdelivr CDN fetching',
    'https://cdn.jsdelivr.net/gh/utxostack/typeid-contract-cell-deps@main/deployment/cell-deps.json',
  );
})();
