import Countdown from "./Countdown";

export default function Home() {
  return <div>hello world
    <Countdown date={new Date('2023-09-01')} />
  </div>;
}
