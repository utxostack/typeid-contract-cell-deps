import axios from 'axios';

const singleFetch = async (taskName: string, url: string) => {
  const start = new Date().getTime();
  await axios.get(url, { timeout: 5000 });
  const end = new Date().getTime();
  console.log(`${taskName} single fetch time: ${end - start}ms`);
};

const singleTask = async (taskName: string, url: string) => {
  const promises = [];
  for (let i = 0; i < 10; i++) {
    promises.push(singleFetch(taskName, url));
  }
  const start = new Date().getTime();
  try {
    await Promise.all(promises);
  } catch (error: any) {
    for (const e of error.errors) {
      console.error(e);
    }
  }
  const end = new Date().getTime();
  console.log(`${taskName} average time: ${(end - start) / 10}ms in 10 requests`);
};

(async () => {
  await singleTask('Vercel API fetching', 'https://typeid-contract-cell-deps.vercel.app/api/cell-deps');
  await singleTask('Vercel static fetching', 'https://typeid-contract-cell-deps.vercel.app/api/cell-deps');
  await singleTask(
    'GitHub static fetching',
    'https://raw.githubusercontent.com/utxostack/typeid-contract-cell-deps/main/deployment/cell-deps.json',
  );
  await singleTask(
    'jsdelivr CDN fetching',
    'https://cdn.jsdelivr.net/gh/utxostack/typeid-contract-cell-deps@main/deployment/cell-deps.json',
  );
})();
