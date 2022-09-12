import { NextPage } from "next";
import Link from "next/link";

const ADDRESS = `Christoph Stenglein
Thalmannsbach 15
4771 Sigharting
manysats@cstenglein.com`;

const Legal: NextPage = () => {
  const onClickHandler = () => {
    alert(ADDRESS);
  };

  return (
    <main className="flex h-screen flex-col items-center bg-gray-100">
      <h1 className="mb-2 flex items-center justify-center p-4 text-4xl">Legal</h1>

      <section className="flex h-screen flex-col gap-4 pt-10">
        <button className="rounded bg-blue-500 p-2 text-white" onClick={onClickHandler}>
          Show Contact Details
        </button>

        <Link href="/">
          <button className="rounded-t bg-blue-500 p-2 text-white">Back to Home</button>
        </Link>
      </section>
    </main>
  );
};

export default Legal;
