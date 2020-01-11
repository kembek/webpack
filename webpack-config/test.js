const stay = async () => {
  console.log(`Fs`);
  const s = await ss(5);
  console.log(s);
  console.log(`Sn`);
};

function ss(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

stay();
