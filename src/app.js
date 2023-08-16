import fs from "fs";

// get last count
const time = await fs.promises
  .readFile("./time.txt", "utf8") //
  .then((data) => {
    return data;
  })
  .catch(console.error);

let [hour, minute, second] = time.split(":");

function countClock(hour, minute, second) {
  if (+second >= 59) {
    if (+minute >= 59) {
      +hour++;
      minute = "00";
    } else {
      +minute++;
      second = "00";
    }
  } else {
    +second++;
  }
  hour = +hour < 10 ? `0${+hour}` : hour;
  minute = +minute < 10 ? `0${+minute}` : minute;
  second = +second < 10 ? `0${+second}` : second;
  return `${hour}:${minute}:${second}`;
}

function displayClock() {
  const currentTime = countClock(hour, minute, second);
  [hour, minute, second] = currentTime.split(":");
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(currentTime);
}

setInterval(displayClock, 1000);

process.on("SIGINT", async () => {
  console.log("\nClock stopped.");
  console.log(`current:${hour}:${minute}:${second}`);
  await fs.promises
    .writeFile("./time.txt", `${hour}:${minute}:${second}`) //
    .catch(console.error);
  process.exit();
});
