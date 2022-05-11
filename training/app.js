const lotteryPromise = new Promise((resolve, reject) => {
	console.log('Lottery draw is happening ⏳');

	setTimeout(() => {
		if (Math.random() >= 0.5) {
			resolve('You win 🎁');
		} else {
			reject(new Error('You lost your money 😫'));
		}
	}, 2000);
});

lotteryPromise.then((res) => console.log(res)).catch((err) => console.log(err));

const wait = (seconds) => {
	return new Promise((resolve) => {
		setTimeout(resolve, seconds * 1000);
	}, seconds);
};

wait(2)
	.then(() => {
		console.log('I waited for 2 seconds');
		return wait(1);
	})
	.then(() => {
		console.log('I waited for 1 second');
	});
